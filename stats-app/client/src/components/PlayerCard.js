import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PlayerCard.css';

function PlayerCard({ userScores, onGenerateCard, onReset }) {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateCard();
  }, []);

  const generateCard = async () => {
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
  };

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
        <div className="fifa-card">
          <div className="card-top">
            <div className="card-header">
              <div className="player-info">
                <h2 className="player-name">{card.playerName}</h2>
                <div className="player-position">{card.position}</div>
              </div>
              <div className="overall-rating">
                <div className="rating-number">{card.overallRating}</div>
                <div className="rating-label">Overall</div>
              </div>
            </div>
          </div>

          <div className="card-divider"></div>

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
            <small>Generated on {new Date(card.generatedAt).toLocaleDateString()}</small>
          </div>
        </div>

        <div className="card-actions">
          <button className="reset-btn" onClick={onReset}>
            Test Another Skill
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
