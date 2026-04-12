import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SkillSelector.css';

function SkillSelector({ onSkillSelect, onPreview }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await axios.get('/api/skills');
      setSkills(response.data);
    } catch (err) {
      setError('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="skill-selector-loading">Loading skills...</div>;

  return (
    <div className="skill-selector-container">
      <div className="skill-header">
        <h1>Select a Skill</h1>
        <p>Choose a skill to test and improve</p>
        {onPreview && (
          <button className="preview-btn" onClick={onPreview}>
            👁️ Preview Card
          </button>
        )}
      </div>

      {error && <div className="skill-error">{error}</div>}

      <div className="skills-grid">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="skill-card"
            onClick={() => onSkillSelect(skill)}
          >
            <div className="skill-icon">{skill.name.charAt(0)}</div>
            <h3>{skill.name}</h3>
            <p>{skill.description}</p>
            <div className="skill-drills">{skill.drillCount} Drills</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillSelector;
