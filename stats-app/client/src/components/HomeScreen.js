import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScoreTrendChart from './ScoreTrendChart';
import './HomeScreen.css';

function HomeScreen({ onNavigate }) {
  const [userStats, setUserStats] = useState(null);
  const [averageStats, setAverageStats] = useState(null);
  const [scoreHistory, setScoreHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      const position = localStorage.getItem('position');
      const age = localStorage.getItem('age');
      const area = localStorage.getItem('area');
      const team = localStorage.getItem('team');

      const response = await axios.get(`/api/scores/user-stats/${userId}`, {
        params: { position, age, area, team }
      });

      setUserStats(response.data.userStats);
      setAverageStats(response.data.averageStats);
      setScoreHistory(response.data.scoreHistory || []);
    } catch (err) {
      setError('Failed to load statistics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="home-screen">
        <div className="loading-message">Loading your stats...</div>
      </div>
    );
  }

  return (
    <div className="home-screen">
      <div className="home-container">
        <div className="welcome-section">
          <h1>Welcome, {localStorage.getItem('fullName')}!</h1>
          <p className="position-badge">{localStorage.getItem('position')} • {localStorage.getItem('team')}</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="stats-grid">
          {/* Your Scores */}
          <div className="stats-card your-scores">
            <h2>Your Scores</h2>
            <div className="skills-comparison">
              {userStats && userStats.skills ? (
                Object.entries(userStats.skills).map(([skill, score]) => (
                  <div key={skill} className="skill-row">
                    <div className="skill-name">{skill.charAt(0).toUpperCase() + skill.slice(1)}</div>
                    <div className="skill-bar">
                      <div className="bar-fill" style={{ width: `${(score.score / 100) * 100}%` }}></div>
                    </div>
                    <div className="skill-score">{score.score}</div>
                  </div>
                ))
              ) : (
                <p className="no-data">No scores yet. Complete drills to see your scores!</p>
              )}
            </div>
            <button className="nav-btn" onClick={() => onNavigate('skills')}>
              Start Testing →
            </button>
          </div>

          {/* Your Stats Summary */}
          <div className="stats-card your-summary">
            <h2>Your Summary</h2>
            <div className="summary-items">
              <div className="summary-item">
                <div className="summary-label">Overall Rating</div>
                <div className="summary-value">{userStats?.overallRating || '--'}</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Skills Tested</div>
                <div className="summary-value">{userStats?.skillsCompleted || 0}</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Average Score</div>
                <div className="summary-value">{userStats?.averageScore || '--'}</div>
              </div>
            </div>
          </div>

          {/* Age Group Average */}
          <div className="stats-card comparison-card">
            <h2>Age {localStorage.getItem('age')} Average</h2>
            <div className="skills-comparison">
              {averageStats && averageStats.ageGroup ? (
                Object.entries(averageStats.ageGroup).map(([skill, score]) => (
                  <div key={skill} className="skill-row">
                    <div className="skill-name">{skill.charAt(0).toUpperCase() + skill.slice(1)}</div>
                    <div className="skill-bar">
                      <div className="bar-fill comparison" style={{ width: `${(score / 100) * 100}%` }}></div>
                    </div>
                    <div className="skill-score">{score}</div>
                  </div>
                ))
              ) : (
                <p className="no-data">No comparison data available</p>
              )}
            </div>
          </div>

          {/* Area Average */}
          <div className="stats-card comparison-card">
            <h2>{localStorage.getItem('area')} Average</h2>
            <div className="skills-comparison">
              {averageStats && averageStats.area ? (
                Object.entries(averageStats.area).map(([skill, score]) => (
                  <div key={skill} className="skill-row">
                    <div className="skill-name">{skill.charAt(0).toUpperCase() + skill.slice(1)}</div>
                    <div className="skill-bar">
                      <div className="bar-fill comparison" style={{ width: `${(score / 100) * 100}%` }}></div>
                    </div>
                    <div className="skill-score">{score}</div>
                  </div>
                ))
              ) : (
                <p className="no-data">No comparison data available</p>
              )}
            </div>
          </div>

          {/* Team Average */}
          <div className="stats-card comparison-card">
            <h2>{localStorage.getItem('team')} Average</h2>
            <div className="skills-comparison">
              {averageStats && averageStats.team ? (
                Object.entries(averageStats.team).map(([skill, score]) => (
                  <div key={skill} className="skill-row">
                    <div className="skill-name">{skill.charAt(0).toUpperCase() + skill.slice(1)}</div>
                    <div className="skill-bar">
                      <div className="bar-fill comparison" style={{ width: `${(score / 100) * 100}%` }}></div>
                    </div>
                    <div className="skill-score">{score}</div>
                  </div>
                ))
              ) : (
                <p className="no-data">No comparison data available</p>
              )}
            </div>
          </div>

          {/* Position Average */}
          <div className="stats-card comparison-card">
            <h2>{localStorage.getItem('position')} Position Average</h2>
            <div className="skills-comparison">
              {averageStats && averageStats.position ? (
                Object.entries(averageStats.position).map(([skill, score]) => (
                  <div key={skill} className="skill-row">
                    <div className="skill-name">{skill.charAt(0).toUpperCase() + skill.slice(1)}</div>
                    <div className="skill-bar">
                      <div className="bar-fill comparison" style={{ width: `${(score / 100) * 100}%` }}></div>
                    </div>
                    <div className="skill-score">{score}</div>
                  </div>
                ))
              ) : (
                <p className="no-data">No comparison data available</p>
              )}
            </div>
          </div>
        </div>

        {/* Score Trend Charts */}
        <div className="stats-card full-width">
          <ScoreTrendChart scoreHistory={scoreHistory} />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
