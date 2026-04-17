import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import './PlayerCard.css';

function PlayerCard({ userScores, onGenerateCard, onReset }) {
  const cardRef = useRef(null);
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateCard = useCallback(async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      const fullName = localStorage.getItem('fullName');
      const position = localStorage.getItem('position');
      
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
    return (
      <div className="player-card-container">
        <div className="fifa-card" ref={cardRef}>
          <div className="card-top">
            <div className="card-header">
              <div className="player-info">
                <h2 className="player-name">{card.playerName}</h2>
                <div className="player-position">{card.position}</div>
              </div>
              <div className="overall-rating">
                <div className="rating-number">{card.overallRating}</div>
                <div className="rating-label">OVR</div>
              </div>
            </div>
          </div>

          <div className="player-avatar">👤</div>

          <div className="card-skills-grid">
            <div className="skill-stat">
              <div className="stat-label">PAC</div>
              <div className="stat-value">{card.skills.speed}</div>
            </div>
            <div className="skill-stat">
              <div className="stat-label">SHO</div>
              <div className="stat-value">{card.skills.shooting}</div>
            </div>
            <div className="skill-stat">
              <div className="stat-label">PAS</div>
              <div className="stat-value">{card.skills.passing}</div>
            </div>
            <div className="skill-stat">
              <div className="stat-label">DRI</div>
              <div className="stat-value">{card.skills.dribbling}</div>
            </div>
            <div className="skill-stat">
              <div className="stat-label">DEF</div>
              <div className="stat-value">{card.skills.defending}</div>
            </div>
            <div className="skill-stat">
              <div className="stat-label">PHY</div>
              <div className="stat-value">{card.skills.strength}</div>
            </div>
          </div>

          <div className="card-rarity" style={{ backgroundColor: getRarityColor(card.rarity) }}>
            {card.rarity}
          </div>

          <div className="card-footer">
            <small>Generated {new Date(card.generatedAt).toLocaleDateString()}</small>
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

function getRarityColor(rarity) {
  const rarityMap = {
    'Bronze': '#cd7f32',
    'Silver': '#c0c0c0',
    'Gold': '#ffd700',
    'Rare Gold': '#ff8c00',
    'Rare Silver': '#b0c4de',
    'Rare Bronze': '#d4a574'
  };
  return rarityMap[rarity] || '#ffd700';
}

export default PlayerCard;
