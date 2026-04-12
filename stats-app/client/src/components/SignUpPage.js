import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

function SignUpPage({ onSignUpSuccess, onToggleMode }) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('ST');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const positions = [
    'GK', // Goalkeeper
    'CB', // Center Back
    'LB', // Left Back
    'RB', // Right Back
    'CM', // Center Midfielder
    'CDM', // Defensive Midfielder
    'CAM', // Attacking Midfielder
    'LM', // Left Midfielder
    'RM', // Right Midfielder
    'LW', // Left Winger
    'RW', // Right Winger
    'ST', // Striker
    'CF'  // Center Forward
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/signup', {
        username,
        password,
        fullName,
        position
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('fullName', response.data.fullName);
      localStorage.setItem('position', response.data.position);

      onSignUpSuccess(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">FUT STATS</h1>
        <p className="login-subtitle">Create Your Account</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username (min 3 chars)"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a password (min 6 chars)"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="position">Position</label>
            <select
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              disabled={loading}
            >
              {positions.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="toggle-mode">
          <p>Already have an account? <button type="button" onClick={onToggleMode} className="toggle-btn">Login</button></p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
