import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import './PlayerCard.css';

const THEMES = {
  modern: {
    name: 'Modern',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    accentColor: '#667eea'
  },
  gold: {
    name: 'Gold',
    gradient: 'linear-gradient(135deg, #f6b93b 0%, #e58e26 100%)',
    accentColor: '#f6b93b'
  },
  cyber: {
    name: 'Cyber',
    gradient: 'linear-gradient(135deg, #00d2fc 0%, #3a47d5 100%)',
    accentColor: '#00d2fc'
  },
  fire: {
    name: 'Fire',
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ff9a3d 100%)',
    accentColor: '#ff6b6b'
  },
  emerald: {
    name: 'Emerald',
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    accentColor: '#38ef7d'
  },
  dark: {
    name: 'Dark',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
    accentColor: '#ffffff'
  }
};

function PlayerCard({ userScores, onGenerateCard, onReset }) {
  const cardRef = useRef(null);
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('modern');
  const [profileImage, setProfileImage] = useState(null);

  const generateCard = useCallback(async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      const fullName = localStorage.getItem('fullName');
      const position = localStorage.getItem('position');
      const image = localStorage.getItem('profileImage');
      
      setProfileImage(image);
      
      const response = await axios.post('/api/scores/generate-card', {
        userId,
        playerName: fullName,
        position
      });
      setCard(response.data.card);
      onGenerateCard();
    } catch (err) {
      console.error('Failed to generate card');
    } finally {
      setLoading(false);
    }
  }, [onGenerateCard]);

  useEffect(() => {
    generateCard();
  }, [generateCard]);

  const downloadCard = useCallback(async () => {
    if (!cardRef.current) return;
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2
      });
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${card.playerName}-FUT-Card.png`;
      link.click();
    } catch (err) {
      console.error('Failed to download card:', err);
      alert('Could not download card. Please try again.');
    }
  }, [card]);

  const shareCard = useCallback(() => {
    const text = `Check out my FUT Card! ${card.playerName} - ${card.position} rated ${card.overallRating}!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My FUT Card',
        text: text
      }).catch(err => console.log('Share cancelled'));
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(text).then(() => {
        alert('Card info copied to clipboard!');
      }).catch(() => {
        alert('Share failed. Please try again.');
      });
    }
  }, [card]);

  if (loading) {
    return (
      <div className="player-card-container">
        <div className="loading-message">
          <p>Generating your FUT card...</p>
        </div>
      </div>
    );
  }

  if (card) {
    const theme = THEMES[selectedTheme];
    return (
      <div className="player-card-container">
        <div className="theme-selector">
          <label>Card Theme:</label>
          <div className="theme-buttons">
            {Object.entries(THEMES).map(([key, themeData]) => (
              <button
                key={key}
                className={`theme-btn ${selectedTheme === key ? 'active' : ''}`}
                onClick={() => setSelectedTheme(key)}
                style={{ 
                  borderColor: themeData.accentColor,
                  ...(selectedTheme === key && { background: themeData.accentColor })
                }}
              >
                {themeData.name}
              </button>
            ))}
          </div>
        </div>

        <div className="modern-card" ref={cardRef} style={{ background: theme.gradient }}>
          {/* Background Pattern */}
          <div className="card-background-pattern"></div>

          {/* Card Content */}
          <div className="card-content">
            {/* Header Section */}
            <div className="card-header-section">
              <div className="player-info-block">
                <h1 className="player-name">{card.playerName}</h1>
                <p className="player-meta">{card.position}</p>
              </div>
              <div className="rating-circle" style={{ borderColor: theme.accentColor }}>
                <span className="rating-big">{card.overallRating}</span>
                <span className="rating-label">OVR</span>
              </div>
            </div>

            {/* Avatar Section */}
            <div className="avatar-section">
              <div className="avatar-circle">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="profile-photo" />
                ) : (
                  '👤'
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="modern-stats-grid">
              <div className="stat-box">
                <div className="stat-icon">⚡</div>
                <div className="stat-name">PAC</div>
                <div className="stat-num">{card.skills.speed}</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon">🎯</div>
                <div className="stat-name">SHO</div>
                <div className="stat-num">{card.skills.shooting}</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon">📍</div>
                <div className="stat-name">PAS</div>
                <div className="stat-num">{card.skills.passing}</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon">🔄</div>
                <div className="stat-name">DRI</div>
                <div className="stat-num">{card.skills.dribbling}</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon">🛡️</div>
                <div className="stat-name">DEF</div>
                <div className="stat-num">{card.skills.defending}</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon">💪</div>
                <div className="stat-name">PHY</div>
                <div className="stat-num">{card.skills.strength}</div>
              </div>
            </div>

            {/* Footer */}
            <div className="card-footer-modern">
              <span className="rarity-badge">{card.rarity}</span>
              <span className="generated-date">{new Date(card.generatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="card-actions">
          <button className="action-btn download-btn" onClick={downloadCard}>
            📥 Download
          </button>
          <button className="action-btn share-btn" onClick={shareCard}>
            📤 Share
          </button>
          <button className="action-btn reset-btn" onClick={onReset}>
            🔄 Test Another Skill
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default PlayerCard;
