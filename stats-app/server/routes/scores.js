const express = require('express');
const router = express.Router();
const { generatePlayerCard } = require('../utils/cardGenerator');

// In-memory user data storage
const userScores = new Map();

// Submit scores for a skill
router.post('/submit', (req, res) => {
  const { userId, skillId, drillScores } = req.body;

  if (!userId || !skillId || !Array.isArray(drillScores)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Calculate average score
  const averageScore = Math.round(
    drillScores.reduce((sum, score) => sum + parseInt(score), 0) / drillScores.length
  );

  // Store the score
  if (!userScores.has(userId)) {
    userScores.set(userId, {});
  }

  const userSkillScores = userScores.get(userId);
  userSkillScores[skillId] = {
    score: averageScore,
    drillScores,
    submittedAt: new Date()
  };

  res.json({
    success: true,
    skillId,
    averageScore,
    message: `${skillId} score recorded: ${averageScore}`
  });
});

// Get user's scores
router.get('/user/:userId', (req, res) => {
  const { userId } = req.params;
  const scores = userScores.get(userId) || {};
  
  res.json({
    userId,
    scores
  });
});

// Generate player card
router.post('/generate-card', (req, res) => {
  const { userId, playerName } = req.body;

  if (!userId || !playerName) {
    return res.status(400).json({ error: 'userId and playerName required' });
  }

  const userSkillScores = userScores.get(userId);

  if (!userSkillScores) {
    return res.status(404).json({ error: 'No scores found for user' });
  }

  const skillsAvailable = Object.keys(userSkillScores).length;
  if (skillsAvailable === 0) {
    return res.status(400).json({ error: 'No skill scores recorded' });
  }

  const card = generatePlayerCard(playerName, userSkillScores);
  
  res.json({
    success: true,
    card
  });
});

// Get player card
router.get('/card/:userId', (req, res) => {
  const { userId } = req.params;
  const userSkillScores = userScores.get(userId);

  if (!userSkillScores || Object.keys(userSkillScores).length === 0) {
    return res.status(404).json({ error: 'No card generated yet' });
  }

  res.json({
    userId,
    card: userScores.get(userId)
  });
});

module.exports = router;
