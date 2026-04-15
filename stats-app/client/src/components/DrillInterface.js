import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import DrillTutorial from './DrillTutorial';
import { getDrillBySkillAndType } from '../data/drillData';
import './DrillInterface.css';

function DrillInterface({ skill, onComplete, onBack }) {
  const [drills, setDrills] = useState([]);
  const [scores, setScores] = useState({});
  const [currentDrill, setCurrentDrill] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);

  const fetchDrills = useCallback(async () => {
    try {
      // Use tutorial drill data instead of API
      const tutorialDrills = getDrillBySkillAndType(skill.id, currentDrill);
      const allDrills = [];
      
      // Load all 5 drills for this skill from tutorial data
      let i = 0;
      while (true) {
        const drill = getDrillBySkillAndType(skill.id, i);
        if (!drill) break;
        allDrills.push({
          id: drill.id,
          name: drill.name,
          description: drill.description,
          technique: drill.technique,
          tips: drill.tips,
          animationType: drill.animationType
        });
        i++;
      }
      
      setDrills(allDrills);
      const initialScores = {};
      allDrills.forEach(drill => {
        initialScores[drill.id] = 50;
      });
      setScores(initialScores);
    } catch (err) {
      console.error('Failed to load drills');
    } finally {
      setLoading(false);
    }
  }, [skill.id, currentDrill]);

  useEffect(() => {
    fetchDrills();
  }, [fetchDrills]);

  const handleScoreChange = (drillId, value) => {
    setScores({
      ...scores,
      [drillId]: parseInt(value)
    });
  };

  const handleNext = () => {
    if (currentDrill < drills.length - 1) {
      setCurrentDrill(currentDrill + 1);
    }
  };

  const handlePrev = () => {
    if (currentDrill > 0) {
      setCurrentDrill(currentDrill - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const userId = localStorage.getItem('userId');
      const drillScores = drills.map(drill => scores[drill.id]);

      await axios.post('/api/scores/submit', {
        userId,
        skillId: skill.id,
        drillScores
      });

      onComplete(skill.id);
    } catch (err) {
      console.error('Failed to submit scores');
    } finally {
      setSubmitting(false);
    }
  };

  const drill = drills[currentDrill];
  const progress = ((currentDrill + 1) / drills.length) * 100;

  const handleTutorialClose = () => {
    setShowTutorial(false);
  };

  const handleViewTutorial = () => {
    setShowTutorial(true);
  };

  return (
    <>
      {showTutorial && drill && (
        <DrillTutorial 
          skillId={skill.id}
          drillIndex={currentDrill}
          drill={drill}
          onClose={handleTutorialClose}
        />
      )}
      
      <div className="drill-interface">
        <div className="drill-header">
          <button className="back-btn" onClick={onBack}>← Back</button>
          <h1>{skill.name}</h1>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="progress-text">Drill {currentDrill + 1} of {drills.length}</p>
          <button className="tutorial-btn" onClick={handleViewTutorial} title="View tutorial">
            📚 Tutorial
          </button>
        </div>

        <div className="drill-container">
          <div className="score-section">
            <h2>{drill.name}</h2>
            <p className="drill-description">{drill.description}</p>

            <div className="technique-box">
              <h3>How to Execute:</h3>
              <p>{drill.technique}</p>
              <h3>Pro Tips:</h3>
              <ul>
                {drill.tips && drill.tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>

            <div className="score-input-container">
              <label htmlFor="score">Your Score (0-100)</label>
              <div className="score-input-group">
              <input
                type="range"
                id="score"
                min="0"
                max="100"
                value={scores[drill.id]}
                onChange={(e) => handleScoreChange(drill.id, e.target.value)}
                className="score-slider"
              />
              <div className="score-display">{scores[drill.id]}</div>
            </div>
            <div className="score-labels">
              <span>Poor</span>
              <span>Good</span>
              <span>Excellent</span>
            </div>
          </div>
        </div>
      </div>

      <div className="drill-controls">
        <button
          className="nav-btn"
          onClick={handlePrev}
          disabled={currentDrill === 0}
        >
          ← Previous
        </button>

        {currentDrill === drills.length - 1 ? (
          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Scores'}
          </button>
        ) : (
          <button className="nav-btn next" onClick={handleNext}>
            Next →
          </button>
        )}
      </div>
    </div>
    </>
  );
}

export default DrillInterface;
