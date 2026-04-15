import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import './ScoreTrendChart.css';

const ScoreTrendChart = ({ scoreHistory }) => {
  // Prepare data for overall improvement trend
  const overallTrendData = useMemo(() => {
    if (!scoreHistory || scoreHistory.length === 0) {
      return [];
    }

    // Group scores by date and calculate running average
    const byDate = {};
    scoreHistory.forEach(entry => {
      const date = new Date(entry.submittedAt).toLocaleDateString();
      if (!byDate[date]) {
        byDate[date] = [];
      }
      byDate[date].push(entry.score);
    });

    return Object.entries(byDate).map(([date, scores]) => ({
      date,
      average: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      count: scores.length
    }));
  }, [scoreHistory]);

  // Prepare data for individual skill trends
  const skillTrendData = useMemo(() => {
    if (!scoreHistory || scoreHistory.length === 0) {
      return {};
    }

    const bySkill = {};
    scoreHistory.forEach(entry => {
      if (!bySkill[entry.skillId]) {
        bySkill[entry.skillId] = [];
      }
      bySkill[entry.skillId].push({
        date: new Date(entry.submittedAt).toLocaleDateString(),
        score: entry.score,
        fullDate: new Date(entry.submittedAt)
      });
    });

    // Sort by date
    Object.keys(bySkill).forEach(skill => {
      bySkill[skill].sort((a, b) => a.fullDate - b.fullDate);
    });

    return bySkill;
  }, [scoreHistory]);

  // Calculate skill averages
  const skillAverages = useMemo(() => {
    if (!scoreHistory || scoreHistory.length === 0) {
      return [];
    }

    const totals = {};
    scoreHistory.forEach(entry => {
      if (!totals[entry.skillId]) {
        totals[entry.skillId] = { sum: 0, count: 0 };
      }
      totals[entry.skillId].sum += entry.score;
      totals[entry.skillId].count++;
    });

    return Object.entries(totals).map(([skill, data]) => ({
      skill: skill.charAt(0).toUpperCase() + skill.slice(1),
      average: Math.round(data.sum / data.count),
      count: data.count
    }));
  }, [scoreHistory]);

  if (!scoreHistory || scoreHistory.length === 0) {
    return (
      <div className="score-trend-chart">
        <p className="no-data">No score history yet. Start testing to see your progress!</p>
      </div>
    );
  }

  return (
    <div className="score-trend-chart">
      {/* Overall Improvement Chart */}
      <div className="chart-container">
        <h3>📈 Overall Score Improvement</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={overallTrendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 215, 0, 0.1)" />
            <XAxis 
              dataKey="date" 
              stroke="#ccc"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="#ccc"
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#2d2d2d',
                border: '1px solid rgba(255, 215, 0, 0.3)',
                borderRadius: '8px'
              }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="average" 
              stroke="rgba(255, 215, 0, 0.8)" 
              dot={{ fill: 'rgba(255, 215, 0, 0.8)', r: 4 }}
              activeDot={{ r: 6 }}
              strokeWidth={2}
              name="Daily Average"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Skill Performance Comparison */}
      <div className="chart-container">
        <h3>⚽ Average Score by Skill</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={skillAverages} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 215, 0, 0.1)" />
            <XAxis 
              dataKey="skill" 
              stroke="#ccc"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="#ccc"
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#2d2d2d',
                border: '1px solid rgba(255, 215, 0, 0.3)',
                borderRadius: '8px'
              }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend />
            <Bar 
              dataKey="average" 
              fill="rgba(255, 215, 0, 0.7)" 
              name="Average Score"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Individual Skill Trends */}
      <div className="skills-trends-container">
        <h3>📊 Individual Skill Trends</h3>
        <div className="skills-trends-grid">
          {Object.entries(skillTrendData).map(([skill, data]) => (
            <div key={skill} className="skill-trend-card">
              <h4>{skill.charAt(0).toUpperCase() + skill.slice(1)}</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 215, 0, 0.1)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#ccc"
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis 
                    stroke="#ccc"
                    domain={[0, 100]}
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#2d2d2d',
                      border: '1px solid rgba(255, 215, 0, 0.3)',
                      borderRadius: '6px'
                    }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="rgba(100, 200, 255, 0.8)" 
                    dot={{ fill: 'rgba(100, 200, 255, 0.8)', r: 3 }}
                    strokeWidth={2}
                    name="Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScoreTrendChart;
