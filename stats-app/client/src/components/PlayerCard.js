import React, { useState } from 'react';
import axios from 'axios';
import './PlayerCard.css';

function PlayerCard({ userScores, onGenerateCard, onReset }) {
  const [playerName, setPlayerName] = useState('');
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showNameInput, setShowNameInput] = useState(true);

  const handleGenerateCard = async (e) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    setLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.post('/api/scores/generate-card', {
        userId,
        playerName
      });
      setCard(response.data.card);
      setShowNameInput(false);
      onGenerateCard();
    } catch (err) {
      console.error('Failed to generate card');
    } finally {
      setLoading(false);
    }
  };

  if (card) {
    return (
      <div className="player-card-container">
        <div className="fifa-card">
          <div className="card-header">
            <h2 className="player-name">{card.playerName}</h2>
            <div className="card-position">{card.position}</div>
          </div>

          <div className="card-overall">
            <div className="overall-rating">
              <div className="rating-number">{card.overallRating}</div>
              <div className="rating-label">Overall</div>
            </div>
          </div>

          <div className="card-rarity" style={{ rarity: card.rarity }}>
            {card.rarity}
          </div>

          <div className="card-skills-grid">
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
              <div className="stat-label">STR</div>
              <div className="stat-value">{card.skills.strength}</div>
            </div>
            <div className="skill-stat">
              <div className="stat-label">DEF</div>
              <div className="stat-value">{card.skills.defending}</div>
            </div>
            <div className="skill-stat">
              <div className="stat-label">SPD</div>
              <div className="stat-value">{card.skills.speed}</div>
            </div>
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

  if (showNameInput) {
    return (
      <div className="player-card-container">
        <div className="name-input-box">
          <h1>Generate Your Player Card</h1>
          <p>Enter your name to create your FUT card</p>

          <form onSubmit={handleGenerateCard}>
            <input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              disabled={loading}
              maxLength={20}
            />
            <button type="submit" disabled={loading || !playerName.trim()}>
              {loading ? 'Generating...' : 'Generate Card'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return null;
}

export default PlayerCard;
