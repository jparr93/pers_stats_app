const express = require('express');
const router = express.Router();

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

module.exports = router;
