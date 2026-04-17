import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScoreTrendChart from './ScoreTrendChart';
import './HomeScreen.css';

// Generate fake teammates data
const generateFakeTeammates = () => {
  const firstNames = ['Alex', 'Jordan', 'Casey', 'Morgan', 'Taylor', 'Riley', 'Cameron', 'Dakota'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
  const positions = ['ST', 'CF', 'LW', 'RW', 'CAM', 'CM', 'CDM', 'LB', 'RB', 'CB'];

  return Array.from({ length: 10 }, () => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return {
      name: `${firstName} ${lastName}`,
      position: positions[Math.floor(Math.random() * positions.length)],
      overall: Math.floor(Math.random() * 30) + 65,
      shooting: Math.floor(Math.random() * 30) + 60,
      passing: Math.floor(Math.random() * 30) + 60,
      dribbling: Math.floor(Math.random() * 30) + 60,
      defending: Math.floor(Math.random() * 30) + 60,
      speed: Math.floor(Math.random() * 30) + 60,
      strength: Math.floor(Math.random() * 30) + 60
    };
  }).sort((a, b) => b.overall - a.overall);
};

function HomeScreen({ onNavigate }) {
  const [userStats, setUserStats] = useState(null);
  const [averageStats, setAverageStats] = useState(null);
  const [scoreHistory, setScoreHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [teammates, setTeammates] = useState([]);

  useEffect(() => {
    fetchUserStats();
    setTeammates(generateFakeTeammates());
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

        {/* Teammates Comparison Table */}
        <div className="stats-card full-width teammates-card">
          <h2>Your Skills vs Teammates</h2>
          <div className="teammates-table-container">
            <table className="teammates-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>Position</th>
                  <th>Overall</th>
                  <th>SHO</th>
                  <th>PAS</th>
                  <th>DRI</th>
                  <th>DEF</th>
                  <th>PAC</th>
                  <th>PHY</th>
                </tr>
              </thead>
              <tbody>
                {/* Current User Row */}
                <tr className="user-row">
                  <td>👑</td>
                  <td className="player-name">{localStorage.getItem('fullName')}</td>
                  <td>{localStorage.getItem('position')}</td>
                  <td className="overall-cell">{userStats?.overallRating || '--'}</td>
                  <td className="skill-cell">{userStats?.skills?.shooting?.score || '--'}</td>
                  <td className="skill-cell">{userStats?.skills?.passing?.score || '--'}</td>
                  <td className="skill-cell">{userStats?.skills?.dribbling?.score || '--'}</td>
                  <td className="skill-cell">{userStats?.skills?.defending?.score || '--'}</td>
                  <td className="skill-cell">{userStats?.skills?.speed?.score || '--'}</td>
                  <td className="skill-cell">{userStats?.skills?.strength?.score || '--'}</td>
                </tr>

                {/* Teammates Rows */}
                {teammates.map((teammate, index) => (
                  <tr key={index} className={index < 3 ? 'top-player' : ''}>
                    <td className="rank">#{index + 1}</td>
                    <td className="player-name">{teammate.name}</td>
                    <td>{teammate.position}</td>
                    <td className="overall-cell">{teammate.overall}</td>
                    <td className="skill-cell">{teammate.shooting}</td>
                    <td className="skill-cell">{teammate.passing}</td>
                    <td className="skill-cell">{teammate.dribbling}</td>
                    <td className="skill-cell">{teammate.defending}</td>
                    <td className="skill-cell">{teammate.speed}</td>
                    <td className="skill-cell">{teammate.strength}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
