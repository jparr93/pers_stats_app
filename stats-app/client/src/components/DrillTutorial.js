import React, { useState } from 'react';
import DrillAnimation from './DrillAnimation';
import { getDrillBySkillAndType } from '../data/drillData';
import './DrillTutorial.css';

const DrillTutorial = ({ skillId, drillIndex, drill, onClose }) => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [expandedSection, setExpandedSection] = useState('technique');

  if (!drill) {
    return null;
  }

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="drill-tutorial-overlay">
      <div className="tutorial-modal">
        <div className="tutorial-header">
          <h2>{drill.name}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {showAnimation && (
          <div className="animation-section">
            <DrillAnimation animationType={drill.animationType} />
          </div>
        )}

        <div className="tutorial-content">
          {/* Main Description */}
          <div className="description-section">
            <p className="drill-main-description">{drill.description}</p>
          </div>

          {/* Technique Section */}
          <div className="collapsible-section">
            <button 
              className={`section-header ${expandedSection === 'technique' ? 'active' : ''}`}
              onClick={() => toggleSection('technique')}
            >
              <span className="section-icon">📋</span>
              <span className="section-title">How to Execute</span>
              <span className="expand-icon">{expandedSection === 'technique' ? '−' : '+'}</span>
            </button>
            {expandedSection === 'technique' && (
              <div className="section-content">
                <p>{drill.technique}</p>
              </div>
            )}
          </div>

          {/* Tips Section */}
          <div className="collapsible-section">
            <button 
              className={`section-header ${expandedSection === 'tips' ? 'active' : ''}`}
              onClick={() => toggleSection('tips')}
            >
              <span className="section-icon">💡</span>
              <span className="section-title">Pro Tips</span>
              <span className="expand-icon">{expandedSection === 'tips' ? '−' : '+'}</span>
            </button>
            {expandedSection === 'tips' && (
              <div className="section-content">
                <ul className="tips-list">
                  {drill.tips.map((tip, idx) => (
                    <li key={idx}>
                      <span className="tip-number">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Toggle Animation Button */}
          <div className="tutorial-footer">
            <button 
              className="toggle-animation-btn"
              onClick={() => setShowAnimation(!showAnimation)}
            >
              {showAnimation ? '👁️ Hide Animation' : '👁️ Show Animation'}
            </button>
            <button className="start-drill-btn" onClick={onClose}>
              Ready to Start →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrillTutorial;
