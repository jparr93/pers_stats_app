import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './DrillInterface.css';

function DrillInterface({ skill, onComplete, onBack }) {
  const [drills, setDrills] = useState([]);
  const [scores, setScores] = useState({});
  const [currentDrill, setCurrentDrill] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchDrills = useCallback(async () => {
    try {
      const response = await axios.get(`/api/skills/${skill.id}`);
      setDrills(response.data.drills);
      const initialScores = {};
      response.data.drills.forEach(drill => {
        initialScores[drill.id] = 50;
      });
      setScores(initialScores);
    } catch (err) {
      console.error('Failed to load drills');
    } finally {
      setLoading(false);
    }
  }, [skill.id]);

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

  if (loading) return <div className="drill-loading">Loading drills...</div>;

  const drill = drills[currentDrill];
  const progress = ((currentDrill + 1) / drills.length) * 100;

  return (
    <div className="drill-interface">
      <div className="drill-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h1>{skill.name}</h1>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="progress-text">Drill {currentDrill + 1} of {drills.length}</p>
      </div>

      <div className="drill-container">
        <div className="video-placeholder">
          <div className="video-frame">
            <div className="video-icon">▶</div>
            <p>Video: {drill.name}</p>
            <small>{drill.description}</small>
          </div>
        </div>

        <div className="score-section">
          <h2>{drill.name}</h2>
          <p className="drill-description">{drill.description}</p>

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
  );
}

export default DrillInterface;
