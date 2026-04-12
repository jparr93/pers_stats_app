function generatePlayerCard(playerName, skillScores) {
  // Calculate overall rating
  const skillArray = Object.values(skillScores);
  const overallRating = Math.round(
    skillArray.reduce((sum, skill) => sum + skill.score, 0) / skillArray.length
  );

  // Determine card position/role based on skills
  let position = determinePosition(skillScores);

  const card = {
    playerName,
    overallRating,
    position,
    skills: {
      shooting: skillScores.shooting?.score || 0,
      passing: skillScores.passing?.score || 0,
      dribbling: skillScores.dribbling?.score || 0,
      strength: skillScores.strength?.score || 0,
      defending: skillScores.defending?.score || 0,
      speed: skillScores.speed?.score || 0
    },
    generatedAt: new Date(),
    rarity: determineRarity(overallRating)
  };

  return card;
}

function determinePosition(skillScores) {
  const scores = skillScores;
  
  const shooting = scores.shooting?.score || 0;
  const passing = scores.passing?.score || 0;
  const defending = scores.defending?.score || 0;
  const dribbling = scores.dribbling?.score || 0;

  // Position determination logic
  if (defending > 75 && defending > shooting) {
    return 'CB'; // Center Back
  } else if (passing > 80 && passing > shooting) {
    return 'CM'; // Center Midfielder
  } else if (dribbling > 80 && shooting > 75) {
    return 'RW'; // Right Winger
  } else if (shooting > 80) {
    return 'ST'; // Striker
  } else if (passing > 75) {
    return 'CAM'; // Attacking Midfielder
  } else {
    return 'MF'; // Midfielder
  }
}

function determineRarity(overallRating) {
  if (overallRating >= 90) return 'Gold';
  if (overallRating >= 80) return 'Silver';
  if (overallRating >= 70) return 'Bronze';
  return 'Common';
}

module.exports = {
  generatePlayerCard,
  determinePosition,
  determineRarity
};
