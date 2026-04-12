const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Hard-coded credentials as per requirements
const validCredentials = {
  username: 'admin',
  password: 'password123'
};

// In-memory user sessions
const activeSessions = new Map();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  if (username === validCredentials.username && password === validCredentials.password) {
    const userId = uuidv4();
    const token = uuidv4();
    
    activeSessions.set(token, {
      userId,
      username,
      createdAt: new Date()
    });

    return res.json({
      success: true,
      token,
      userId,
      username
    });
  }

  res.status(401).json({ error: 'Invalid credentials' });
});

router.post('/logout', (req, res) => {
  const { token } = req.body;
  activeSessions.delete(token);
  res.json({ success: true, message: 'Logged out' });
});

router.get('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token || !activeSessions.has(token)) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  const session = activeSessions.get(token);
  res.json({ valid: true, session });
});

module.exports = router;
