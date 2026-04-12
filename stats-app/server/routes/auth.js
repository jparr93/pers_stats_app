const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory user storage (in production, use a database)
const users = new Map();
const activeSessions = new Map();

// Pre-populate with demo user
users.set('admin', {
  userId: 'demo-user-001',
  username: 'admin',
  password: 'password123',
  fullName: 'Demo Admin',
  position: 'CM',
  createdAt: new Date()
});

router.post('/signup', (req, res) => {
  const { username, password, fullName, position } = req.body;

  if (!username || !password || !fullName || !position) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (username.length < 3) {
    return res.status(400).json({ error: 'Username must be at least 3 characters' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  if (users.has(username)) {
    return res.status(409).json({ error: 'Username already exists' });
  }

  const userId = uuidv4();
  const token = uuidv4();

  users.set(username, {
    userId,
    username,
    password,
    fullName,
    position,
    createdAt: new Date()
  });

  activeSessions.set(token, {
    userId,
    username,
    fullName,
    position,
    createdAt: new Date()
  });

  res.status(201).json({
    success: true,
    token,
    userId,
    username,
    fullName,
    position
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  const user = users.get(username);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = uuidv4();

  activeSessions.set(token, {
    userId: user.userId,
    username: user.username,
    fullName: user.fullName,
    position: user.position,
    createdAt: new Date()
  });

  return res.json({
    success: true,
    token,
    userId: user.userId,
    username: user.username,
    fullName: user.fullName,
    position: user.position
  });
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
