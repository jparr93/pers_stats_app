import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import HomeScreen from './components/HomeScreen';
import SkillSelector from './components/SkillSelector';
import DrillInterface from './components/DrillInterface';
import PlayerCard from './components/PlayerCard';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [completedSkills, setCompletedSkills] = useState(new Set());
  const [user, setUser] = useState(null);
  const [previewCard, setPreviewCard] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentScreen('home');
  };

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
    setCurrentScreen('drill');
  };

  const handleDrillComplete = (skillId) => {
    const updated = new Set(completedSkills);
    updated.add(skillId);
    setCompletedSkills(updated);
    setCurrentScreen('skills');
  };

  const handleGenerateCard = () => {
    // Card is displayed in PlayerCard component
  };

  const handlePreviewCard = () => {
    const sampleCard = {
      playerName: localStorage.getItem('fullName') || 'Sample Player',
      overallRating: 78,
      position: localStorage.getItem('position') || 'ST',
      skills: {
        shooting: 85,
        passing: 72,
        dribbling: 80,
        strength: 75,
        defending: 40,
        speed: 82
      },
      generatedAt: new Date(),
      rarity: 'Gold'
    };
    setPreviewCard(sampleCard);
    setCurrentScreen('preview');
  };

  const handleReset = () => {
    setCompletedSkills(new Set());
    setCurrentScreen('skills');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('fullName');
    localStorage.removeItem('position');
    localStorage.removeItem('age');
    localStorage.removeItem('area');
    localStorage.removeItem('team');
    setUser(null);
    setCurrentScreen('login');
    setCompletedSkills(new Set());
  };

  return (
    <div className="app">
      {currentScreen === 'login' && (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}

      {currentScreen === 'home' && user && (
        <div className="home-view">
          <div className="navbar">
            <div className="navbar-content">
              <h1 className="navbar-title">FUT STATS</h1>
              <div className="user-info">
                <span>Welcome, {localStorage.getItem('username')}</span>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
          <HomeScreen onNavigate={(screen) => setCurrentScreen(screen)} />
        </div>
      )}

      {currentScreen === 'skills' && user && (
        <div className="skills-view">
          <div className="navbar">
            <div className="navbar-content">
              <h1 className="navbar-title">FUT STATS</h1>
              <div className="user-info">
                <span>Welcome, {localStorage.getItem('username')}</span>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
          <div className="back-home-btn-container">
            <button className="back-home-btn" onClick={() => setCurrentScreen('home')}>
              ← Back to Dashboard
            </button>
          </div>
          <SkillSelector onSkillSelect={handleSkillSelect} onPreview={handlePreviewCard} />
          {completedSkills.size > 0 && (
            <div className="generate-card-section">
              <div className="completed-info">
                <p>Skills Completed: {completedSkills.size} / 6</p>
              </div>
              {completedSkills.size > 0 && (
                <button
                  className="generate-btn"
                  onClick={() => setCurrentScreen('card')}
                >
                  Generate Player Card
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {currentScreen === 'preview' && previewCard && (
        <div className="preview-card-container">
          <div className="fifa-card">
            <div className="card-top">
              <div className="card-header">
                <div className="player-info">
                  <h2 className="player-name">{previewCard.playerName}</h2>
                  <div className="player-position">{previewCard.position}</div>
                </div>
                <div className="overall-rating">
                  <div className="rating-number">{previewCard.overallRating}</div>
                  <div className="rating-label">OVR</div>
                </div>
              </div>
            </div>

            <div className="player-avatar">👤</div>

            <div className="card-skills-grid">
              <div className="skill-stat">
                <div className="stat-label">PAC</div>
                <div className="stat-value">{previewCard.skills.speed}</div>
              </div>
              <div className="skill-stat">
                <div className="stat-label">SHO</div>
                <div className="stat-value">{previewCard.skills.shooting}</div>
              </div>
              <div className="skill-stat">
                <div className="stat-label">PAS</div>
                <div className="stat-value">{previewCard.skills.passing}</div>
              </div>
              <div className="skill-stat">
                <div className="stat-label">DRI</div>
                <div className="stat-value">{previewCard.skills.dribbling}</div>
              </div>
              <div className="skill-stat">
                <div className="stat-label">DEF</div>
                <div className="stat-value">{previewCard.skills.defending}</div>
              </div>
              <div className="skill-stat">
                <div className="stat-label">PHY</div>
                <div className="stat-value">{previewCard.skills.strength}</div>
              </div>
            </div>

            <div className="card-rarity" style={{ backgroundColor: getRarityColor(previewCard.rarity) }}>
              {previewCard.rarity}
            </div>

            <div className="card-footer">
              <small>Preview Card</small>
            </div>
          </div>

          <div className="card-actions">
            <button className="reset-btn" onClick={() => setCurrentScreen('skills')}>
              Back to Skills
            </button>
          </div>
        </div>
      )}

      {currentScreen === 'drill' && selectedSkill && (
        <DrillInterface
          skill={selectedSkill}
          onComplete={handleDrillComplete}
          onBack={() => setCurrentScreen('skills')}
        />
      )}

      {currentScreen === 'card' && (
        <PlayerCard
          userScores={completedSkills}
          onGenerateCard={handleGenerateCard}
          onReset={handleReset}
        />
      )}
    </div>
  );
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

export default App;
