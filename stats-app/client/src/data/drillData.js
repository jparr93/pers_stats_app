// Comprehensive drill data for all skills with descriptions and techniques
export const drillData = {
  shooting: {
    name: 'Shooting',
    drills: [
      {
        id: 'shooting-1',
        name: 'Long Range',
        description: 'Strike the ball from distance with power and accuracy. Focus on a clean contact and follow-through.',
        technique: 'Position yourself 20-30 yards from goal. Plant your standing leg beside the ball. Swing through with your kicking leg, keeping your head down. Follow through towards the target.',
        tips: [
          'Keep your head steady over the ball',
          'Use the laces for maximum power',
          'Follow through in the direction you want the ball to go'
        ],
        animationType: 'shootingLongRange'
      },
      {
        id: 'shooting-2',
        name: 'Finesse',
        description: 'Place the ball with precision and control. Prioritize accuracy over power.',
        technique: 'Use the inside of your foot for better control. Make contact in the center of the ball with a smooth, controlled swing.',
        tips: [
          'Use inside foot for control',
          'Shorter backswing for accuracy',
          'Aim for the corners of the goal'
        ],
        animationType: 'shootingFinesse'
      },
      {
        id: 'shooting-3',
        name: 'Volleys',
        description: 'Strike the ball mid-air before it bounces. Requires timing and coordination.',
        technique: 'Watch the ball closely as it comes towards you. Strike it at the peak of its trajectory with a firm contact.',
        tips: [
          'Track the ball carefully',
          'Strike at the right moment',
          'Keep your body balanced'
        ],
        animationType: 'shootingVolley'
      },
      {
        id: 'shooting-4',
        name: 'Headers',
        description: 'Score using your head. Time your jump and direct the ball with your forehead.',
        technique: 'Position yourself between the ball and the defender. Jump with proper timing. Strike the ball with your forehead, not the top of your head.',
        tips: [
          'Keep your eyes on the ball',
          'Timing is crucial for good headers',
          'Firm contact with your forehead'
        ],
        animationType: 'shootingHeader'
      },
      {
        id: 'shooting-5',
        name: 'Penalties',
        description: 'Convert penalty kicks from the spot. Focus on consistency and nerve.',
        technique: 'Place the ball on the penalty spot. Take a few steps back. Approach with purpose and strike with confidence.',
        tips: [
          'Choose your spot before you shoot',
          'Keep your nerve',
          'Strike through the ball with power'
        ],
        animationType: 'shootingPenalty'
      }
    ]
  },
  passing: {
    name: 'Passing',
    drills: [
      {
        id: 'passing-1',
        name: 'Short Pass',
        description: 'Make accurate short passes (5-15 yards). Control and precision are key.',
        technique: 'Use the inside of your foot. Keep your eyes on your teammate. Follow through smoothly towards your target.',
        tips: [
          'Inside foot ensures accuracy',
          'Keep your passes on the ground',
          'Check your shoulder before passing'
        ],
        animationType: 'passingShort'
      },
      {
        id: 'passing-2',
        name: 'Long Pass',
        description: 'Execute long-range passes (20+ yards) to switch play or find distant teammates.',
        technique: 'Use the laces of your boot for distance. Adjust your body angle. Strike with power while maintaining accuracy.',
        tips: [
          'Use laces for distance',
          'Adjust your run-up angle',
          'Follow through fully'
        ],
        animationType: 'passingLong'
      },
      {
        id: 'passing-3',
        name: 'Through Ball',
        description: 'Play the ball into space for a teammate to run onto. Timing and weight are crucial.',
        technique: 'Identify space behind the defender. Weight the pass so your teammate can run onto it smoothly.',
        tips: [
          'Read the game and anticipate runs',
          'Weight the pass perfectly',
          'Play into space, not at feet'
        ],
        animationType: 'passingThrough'
      },
      {
        id: 'passing-4',
        name: 'Crosses',
        description: 'Deliver the ball from the wing to the box. Set up scoring opportunities for strikers.',
        technique: 'Get width on the flank. Look up and identify attackers in the box. Deliver with pace and accuracy.',
        tips: [
          'Get your body side-on to the field',
          'Pace the cross accurately',
          'Communicate with your forwards'
        ],
        animationType: 'passingCross'
      },
      {
        id: 'passing-5',
        name: 'Chip Pass',
        description: 'Loft the ball over defenders. Technique requires a short, sharp contact.',
        technique: 'Strike underneath the ball with a short backswing. Generate height with a quick flicking motion.',
        tips: [
          'Short, sharp backswing',
          'Contact the ball underneath',
          'Flick it upwards with your foot'
        ],
        animationType: 'passingChip'
      }
    ]
  },
  dribbling: {
    name: 'Dribbling',
    drills: [
      {
        id: 'dribbling-1',
        name: 'Close Control',
        description: 'Keep the ball tight to your feet while moving. Maintain possession in tight spaces.',
        technique: 'Use small touches with the inside and outside of your boot. Keep the ball within one step of your body at all times.',
        tips: [
          'Take frequent small touches',
          'Use sole of your foot for quick changes',
          'Keep your head up when possible'
        ],
        animationType: 'dribblingControl'
      },
      {
        id: 'dribbling-2',
        name: 'Speed Dribble',
        description: 'Run with the ball at pace. Push it forward to create space and gain ground quickly.',
        technique: 'Take longer touches pushing the ball 2-3 yards ahead. Accelerate into open space while maintaining control.',
        tips: [
          'Push the ball into space ahead',
          'Use your pace to create distance',
          'Keep your head up to spot threats'
        ],
        animationType: 'dribblingSpeed'
      },
      {
        id: 'dribbling-3',
        name: 'Ball Mastery',
        description: 'Execute skill moves and tricks. Beat defenders with flair and confidence.',
        technique: 'Practice elasticos, cruyff turns, and roulettes. Time your moves when a defender commits to a challenge.',
        tips: [
          'Know your best skill moves',
          'Use them at the right moment',
          'Commit fully to your move'
        ],
        animationType: 'dribblingMastery'
      },
      {
        id: 'dribbling-4',
        name: 'Directional Change',
        description: 'Change direction quickly while dribbling. Evade defenders with sharp turns.',
        technique: 'Plant your foot and push the ball in a new direction. Use your body to shield the ball from defenders.',
        tips: [
          'Use your outside foot for quick changes',
          'Lower your center of gravity',
          'Protect the ball with your body'
        ],
        animationType: 'dribblingChange'
      },
      {
        id: 'dribbling-5',
        name: 'One-on-One',
        description: 'Face a defender in isolation. Create shooting or passing opportunities through dribbling.',
        technique: 'Stay calm under pressure. Use your first touch to create separation. Accelerate past the defender.',
        tips: [
          'Good first touch is crucial',
          'Read the defender\'s movement',
          'Accelerate to push past them'
        ],
        animationType: 'dribblingOneOnOne'
      }
    ]
  },
  defending: {
    name: 'Defending',
    drills: [
      {
        id: 'defending-1',
        name: 'Positioning',
        description: 'Maintain proper defensive shape and positioning. Cut out passing lanes and block shots.',
        technique: 'Stay between the attacker and goal. Watch both the ball and your marker. Anticipate passes.',
        tips: [
          'Position yourself between attacker and goal',
          'Keep your eyes on both ball and player',
          'Adjust your position proactively'
        ],
        animationType: 'defendingPosition'
      },
      {
        id: 'defending-2',
        name: 'Tackling',
        description: 'Win the ball cleanly with a well-timed tackle. Slide tackles and standing tackles.',
        technique: 'Read the attacker\'s movement. Commit to the tackle at the right moment. Make clean contact with the ball.',
        tips: [
          'Timing is everything',
          'Commit fully when you tackle',
          'Make contact with the ball first'
        ],
        animationType: 'defendingTackle'
      },
      {
        id: 'defending-3',
        name: 'Pressing',
        description: 'Close down the ball quickly. Apply pressure to prevent dangerous passes or shots.',
        technique: 'Anticipate where the ball is going. Close the space quickly. Force the attacker into mistakes.',
        tips: [
          'Read the play quickly',
          'Close down at speed',
          'Force hurried decisions'
        ],
        animationType: 'defendingPress'
      },
      {
        id: 'defending-4',
        name: 'Interceptions',
        description: 'Read the game and intercept passes. Prevent dangerous balls reaching attackers.',
        technique: 'Position yourself in likely passing lanes. Watch for patterns in the opponent\'s play. React quickly.',
        tips: [
          'Anticipate the next pass',
          'Position yourself in passing lanes',
          'React quickly to intercept'
        ],
        animationType: 'defendingIntercept'
      },
      {
        id: 'defending-5',
        name: 'Clearance',
        description: 'Clear the ball away from danger under pressure. Make space and prevent shots.',
        technique: 'Get in front of the ball when defending near goal. Strike it firmly away. Head or kick it to safety.',
        tips: [
          'Block shots and crosses',
          'Clear with power, not accuracy',
          'Communicate with your goalkeeper'
        ],
        animationType: 'defendingClear'
      }
    ]
  },
  speed: {
    name: 'Speed',
    drills: [
      {
        id: 'speed-1',
        name: 'Acceleration',
        description: 'Start quickly from a standing position. Generate pace rapidly.',
        technique: 'Use powerful strides from your first few steps. Pump your arms and drive your knees up.',
        tips: [
          'Push hard with your legs',
          'Drive your arms',
          'Maintain good form'
        ],
        animationType: 'speedAccel'
      },
      {
        id: 'speed-2',
        name: 'Top Speed',
        description: 'Reach maximum running velocity. Sustain high-speed sprints.',
        technique: 'After acceleration, extend your stride length. Maintain explosive power throughout.',
        tips: [
          'Extend your stride length',
          'Maintain momentum',
          'Use your legs efficiently'
        ],
        animationType: 'speedTop'
      },
      {
        id: 'speed-3',
        name: 'Agility',
        description: 'Move quickly and change direction. Navigate through traffic at pace.',
        technique: 'Keep your steps light and quick. Use your core to change direction. Stay on the balls of your feet.',
        tips: [
          'Stay on the balls of your feet',
          'Use quick steps',
          'Keep your arms for balance'
        ],
        animationType: 'speedAgility'
      },
      {
        id: 'speed-4',
        name: 'Stamina',
        description: 'Maintain intensity throughout the match. Keep your pace in the second half.',
        technique: 'Manage your energy in early phases. Build intensity as the match progresses. Avoid wasteful movement.',
        tips: [
          'Manage your energy',
          'Build intensity gradually',
          'Stay focused'
        ],
        animationType: 'speedStamina'
      },
      {
        id: 'speed-5',
        name: 'Sprint Endurance',
        description: 'Perform repeated high-intensity efforts. Multiple sprints without losing pace.',
        technique: 'Recover efficiently between efforts. Maintain explosive power in multiple sprints.',
        tips: [
          'Recover between efforts',
          'Stay explosive',
          'Mental toughness matters'
        ],
        animationType: 'speedSprint'
      }
    ]
  },
  strength: {
    name: 'Strength',
    drills: [
      {
        id: 'strength-1',
        name: 'Physical Presence',
        description: 'Use your body to shield the ball and maintain position. Don\'t get pushed off easily.',
        technique: 'Keep a low center of gravity. Use your arms (legally) to feel the defender. Maintain your balance.',
        tips: [
          'Lower your center of gravity',
          'Keep your knees bent',
          'Feel the defender\'s movement'
        ],
        animationType: 'strengthPresence'
      },
      {
        id: 'strength-2',
        name: 'Ball Retention',
        description: 'Hold possession under pressure. Protect the ball from defenders.',
        technique: 'Turn your body away from defenders. Keep the ball on your far side. Use your body as a shield.',
        tips: [
          'Turn away from pressure',
          'Shield the ball',
          'Keep your body between ball and defender'
        ],
        animationType: 'strengthRetention'
      },
      {
        id: 'strength-3',
        name: 'Physical Battle',
        description: 'Win contested situations and aerial duels. Out-strength your opponents.',
        technique: 'Use good positioning. Get your body between opponent and ball. Time your contact.',
        tips: [
          'Position yourself well',
          'Use proper technique',
          'Commit fully'
        ],
        animationType: 'strengthBattle'
      },
      {
        id: 'strength-4',
        name: 'Resistance to Pressure',
        description: 'Stay balanced when challenged. Resist being knocked off the ball.',
        technique: 'Widen your stance. Engage your core muscles. Brace for contact.',
        tips: [
          'Widen your base',
          'Brace your core',
          'Anticipate contact'
        ],
        animationType: 'strengthResist'
      },
      {
        id: 'strength-5',
        name: 'Power Output',
        description: 'Apply maximum force in your actions. Powerful shots, passes, and movements.',
        technique: 'Generate power from your core and legs. Transfer energy through your kinetic chain.',
        tips: [
          'Generate power from your core',
          'Full commitment',
          'Smooth energy transfer'
        ],
        animationType: 'strengthPower'
      }
    ]
  }
};

export const getDrillBySkillAndType = (skillId, drillIndex) => {
  const skill = drillData[skillId];
  if (skill && skill.drills[drillIndex]) {
    return skill.drills[drillIndex];
  }
  return null;
};

export const getDrillsBySkill = (skillId) => {
  const skill = drillData[skillId];
  return skill ? skill.drills : [];
};
