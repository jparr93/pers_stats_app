const express = require('express');
const router = express.Router();

// Use shared data structures from app.locals
let userScores;
let scoreHistory;

// Initialize data structures from app.locals
router.use((req, res, next) => {
  userScores = req.app.locals.userScores;
  scoreHistory = req.app.locals.scoreHistory;
  next();
});

// Skills with 5 drills each
const skills = {
  shooting: {
    id: 'shooting',
    name: 'Shooting',
    description: 'Test your finishing ability',
    drills: [
      { id: 1, name: 'Finesse Shot', description: 'Perform finesse shots from the box', videoPlaceholder: 'video1' },
      { id: 2, name: 'Power Shot', description: 'Execute power shots with accuracy', videoPlaceholder: 'video2' },
      { id: 3, name: 'Headers', description: 'Score headers from crosses', videoPlaceholder: 'video3' },
      { id: 4, name: 'Penalties', description: 'Perfect your penalty taking', videoPlaceholder: 'video4' },
      { id: 5, name: 'Long Range', description: 'Score from distance', videoPlaceholder: 'video5' }
    ]
  },
  passing: {
    id: 'passing',
    name: 'Passing',
    description: 'Master ball distribution',
    drills: [
      { id: 1, name: 'Short Pass', description: 'Complete short passing drills', videoPlaceholder: 'video1' },
      { id: 2, name: 'Long Pass', description: 'Deliver accurate long balls', videoPlaceholder: 'video2' },
      { id: 3, name: 'Cross', description: 'Perfect your crossing technique', videoPlaceholder: 'video3' },
      { id: 4, name: 'Through Ball', description: 'Play killer through balls', videoPlaceholder: 'video4' },
      { id: 5, name: 'One-Touch', description: 'Execute one-touch passes', videoPlaceholder: 'video5' }
    ]
  },
  dribbling: {
    id: 'dribbling',
    name: 'Dribbling',
    description: 'Improve your ball control',
    drills: [
      { id: 1, name: 'Ball Control', description: 'Master close ball control', videoPlaceholder: 'video1' },
      { id: 2, name: 'Stepovers', description: 'Execute effective stepovers', videoPlaceholder: 'video2' },
      { id: 3, name: 'Elastico', description: 'Perform elastico roulettes', videoPlaceholder: 'video3' },
      { id: 4, name: 'Speed Burst', description: 'Sprint with the ball', videoPlaceholder: 'video4' },
      { id: 5, name: 'Agility', description: 'Quick direction changes', videoPlaceholder: 'video5' }
    ]
  },
  strength: {
    id: 'strength',
    name: 'Strength',
    description: 'Physical presence on the field',
    drills: [
      { id: 1, name: 'Shielding', description: 'Shield the ball effectively', videoPlaceholder: 'video1' },
      { id: 2, name: 'Strength Duel', description: 'Win strength battles', videoPlaceholder: 'video2' },
      { id: 3, name: 'Hold Up Play', description: 'Hold possession against defenders', videoPlaceholder: 'video3' },
      { id: 4, name: 'Positioning', description: 'Strategic positioning', videoPlaceholder: 'video4' },
      { id: 5, name: 'Power', description: 'Generate power in actions', videoPlaceholder: 'video5' }
    ]
  },
  defending: {
    id: 'defending',
    name: 'Defending',
    description: 'Defensive expertise',
    drills: [
      { id: 1, name: 'Tackling', description: 'Execute clean tackles', videoPlaceholder: 'video1' },
      { id: 2, name: 'Positioning', description: 'Defensive positioning', videoPlaceholder: 'video2' },
      { id: 3, name: 'Interception', description: 'Read and intercept passes', videoPlaceholder: 'video3' },
      { id: 4, name: 'Marking', description: 'Tight marking technique', videoPlaceholder: 'video4' },
      { id: 5, name: 'Clearance', description: 'Clear the ball effectively', videoPlaceholder: 'video5' }
    ]
  },
  speed: {
    id: 'speed',
    name: 'Speed',
    description: 'Pace and acceleration',
    drills: [
      { id: 1, name: 'Sprint', description: 'Maximum speed sprints', videoPlaceholder: 'video1' },
      { id: 2, name: 'Acceleration', description: 'Quick acceleration drills', videoPlaceholder: 'video2' },
      { id: 3, name: 'Running', description: 'Sustained running pace', videoPlaceholder: 'video3' },
      { id: 4, name: 'Explosive Power', description: 'Explosive movements', videoPlaceholder: 'video4' },
      { id: 5, name: 'Stamina', description: 'Maintain speed throughout', videoPlaceholder: 'video5' }
    ]
  }
};

// Get all skills
router.get('/', (req, res) => {
  const skillsList = Object.values(skills).map(skill => ({
    id: skill.id,
    name: skill.name,
    description: skill.description,
    drillCount: skill.drills.length
  }));
  res.json(skillsList);
});

// Get specific skill with all drills
router.get('/:skillId', (req, res) => {
  const skill = skills[req.params.skillId];
  
  if (!skill) {
    return res.status(404).json({ error: 'Skill not found' });
  }

  res.json(skill);
});

// Calculate average score for a skill (0-13 scale to 0-100 scale)
// POST /api/skills/shooting/calculate-score
router.post('/:skillId/calculate-score', (req, res) => {
  const { skillId } = req.params;
  const { userId, drillScores } = req.body;

  if (!userId || !Array.isArray(drillScores) || drillScores.length !== 5) {
    return res.status(400).json({ error: 'Invalid request - need userId and array of 5 drill scores' });
  }

  // Validate each score is between 0-13
  const validScores = drillScores.every(score => {
    const num = parseInt(score);
    return !isNaN(num) && num >= 0 && num <= 13;
  });

  if (!validScores) {
    return res.status(400).json({ error: 'All scores must be between 0 and 13' });
  }

  // Convert 0-13 scale to 0-100 scale
  // Formula: (sum of scores / (5 * 13)) * 100
  const totalScore = drillScores.reduce((sum, score) => sum + parseInt(score), 0);
  const averageScore = Math.round((totalScore / (5 * 13)) * 100);

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
    drillScores,
    averageScore,
    message: `${skillId} average score: ${averageScore} out of 100`
  });
});

module.exports = router;
