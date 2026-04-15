const express = require('express');
const router = express.Router();
const { generatePlayerCard } = require('../utils/cardGenerator');

// In-memory user data storage
const userScores = new Map(); // userId -> { skillId -> { score, drillScores, submittedAt } }
const scoreHistory = new Map(); // userId -> [{ skillId, score, submittedAt }, ...]

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
  if (!scoreHistory.has(userId)) {
    scoreHistory.set(userId, []);
  }

  const userSkillScores = userScores.get(userId);
  const timestamp = new Date();
  
  userSkillScores[skillId] = {
    score: averageScore,
    drillScores,
    submittedAt: timestamp
  };
  
  // Add to history for trend analysis
  scoreHistory.get(userId).push({
    skillId,
    score: averageScore,
    submittedAt: timestamp
  });

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
  const history = scoreHistory.get(userId) || [];
  
  res.json({
    userId,
    scores,
    scoreHistory: history.sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt))
  });
});

// Generate player card
router.post('/generate-card', (req, res) => {
  const { userId, playerName, position } = req.body;

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

  const card = generatePlayerCard(playerName, userSkillScores, position);
  
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

// Get user stats and comparison averages
router.get('/user-stats/:userId', (req, res) => {
  const { userId } = req.params;
  const { position, age, area, team } = req.query;

  const userSkillScores = userScores.get(userId) || {};
  
  // Calculate user's overall stats
  const skillsArray = Object.values(userSkillScores);
  const userStats = {
    skills: userSkillScores,
    skillsCompleted: skillsArray.length,
    overallRating: skillsArray.length > 0 
      ? Math.round(skillsArray.reduce((sum, s) => sum + s.score, 0) / skillsArray.length)
      : null,
    averageScore: skillsArray.length > 0
      ? Math.round(skillsArray.reduce((sum, s) => sum + s.score, 0) / skillsArray.length)
      : null
  };

  // Generate comparison averages (simulated data for demo)
  const generateAverages = () => {
    const baseScore = 70;
    return {
      shooting: baseScore + Math.floor(Math.random() * 15),
      passing: baseScore + Math.floor(Math.random() * 15),
      dribbling: baseScore + Math.floor(Math.random() * 15),
      strength: baseScore + Math.floor(Math.random() * 15),
      defending: baseScore + Math.floor(Math.random() * 15),
      speed: baseScore + Math.floor(Math.random() * 15)
    };
  };

  const averageStats = {
    ageGroup: generateAverages(),
    area: generateAverages(),
    team: generateAverages(),
    position: generateAverages()
  };

  // Get user's score history for charts
  const userHistory = scoreHistory.get(userId) || [];

  res.json({
    userStats,
    averageStats,
    scoreHistory: userHistory.sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt))
  });
});

module.exports = router;
