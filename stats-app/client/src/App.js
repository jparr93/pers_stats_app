import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import SkillSelector from './components/SkillSelector';
import DrillInterface from './components/DrillInterface';
import PlayerCard from './components/PlayerCard';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [completedSkills, setCompletedSkills] = useState(new Set());
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentScreen('skills');
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
    setUser(null);
    setCurrentScreen('login');
    setCompletedSkills(new Set());
  };

  return (
    <div className="app">
      {currentScreen === 'login' && (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
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
          <SkillSelector onSkillSelect={handleSkillSelect} />
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

export default App;
