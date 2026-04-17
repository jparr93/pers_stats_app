import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [position, setPosition] = useState('ST');
  const [age, setAge] = useState('');
  const [area, setArea] = useState('');
  const [team, setTeam] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const positions = [
    'GK', 'CB', 'LB', 'RB', 'CM', 'CDM', 'CAM', 'LM', 'RM', 'LW', 'RW', 'ST', 'CF'
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // base64 encoded image
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', {
        username,
        password
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('fullName', response.data.fullName);
      localStorage.setItem('position', response.data.position);
      localStorage.setItem('age', response.data.age);
      localStorage.setItem('area', response.data.area);
      localStorage.setItem('team', response.data.team);

      onLoginSuccess(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/signup', {
        username,
        password,
        fullName,
        position,
        age: parseInt(age),
        area,
        team,
        profileImage
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('fullName', response.data.fullName);
      localStorage.setItem('position', response.data.position);
      localStorage.setItem('age', response.data.age);
      localStorage.setItem('area', response.data.area);
      localStorage.setItem('team', response.data.team);
      if (profileImage) {
        localStorage.setItem('profileImage', profileImage);
      }

      onLoginSuccess(response.data);
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
        <p className="login-subtitle">
          {isSignUp ? 'Create Your Account' : 'Generate Your Player Card'}
        </p>

        <form onSubmit={isSignUp ? handleSignUpSubmit : handleLoginSubmit} className="login-form">
          {isSignUp && (
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
          )}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={isSignUp ? "Choose a username (min 3 chars)" : "Enter username"}
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
              placeholder={isSignUp ? "Choose a password (min 6 chars)" : "Enter password"}
              disabled={loading}
            />
          </div>

          {isSignUp && (
            <>
              <div className="form-group image-upload-group">
                <label>Profile Picture</label>
                <div className="image-upload-wrapper">
                  {imagePreview && (
                    <img src={imagePreview} alt="Profile preview" className="image-preview" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={loading}
                    id="profileImage"
                    className="image-input"
                  />
                  <label htmlFor="profileImage" className="image-upload-label">
                    {imagePreview ? '📷 Change Photo' : '📷 Choose Photo'}
                  </label>
                </div>
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

              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter your age"
                  disabled={loading}
                  min="13"
                  max="100"
                />
              </div>

              <div className="form-group">
                <label htmlFor="area">Area/Region</label>
                <input
                  type="text"
                  id="area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="City or region (e.g., London, California)"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="team">Team</label>
                <input
                  type="text"
                  id="team"
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  placeholder="Your team name"
                  disabled={loading}
                />
              </div>
            </>
          )}

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? (isSignUp ? 'Creating Account...' : 'Logging in...') : (isSignUp ? 'Sign Up' : 'Login')}
          </button>
        </form>

        <div className="toggle-mode">
          <p>
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button 
              type="button" 
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setUsername('');
                setPassword('');
                setFullName('');
                setPosition('ST');
              }} 
              className="toggle-btn"
            >
              {isSignUp ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>

        {!isSignUp && (
          <div className="demo-credentials">
            <p>Demo Credentials:</p>
            <p>Username: <strong>admin</strong></p>
            <p>Password: <strong>password123</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
