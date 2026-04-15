import React from 'react';
import './DrillAnimation.css';

const DrillAnimation = ({ animationType }) => {
  // Soccer player SVG component for animations
  const SoccerPlayer = ({ x, y, rotation = 0, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
      {/* Head */}
      <circle cx="0" cy="-25" r="8" fill="#f4a460" stroke="#333" strokeWidth="0.5" />
      {/* Body */}
      <rect x="-5" y="-15" width="10" height="15" fill="#1a73e8" stroke="#333" strokeWidth="0.5" />
      {/* Left Arm */}
      <line x1="-5" y1="-10" x2="-15" y2="0" stroke="#f4a460" strokeWidth="2" strokeLinecap="round" />
      {/* Right Arm */}
      <line x1="5" y1="-10" x2="15" y2="0" stroke="#f4a460" strokeWidth="2" strokeLinecap="round" />
      {/* Left Leg */}
      <line x1="-3" y1="0" x2="-5" y2="15" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      {/* Right Leg */}
      <line x1="3" y1="0" x2="5" y2="15" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      {/* Left Foot */}
      <circle cx="-5" cy="16" r="2" fill="#000" />
      {/* Right Foot */}
      <circle cx="5" cy="16" r="2" fill="#000" />
    </g>
  );

  // Animation renderers based on type
  const animations = {
    shootingLongRange: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes shootLongRange {
              0% { transform: translateX(0) rotateZ(-10deg); }
              50% { transform: translateX(20px) rotateZ(-30deg); }
              100% { transform: translateX(0) rotateZ(-10deg); }
            }
            .player-shooting { animation: shootLongRange 2s infinite; }
            @keyframes ballTrajectory {
              0% { cx: 100; cy: 200; opacity: 1; }
              100% { cx: 350; cy: 100; opacity: 0.3; }
            }
            .ball-shoot { animation: ballTrajectory 2s infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Goal */}
        <rect x="330" y="80" width="60" height="120" fill="none" stroke="#fff" strokeWidth="3" />
        <line x1="340" y1="100" x2="380" y2="100" stroke="#fff" strokeWidth="1" opacity="0.5" />
        <text x="350" y="145" fontSize="12" fill="#fff" textAnchor="middle">Goal</text>
        {/* Player */}
        <g className="player-shooting">
          <SoccerPlayer x="100" y="200" rotation={-10} />
        </g>
        {/* Ball trajectory */}
        <circle className="ball-shoot" cx="100" cy="200" r="4" fill="#fff" stroke="#333" strokeWidth="0.5" />
        {/* Distance marker */}
        <text x="225" y="250" fontSize="12" fill="#fff" textAnchor="middle">25+ yards</text>
      </svg>
    ),

    shootingFinesse: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes finessShoot {
              0% { transform: translateX(0) rotateZ(0deg); }
              50% { transform: translateX(15px) rotateZ(-15deg); }
              100% { transform: translateX(0) rotateZ(0deg); }
            }
            .player-finesse { animation: finessShoot 2s infinite; }
            @keyframes ballFinesse {
              0% { cx: 100; cy: 200; }
              100% { cx: 330; cy: 140; }
            }
            .ball-finesse { animation: ballFinesse 2s infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Goal with corner target */}
        <rect x="320" y="70" width="70" height="130" fill="none" stroke="#fff" strokeWidth="3" />
        <circle cx="340" cy="85" r="6" fill="rgba(255, 215, 0, 0.5)" />
        <circle cx="360" cy="85" r="6" fill="rgba(255, 215, 0, 0.5)" />
        {/* Player */}
        <g className="player-finesse">
          <SoccerPlayer x="100" y="200" />
        </g>
        {/* Ball */}
        <circle className="ball-finesse" cx="100" cy="200" r="4" fill="#fff" stroke="#333" strokeWidth="0.5" />
        {/* Accuracy indicator */}
        <text x="200" y="250" fontSize="12" fill="#fff" textAnchor="middle">⭐ Precision Shot</text>
      </svg>
    ),

    shootingVolley: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes volleyBall {
              0% { cy: 80; }
              50% { cy: 150; }
              100% { cy: 80; }
            }
            .ball-volley { animation: volleyBall 2s ease-in-out infinite; }
            @keyframes volleyShoot {
              0% { transform: translateY(0) rotateZ(0deg); }
              50% { transform: translateY(-30px) rotateZ(-20deg); }
              100% { transform: translateY(0) rotateZ(0deg); }
            }
            .player-volley { animation: volleyShoot 2s infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Goal */}
        <rect x="320" y="70" width="70" height="130" fill="none" stroke="#fff" strokeWidth="3" />
        {/* Player */}
        <g className="player-volley">
          <SoccerPlayer x="100" y="180" rotation={-15} />
        </g>
        {/* Ball in air */}
        <circle className="ball-volley" cx="100" cy="80" r="4" fill="#fff" stroke="#333" strokeWidth="0.5" />
        {/* Trajectory line */}
        <line x1="100" y1="150" x2="340" y2="100" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" strokeDasharray="5,5" />
        <text x="200" y="250" fontSize="12" fill="#fff" textAnchor="middle">🎯 Mid-Air Strike</text>
      </svg>
    ),

    shootingHeader: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes headerJump {
              0% { transform: translateY(0); }
              50% { transform: translateY(-40px); }
              100% { transform: translateY(0); }
            }
            .player-header { animation: headerJump 2s infinite; }
            @keyframes ballIncoming {
              0% { cx: 50; cy: 100; }
              50% { cx: 130; cy: 120; }
              100% { cx: 200; cy: 200; }
            }
            .ball-incoming { animation: ballIncoming 2s infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Goal */}
        <rect x="300" y="70" width="90" height="130" fill="none" stroke="#fff" strokeWidth="3" />
        {/* Incoming player (defender) */}
        <g opacity="0.5">
          <SoccerPlayer x="120" y="240" />
        </g>
        {/* Header player */}
        <g className="player-header">
          <SoccerPlayer x="150" y="180" />
        </g>
        {/* Ball trajectory */}
        <circle className="ball-incoming" cx="100" cy="120" r="4" fill="#fff" stroke="#333" strokeWidth="0.5" />
        <text x="200" y="260" fontSize="12" fill="#fff" textAnchor="middle">⬆️ Aerial Challenge</text>
      </svg>
    ),

    shootingPenalty: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes penaltyApproach {
              0% { transform: translateX(-80px); }
              50% { transform: translateX(-20px) rotateZ(-15deg); }
              100% { transform: translateX(-80px); }
            }
            .player-penalty { animation: penaltyApproach 2.5s infinite; }
            @keyframes penaltyBall {
              0% { cx: 120; cy: 200; }
              60% { cx: 320; cy: 150; }
              100% { cx: 350; cy: 100; }
            }
            .ball-penalty { animation: penaltyBall 2.5s infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Penalty spot */}
        <circle cx="120" cy="200" r="2" fill="#fff" />
        {/* Goal */}
        <rect x="300" y="70" width="90" height="130" fill="none" stroke="#fff" strokeWidth="3" />
        {/* Goal line */}
        <line x1="290" y1="70" x2="290" y2="200" stroke="#fff" strokeWidth="1" opacity="0.5" />
        {/* Player */}
        <g className="player-penalty">
          <SoccerPlayer x="120" y="200" rotation={-15} />
        </g>
        {/* Ball */}
        <circle className="ball-penalty" cx="120" cy="200" r="4" fill="#fff" stroke="#333" strokeWidth="0.5" />
        <text x="200" y="260" fontSize="12" fill="#fff" textAnchor="middle">🎯 Penalty Kick - 12 yards</text>
      </svg>
    ),

    passingShort: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes passShortPlayer {
              0% { transform: translateX(0); }
              50% { transform: translateX(20px) rotateZ(-10deg); }
              100% { transform: translateX(0); }
            }
            .passer { animation: passShortPlayer 2s infinite; }
            @keyframes passShortBall {
              0% { cx: 80; cy: 150; }
              50% { cx: 160; cy: 150; }
              100% { cx: 240; cy: 150; }
            }
            .pass-ball { animation: passShortBall 2s infinite; }
            @keyframes receiverRun {
              0% { transform: translateX(0); }
              50% { transform: translateX(20px); }
              100% { transform: translateX(0); }
            }
            .receiver { animation: receiverRun 2s infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Passer */}
        <g className="passer">
          <SoccerPlayer x="80" y="150" />
        </g>
        {/* Receiver */}
        <g className="receiver">
          <SoccerPlayer x="240" y="150" fill="rgba(200, 200, 200, 0.7)" />
        </g>
        {/* Pass line */}
        <line x1="80" y1="170" x2="240" y2="170" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" opacity="0.5" />
        {/* Ball */}
        <circle className="pass-ball" cx="100" cy="150" r="4" fill="#fff" stroke="#333" strokeWidth="0.5" />
        <text x="200" y="250" fontSize="12" fill="#fff" textAnchor="middle">5-15 yards | Ground Pass</text>
      </svg>
    ),

    passingLong: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes passLongBall {
              0% { cx: 60; cy: 200; }
              50% { cx: 200; cy: 80; }
              100% { cx: 340; cy: 100; }
            }
            .pass-long-ball { animation: passLongBall 2s ease-out infinite; }
            @keyframes passLongPlayer {
              0% { transform: translateX(0) rotateZ(0deg); }
              30% { transform: translateX(10px) rotateZ(-20deg); }
              35% { transform: translateX(0) rotateZ(0deg); }
              100% { transform: translateX(0) rotateZ(0deg); }
            }
            .passer-long { animation: passLongPlayer 2s infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Passer */}
        <g className="passer-long">
          <SoccerPlayer x="60" y="200" rotation={-20} />
        </g>
        {/* Receiver */}
        <g opacity="0.6">
          <SoccerPlayer x="340" y="100" />
        </g>
        {/* Ball trajectory */}
        <circle className="pass-long-ball" cx="60" cy="200" r="4" fill="#fff" stroke="#333" strokeWidth="0.5" />
        {/* Dashed trajectory line */}
        <path d="M 60 200 Q 200 50 340 100" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" fill="none" strokeDasharray="5,5" />
        <text x="200" y="260" fontSize="12" fill="#fff" textAnchor="middle">20+ yards | Switch Play</text>
      </svg>
    ),

    passingThrough: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes throughBall {
              0% { cx: 80; cy: 200; }
              100% { cx: 320; cy: 100; }
            }
            .through-ball { animation: throughBall 1.5s ease-out infinite; }
            @keyframes defenderPosition {
              0% { transform: translateX(0); }
              50% { transform: translateX(-15px); }
              100% { transform: translateX(0); }
            }
            .defender { animation: defenderPosition 1.5s infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Passer */}
        <SoccerPlayer x="80" y="200" />
        {/* Defender (trying to block) */}
        <g className="defender" opacity="0.7">
          <SoccerPlayer x="200" y="180" fill="#d32f2f" />
        </g>
        {/* Receiver (running) */}
        <g opacity="0.6">
          <SoccerPlayer x="320" y="100" />
        </g>
        {/* Through ball */}
        <circle className="through-ball" cx="80" cy="200" r="4" fill="#fff" stroke="#333" strokeWidth="0.5" />
        {/* Space indicator */}
        <dashed>
          <line x1="200" y1="160" x2="320" y2="80" stroke="rgba(255, 215, 0, 0.3)" strokeWidth="2" strokeDasharray="3,3" />
        </dashed>
        <text x="200" y="260" fontSize="12" fill="#fff" textAnchor="middle">⚡ Into Space Behind Defender</text>
      </svg>
    ),

    passingCross: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes crossWing {
              0% { transform: translateX(0) translateY(0); }
              50% { transform: translateX(80px) translateY(-10px); }
              100% { transform: translateX(160px) translateY(0); }
            }
            .crosser { animation: crossWing 2s infinite; }
            @keyframes crossBall {
              0% { cx: 100; cy: 150; }
              50% { cx: 180; cy: 80; }
              100% { cx: 320; cy: 140; }
            }
            .cross-ball { animation: crossBall 2s ease-in infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Goal area */}
        <rect x="300" y="60" width="90" height="140" fill="none" stroke="#fff" strokeWidth="2" opacity="0.5" />
        {/* Crosser at wing */}
        <g className="crosser">
          <SoccerPlayer x="100" y="150" />
        </g>
        {/* Strikers in box (faded) */}
        <g opacity="0.5">
          <SoccerPlayer x="330" y="100" fill="#1a73e8" />
          <SoccerPlayer x="330" y="160" fill="#1a73e8" />
        </g>
        {/* Cross ball */}
        <circle className="cross-ball" cx="100" cy="150" r="4" fill="#fff" stroke="#333" strokeWidth="0.5" />
        <text x="200" y="260" fontSize="12" fill="#fff" textAnchor="middle">🎯 Deliver from Wing</text>
      </svg>
    ),

    passingChip: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes chipBall {
              0% { cx: 100; cy: 200; }
              50% { cx: 200; cy: 50; }
              100% { cx: 300; cy: 180; }
            }
            .chip-ball { animation: chipBall 2s ease-out infinite; }
            @keyframes chipPlayer {
              0% { transform: translateX(0) rotateZ(0deg); }
              20% { transform: translateX(5px) rotateZ(-15deg); }
              25% { transform: translateX(0) rotateZ(0deg); }
              100% { transform: translateX(0) rotateZ(0deg); }
            }
            .chip-player { animation: chipPlayer 2s infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Passer */}
        <g className="chip-player">
          <SoccerPlayer x="100" y="200" rotation={-10} />
        </g>
        {/* Defender (blocking) */}
        <g opacity="0.7">
          <SoccerPlayer x="180" y="190" fill="#d32f2f" />
        </g>
        {/* Receiver */}
        <g opacity="0.5">
          <SoccerPlayer x="300" y="180" />
        </g>
        {/* Chip ball trajectory */}
        <circle className="chip-ball" cx="100" cy="200" r="4" fill="#fff" stroke="#333" strokeWidth="0.5" />
        {/* Arc */}
        <path d="M 100 200 Q 200 50 300 180" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" fill="none" strokeDasharray="5,5" />
        <text x="200" y="260" fontSize="12" fill="#fff" textAnchor="middle">⬆️ Loft Over Defender</text>
      </svg>
    ),

    dribblingControl: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes tightDribble {
              0% { transform: translateX(0) translateY(0); }
              25% { transform: translateX(10px) translateY(-5px); }
              50% { transform: translateX(20px) translateY(0); }
              75% { transform: translateX(10px) translateY(5px); }
              100% { transform: translateX(0) translateY(0); }
            }
            .dribbler { animation: tightDribble 2s infinite; }
            @keyframes ballClose {
              0% { cx: 80; cy: 150; }
              25% { cx: 90; cy: 145; }
              50% { cx: 100; cy: 150; }
              75% { cx: 90; cy: 155; }
              100% { cx: 80; cy: 150; }
            }
            .dribble-ball { animation: ballClose 2s infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Cone obstacles */}
        <circle cx="150" cy="100" r="5" fill="#ff9800" opacity="0.6" />
        <circle cx="210" cy="150" r="5" fill="#ff9800" opacity="0.6" />
        <circle cx="270" cy="100" r="5" fill="#ff9800" opacity="0.6" />
        {/* Dribbler */}
        <g className="dribbler">
          <SoccerPlayer x="80" y="150" />
        </g>
        {/* Ball */}
        <circle className="dribble-ball" cx="80" cy="150" r="4" fill="#fff" stroke="#333" strokeWidth="0.5" />
        <text x="200" y="260" fontSize="12" fill="#fff" textAnchor="middle">🎯 Close Control | Weaving</text>
      </svg>
    ),

    dribblingSpeed: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes speedRun {
              0% { transform: translateX(0); }
              100% { transform: translateX(250px); }
            }
            .speed-dribbler { animation: speedRun 2s ease-in infinite; }
            @keyframes speedBall {
              0% { cx: 60; cy: 150; }
              100% { cx: 310; cy: 150; }
            }
            .speed-ball { animation: speedBall 2s ease-in infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Motion lines */}
        <line x1="50" y1="140" x2="80" y2="140" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" opacity="0.5" />
        <line x1="120" y1="135" x2="150" y2="135" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" opacity="0.5" />
        <line x1="190" y1="140" x2="220" y2="140" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" opacity="0.5" />
        {/* Dribbler running */}
        <g className="speed-dribbler">
          <SoccerPlayer x="60" y="150" rotation={-20} />
        </g>
        {/* Ball */}
        <circle className="speed-ball" cx="60" cy="150" r="4" fill="#fff" stroke="#333" strokeWidth="0.5" />
        <text x="200" y="260" fontSize="12" fill="#fff" textAnchor="middle">⚡ Sprint with Ball | Pace</text>
      </svg>
    ),

    dribblingMastery: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes skillMove {
              0% { transform: translateX(0) rotateZ(0deg); }
              33% { transform: translateX(50px) rotateZ(-30deg); }
              66% { transform: translateX(100px) rotateZ(30deg); }
              100% { transform: translateX(150px) rotateZ(0deg); }
            }
            .skill-player { animation: skillMove 2.5s infinite; }
            @keyframes skillBall {
              0% { cx: 80; cy: 150; }
              33% { cx: 130; cy: 120; }
              66% { cx: 180; cy: 180; }
              100% { cx: 230; cy: 150; }
            }
            .skill-ball { animation: skillBall 2.5s infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Defender */}
        <g opacity="0.7">
          <SoccerPlayer x="100" y="200" fill="#d32f2f" />
        </g>
        {/* Skill player */}
        <g className="skill-player">
          <SoccerPlayer x="80" y="150" />
        </g>
        {/* Ball */}
        <circle className="skill-ball" cx="80" cy="150" r="4" fill="#fff" stroke="#333" strokeWidth="0.5" />
        {/* Skill indicators */}
        <text x="250" y="150" fontSize="16" textAnchor="middle">✨</text>
        <text x="200" y="260" fontSize="12" fill="#fff" textAnchor="middle">✨ Elastico | Cruyff Turn | Roulette</text>
      </svg>
    ),

    dribblingChange: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes directChange {
              0% { transform: translateX(0) translateY(0); }
              50% { transform: translateX(80px) translateY(-80px); }
              100% { transform: translateX(160px) translateY(0); }
            }
            .change-player { animation: directChange 2s infinite; }
            @keyframes changeBall {
              0% { cx: 80; cy: 150; }
              50% { cx: 160; cy: 70; }
              100% { cx: 240; cy: 150; }
            }
            .change-ball { animation: changeBall 2s infinite; }
            @keyframes defenderReact {
              0% { transform: translateX(0); }
              50% { transform: translateX(30px); }
              100% { transform: translateX(0); }
            }
            .defender-change { animation: defenderReact 2s infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Defender */}
        <g className="defender-change" opacity="0.7">
          <SoccerPlayer x="180" y="150" fill="#d32f2f" />
        </g>
        {/* Player changing direction */}
        <g className="change-player">
          <SoccerPlayer x="80" y="150" />
        </g>
        {/* Ball */}
        <circle className="change-ball" cx="80" cy="150" r="4" fill="#fff" stroke="#333" strokeWidth="0.5" />
        <text x="200" y="260" fontSize="12" fill="#fff" textAnchor="middle">🔄 Sharp Direction Change</text>
      </svg>
    ),

    dribblingOneOnOne: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes oneOnOne {
              0% { transform: translateX(0); }
              50% { transform: translateX(100px); }
              100% { transform: translateX(200px); }
            }
            .attacker { animation: oneOnOne 2s infinite; }
            @keyframes defenderChase {
              0% { transform: translateX(50px); }
              50% { transform: translateX(120px); }
              100% { transform: translateX(220px); }
            }
            .one-defender { animation: defenderChase 2s infinite; }
            @keyframes ballOneOnOne {
              0% { cx: 80; cy: 150; }
              100% { cx: 280; cy: 150; }
            }
            .ball-one { animation: ballOneOnOne 2s infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Goal */}
        <rect x="310" y="100" width="70" height="100" fill="none" stroke="#fff" strokeWidth="2" />
        {/* Attacker */}
        <g className="attacker">
          <SoccerPlayer x="80" y="150" />
        </g>
        {/* Defender chasing */}
        <g className="one-defender" opacity="0.7">
          <SoccerPlayer x="100" y="150" fill="#d32f2f" />
        </g>
        {/* Ball */}
        <circle className="ball-one" cx="80" cy="150" r="4" fill="#fff" stroke="#333" strokeWidth="0.5" />
        <text x="200" y="260" fontSize="12" fill="#fff" textAnchor="middle">⚔️ One-vs-One | Create Space</text>
      </svg>
    ),

    defendingPosition: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes defenderPos {
              0% { transform: translateX(0) translateY(0); }
              50% { transform: translateX(-20px) translateY(-20px); }
              100% { transform: translateX(0) translateY(0); }
            }
            .pos-defender { animation: defenderPos 2s infinite; }
            @keyframes attackerMove {
              0% { transform: translateX(0) translateY(0); }
              50% { transform: translateX(30px) translateY(20px); }
              100% { transform: translateX(0) translateY(0); }
            }
            .pos-attacker { animation: attackerMove 2s infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Goal */}
        <rect x="30" y="100" width="70" height="100" fill="none" stroke="#fff" strokeWidth="2" />
        <text x="65" y="155" fontSize="10" fill="#fff" textAnchor="middle">Goal</text>
        {/* Defender (between ball and goal) */}
        <g className="pos-defender">
          <SoccerPlayer x="140" y="150" fill="#1a73e8" />
        </g>
        {/* Attacker */}
        <g className="pos-attacker" opacity="0.7">
          <SoccerPlayer x="250" y="150" fill="#d32f2f" />
        </g>
        {/* Ball */}
        <circle cx="250" cy="150" r="4" fill="#fff" stroke="#333" strokeWidth="0.5" />
        {/* Position line */}
        <line x1="65" y1="150" x2="250" y2="150" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" strokeDasharray="5,5" />
        <text x="200" y="260" fontSize="12" fill="#fff" textAnchor="middle">🛡️ Position Between Ball & Goal</text>
      </svg>
    ),

    defendingTackle: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes defenderSlide {
              0% { transform: translateX(0) rotateZ(0deg); }
              50% { transform: translateX(60px) rotateZ(-20deg); }
              100% { transform: translateX(0) rotateZ(0deg); }
            }
            .tackler { animation: defenderSlide 2s infinite; }
            @keyframes attackerEvade {
              0% { transform: translateX(100px); }
              50% { transform: translateX(140px) translateY(-20px); }
              100% { transform: translateX(100px); }
            }
            .evader { animation: attackerEvade 2s infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Defender slide tackling */}
        <g className="tackler" opacity="0.8">
          <SoccerPlayer x="80" y="180" fill="#1a73e8" />
        </g>
        {/* Attacker */}
        <g className="evader" opacity="0.7">
          <SoccerPlayer x="200" y="150" fill="#d32f2f" />
        </g>
        {/* Ball */}
        <circle cx="200" cy="150" r="4" fill="#fff" stroke="#333" strokeWidth="0.5" />
        {/* Impact indicator */}
        <text x="140" y="170" fontSize="20" textAnchor="middle">💥</text>
        <text x="200" y="260" fontSize="12" fill="#fff" textAnchor="middle">🎯 Slide Tackle | Clean Contact</text>
      </svg>
    ),

    defendingPress: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes pressingDefender {
              0% { transform: translateX(100px); }
              50% { transform: translateX(150px); }
              100% { transform: translateX(100px); }
            }
            .presser { animation: pressingDefender 1.5s infinite; }
            @keyframes pressedAttacker {
              0% { transform: translateX(0); }
              50% { transform: translateX(-15px) rotateZ(10deg); }
              100% { transform: translateX(0); }
            }
            .pressed { animation: pressedAttacker 1.5s infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Ball holder (under pressure) */}
        <g className="pressed" opacity="0.7">
          <SoccerPlayer x="100" y="150" fill="#d32f2f" />
        </g>
        {/* Pressing defender */}
        <g className="presser">
          <SoccerPlayer x="150" y="150" fill="#1a73e8" />
        </g>
        {/* Ball */}
        <circle cx="100" cy="150" r="4" fill="#fff" stroke="#333" strokeWidth="0.5" />
        {/* Pressure lines */}
        <line x1="125" y1="140" x2="155" y2="140" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" />
        <line x1="125" y1="160" x2="155" y2="160" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" />
        <text x="200" y="260" fontSize="12" fill="#fff" textAnchor="middle">⚡ High Press | Close Space</text>
      </svg>
    ),

    defendingIntercept: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes interceptor {
              0% { transform: translateX(150px) rotateZ(0deg); }
              50% { transform: translateX(200px) rotateZ(-15deg); }
              100% { transform: translateX(150px) rotateZ(0deg); }
            }
            .interceptor { animation: interceptor 2s infinite; }
            @keyframes passingBall {
              0% { cx: 100; cy: 150; }
              100% { cx: 300; cy: 150; }
            }
            .intercept-ball { animation: passingBall 2s infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Passer */}
        <SoccerPlayer x="80" y="150" fill="#d32f2f" opacity="0.7" />
        {/* Target receiver */}
        <SoccerPlayer x="300" y="150" fill="#d32f2f" opacity="0.7" />
        {/* Intercepting defender */}
        <g className="interceptor">
          <SoccerPlayer x="150" y="150" fill="#1a73e8" />
        </g>
        {/* Passing lane */}
        <line x1="80" y1="150" x2="300" y2="150" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2" strokeDasharray="5,5" />
        {/* Ball */}
        <circle className="intercept-ball" cx="100" cy="150" r="4" fill="#fff" stroke="#333" strokeWidth="0.5" />
        <text x="200" y="260" fontSize="12" fill="#fff" textAnchor="middle">🔍 Read & Intercept Pass</text>
      </svg>
    ),

    defendingClear: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes clearingDefender {
              0% { transform: translateX(0) rotateZ(0deg); }
              50% { transform: translateX(15px) rotateZ(-25deg); }
              100% { transform: translateX(0) rotateZ(0deg); }
            }
            .clearer { animation: clearingDefender 1.5s infinite; }
            @keyframes clearBall {
              0% { cx: 100; cy: 250; }
              50% { cx: 150; cy: 80; }
              100% { cx: 200; cy: 200; }
            }
            .clear-ball { animation: clearBall 1.5s ease-out infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Goal */}
        <rect x="50" y="80" width="60" height="100" fill="none" stroke="#fff" strokeWidth="2" />
        {/* Attacker threatening */}
        <g opacity="0.7">
          <SoccerPlayer x="140" y="200" fill="#d32f2f" />
        </g>
        {/* Clearing defender */}
        <g className="clearer">
          <SoccerPlayer x="100" y="250" fill="#1a73e8" rotation={-25} />
        </g>
        {/* Ball clearing */}
        <circle className="clear-ball" cx="100" cy="250" r="4" fill="#fff" stroke="#333" strokeWidth="0.5" />
        {/* Clear direction arrow */}
        <text x="200" y="200" fontSize="20" textAnchor="middle">→</text>
        <text x="200" y="260" fontSize="12" fill="#fff" textAnchor="middle">🚀 Clear to Safety</text>
      </svg>
    ),

    speedAccel: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes accelerate {
              0% { transform: translateX(0); }
              100% { transform: translateX(200px); }
            }
            .sprinter { animation: accelerate 2s ease-out infinite; }
            @keyframes motionLines {
              0% { x: 50; opacity: 0; }
              50% { x: 100; opacity: 1; }
              100% { x: 150; opacity: 0; }
            }
            .motion1 { animation: motionLines 1s linear infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Motion lines */}
        <line x1="40" y1="140" x2="70" y2="140" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" />
        <line x1="80" y1="135" x2="110" y2="135" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" />
        <line x1="120" y1="140" x2="150" y2="140" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" />
        <line x1="160" y1="135" x2="190" y2="135" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" />
        {/* Sprinter */}
        <g className="sprinter">
          <SoccerPlayer x="50" y="150" rotation={-30} scale={1.1} />
        </g>
        <text x="200" y="260" fontSize="12" fill="#fff" textAnchor="middle">⚡ Explosive Start | First 5 yards</text>
      </svg>
    ),

    speedTop: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes topSpeed {
              0% { transform: translateX(0); }
              100% { transform: translateX(300px); }
            }
            .topSprinter { animation: topSpeed 1.5s linear infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Multiple motion lines for high speed */}
        <line x1="20" y1="140" x2="40" y2="140" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2.5" />
        <line x1="50" y1="135" x2="70" y2="135" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2.5" />
        <line x1="80" y1="140" x2="100" y2="140" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2.5" />
        <line x1="110" y1="135" x2="130" y2="135" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2.5" />
        <line x1="140" y1="140" x2="160" y2="140" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2.5" />
        {/* Runner at top speed */}
        <g className="topSprinter">
          <SoccerPlayer x="30" y="150" rotation={-40} scale={1.15} />
        </g>
        {/* Speed indicator */}
        <text x="50" y="50" fontSize="14" fill="rgba(255, 215, 0, 0.8)" fontWeight="bold">💨</text>
        <text x="200" y="260" fontSize="12" fill="#fff" textAnchor="middle">🏃 Maximum Velocity</text>
      </svg>
    ),

    speedAgility: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes agilityRun {
              0% { transform: translateX(0) translateY(0); }
              25% { transform: translateX(60px) translateY(-40px); }
              50% { transform: translateX(120px) translateY(0); }
              75% { transform: translateX(180px) translateY(-40px); }
              100% { transform: translateX(240px) translateY(0); }
            }
            .agile-player { animation: agilityRun 2.5s infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Cone course */}
        <circle cx="100" cy="120" r="5" fill="#ff9800" opacity="0.6" />
        <circle cx="160" cy="180" r="5" fill="#ff9800" opacity="0.6" />
        <circle cx="220" cy="120" r="5" fill="#ff9800" opacity="0.6" />
        <circle cx="280" cy="180" r="5" fill="#ff9800" opacity="0.6" />
        {/* Player weaving through cones */}
        <g className="agile-player">
          <SoccerPlayer x="50" y="150" />
        </g>
        {/* Course path */}
        <path d="M 100 120 L 160 180 L 220 120 L 280 180" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" fill="none" strokeDasharray="5,5" />
        <text x="200" y="260" fontSize="12" fill="#fff" textAnchor="middle">🔄 Quick Direction Changes</text>
      </svg>
    ),

    speedStamina: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes staminaRun {
              0% { transform: translateX(0); }
              50% { transform: translateX(180px); }
              100% { transform: translateX(0); }
            }
            .stamina-player { animation: staminaRun 3s ease-in-out infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Minute markers */}
        <text x="60" y="80" fontSize="11" fill="rgba(255, 255, 255, 0.5)">15'</text>
        <text x="190" y="80" fontSize="11" fill="rgba(255, 255, 255, 0.5)">45'</text>
        <text x="320" y="80" fontSize="11" fill="rgba(255, 255, 255, 0.5)">90'</text>
        {/* Progress line */}
        <line x1="40" y1="100" x2="360" y2="100" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
        {/* Running player */}
        <g className="stamina-player">
          <SoccerPlayer x="50" y="150" />
        </g>
        <text x="200" y="260" fontSize="12" fill="#fff" textAnchor="middle">💪 Maintain 90 Minutes</text>
      </svg>
    ),

    speedSprint: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes repeatSprint {
              0% { transform: translateX(0); }
              30% { transform: translateX(150px); opacity: 1; }
              31% { transform: translateX(0); opacity: 0.3; }
              35% { opacity: 0.3; }
              36% { opacity: 1; }
              66% { transform: translateX(150px); opacity: 1; }
              67% { transform: translateX(0); opacity: 0.3; }
              100% { transform: translateX(0); opacity: 0.3; }
            }
            .repeat-sprinter { animation: repeatSprint 2.5s infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Sprint markers */}
        <line x1="60" y1="130" x2="60" y2="170" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" />
        <line x1="210" y1="130" x2="210" y2="170" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" />
        {/* Start/Rest indicator */}
        <text x="30" y="220" fontSize="11" fill="rgba(255, 255, 255, 0.6)">SPRINT</text>
        <text x="30" y="260" fontSize="11" fill="rgba(255, 255, 255, 0.6)">REST</text>
        {/* Repeating sprinter */}
        <g className="repeat-sprinter">
          <SoccerPlayer x="50" y="150" rotation={-35} />
        </g>
        <text x="300" y="220" fontSize="20" textAnchor="middle">⚡⚡</text>
        <text x="200" y="260" fontSize="12" fill="#fff" textAnchor="middle">🔁 Multiple High-Intensity Efforts</text>
      </svg>
    ),

    strengthPresence: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes shielding {
              0% { transform: translateX(0); }
              50% { transform: translateX(30px); }
              100% { transform: translateX(0); }
            }
            .shield-player { animation: shielding 2s infinite; }
            @keyframes pressing {
              0% { transform: translateX(-20px); }
              50% { transform: translateX(10px); }
              100% { transform: translateX(-20px); }
            }
            .pressing-def { animation: pressing 2s infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Shielding player (attacker) */}
        <g className="shield-player">
          <SoccerPlayer x="120" y="150" scale={1.1} />
        </g>
        {/* Pressing defender */}
        <g className="pressing-def" opacity="0.8">
          <SoccerPlayer x="160" y="150" fill="#d32f2f" scale={0.95} />
        </g>
        {/* Ball */}
        <circle cx="110" cy="150" r="4" fill="#fff" stroke="#333" strokeWidth="0.5" />
        {/* Force arrows */}
        <text x="100" y="200" fontSize="16">←→</text>
        <text x="200" y="260" fontSize="12" fill="#fff" textAnchor="middle">💪 Body Strength & Position</text>
      </svg>
    ),

    strengthRetention: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes retentionMove {
              0% { transform: translateX(0) translateY(0); }
              50% { transform: translateX(-20px) translateY(-20px); }
              100% { transform: translateX(0) translateY(0); }
            }
            .retention-player { animation: retentionMove 2s infinite; }
            @keyframes defenderPressure {
              0% { transform: translateX(0) translateY(0); }
              50% { transform: translateX(20px) translateY(20px); }
              100% { transform: translateX(0) translateY(0); }
            }
            .defender-pressure { animation: defenderPressure 2s infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Player shielding ball */}
        <g className="retention-player">
          <SoccerPlayer x="140" y="150" />
        </g>
        {/* Defender trying to win ball */}
        <g className="defender-pressure" opacity="0.8">
          <SoccerPlayer x="100" y="150" fill="#d32f2f" scale={1.05} />
        </g>
        {/* Ball shielded by body */}
        <circle cx="160" cy="150" r="4" fill="#fff" stroke="#333" strokeWidth="0.5" />
        {/* Shield indicator */}
        <text x="130" y="140" fontSize="16" textAnchor="middle">🛡️</text>
        <text x="200" y="260" fontSize="12" fill="#fff" textAnchor="middle">🛡️ Possession Under Pressure</text>
      </svg>
    ),

    strengthBattle: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes battleJump {
              0% { transform: translateY(0); }
              50% { transform: translateY(-50px); }
              100% { transform: translateY(0); }
            }
            .jump-player { animation: battleJump 2s infinite; }
            @keyframes defenderJump {
              0% { transform: translateY(0); }
              40% { transform: translateY(-40px); }
              100% { transform: translateY(0); }
            }
            .defender-jump { animation: defenderJump 2s infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Contested aerial duel */}
        <g className="jump-player" opacity="0.8">
          <SoccerPlayer x="140" y="200" scale={1.1} />
        </g>
        {/* Defending player */}
        <g className="defender-jump" opacity="0.8">
          <SoccerPlayer x="180" y="200" fill="#d32f2f" scale={1} />
        </g>
        {/* Ball in air */}
        <circle cx="160" cy="80" r="5" fill="#fff" stroke="#333" strokeWidth="0.5" opacity="0.7" />
        {/* Collision indicator */}
        <text x="160" y="140" fontSize="24" textAnchor="middle">💥</text>
        <text x="200" y="260" fontSize="12" fill="#fff" textAnchor="middle">⛑️ Aerial Duel | Win Contests</text>
      </svg>
    ),

    strengthResist: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes resistance {
              0% { transform: translateX(0); }
              50% { transform: translateX(10px); }
              100% { transform: translateX(0); }
            }
            .resist-player { animation: resistance 2s infinite; }
            @keyframes challengePush {
              0% { transform: translateX(0); }
              50% { transform: translateX(-10px); }
              100% { transform: translateX(0); }
            }
            .challenger { animation: challengePush 2s infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Player resisting */}
        <g className="resist-player">
          <SoccerPlayer x="140" y="150" scale={1.15} />
        </g>
        {/* Opponent pushing */}
        <g className="challenger" opacity="0.8">
          <SoccerPlayer x="100" y="150" fill="#d32f2f" scale={1.05} />
        </g>
        {/* Forces */}
        <line x1="110" y1="160" x2="130" y2="160" stroke="rgba(255, 100, 100, 0.5)" strokeWidth="3" markerEnd="url(#arrowred)" />
        <line x1="170" y1="160" x2="150" y2="160" stroke="rgba(100, 200, 255, 0.5)" strokeWidth="3" markerEnd="url(#arrowblue)" />
        <text x="200" y="260" fontSize="12" fill="#fff" textAnchor="middle">📍 Resist Being Pushed</text>
      </svg>
    ),

    strengthPower: () => (
      <svg viewBox="0 0 400 300" className="drill-animation-svg">
        <defs>
          <style>{`
            @keyframes powerStrike {
              0% { transform: translateX(0) rotateZ(-30deg); }
              40% { transform: translateX(5px) rotateZ(0deg); }
              100% { transform: translateX(0) rotateZ(-30deg); }
            }
            .power-player { animation: powerStrike 2s infinite; }
            @keyframes powerBall {
              0% { cx: 100; cy: 150; }
              40% { cx: 110; cy: 150; }
              100% { cx: 340; cy: 100; }
            }
            .power-ball { animation: powerBall 2s ease-out infinite; }
          `}</style>
        </defs>
        <rect width="400" height="300" fill="#7cb342" />
        {/* Goal target */}
        <rect x="300" y="70" width="80" height="120" fill="none" stroke="#fff" strokeWidth="2" />
        {/* Power player */}
        <g className="power-player">
          <SoccerPlayer x="100" y="150" rotation={-30} scale={1.15} />
        </g>
        {/* Power ball */}
        <circle className="power-ball" cx="100" cy="150" r="4" fill="#fff" stroke="#333" strokeWidth="0.5" />
        {/* Power indicator */}
        <text x="200" y="100" fontSize="20">⚡⚡⚡</text>
        <text x="200" y="260" fontSize="12" fill="#fff" textAnchor="middle">💥 Maximum Power & Force</text>
      </svg>
    )
  };

  return (
    <div className="drill-animation-container">
      {animations[animationType] ? animations[animationType]() : (
        <svg viewBox="0 0 400 300" className="drill-animation-svg">
          <rect width="400" height="300" fill="#7cb342" />
          <text x="200" y="150" fontSize="20" fill="#fff" textAnchor="middle">
            Animation Loading...
          </text>
        </svg>
      )}
    </div>
  );
};

export default DrillAnimation;
