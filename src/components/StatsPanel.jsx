import React from 'react';

const StatsPanel = ({ stats, mode }) => {
  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>📊 Statistics</h3>
      <div style={styles.row}>
        <span>Mode</span>
        <span style={{ color: mode === 'adaptive' ? '#4ade80' : '#facc15' }}>
          {mode === 'adaptive' ? 'Adaptive' : 'Fixed'}
        </span>
      </div>
      <div style={styles.row}>
        <span>Avg wait time</span>
        <span>{stats.avgWaitTime.toFixed(1)}s</span>
      </div>
      <div style={styles.row}>
        <span>Max queue</span>
        <span>{stats.maxQueue} cars</span>
      </div>
      <div style={styles.row}>
        <span>Cars passed</span>
        <span>{stats.carsPassedThrough}</span>
      </div>
    </div>
  );
};

const styles = {
  panel: {
    background: '#16213e',
    borderRadius: '12px',
    padding: '16px',
    border: '1px solid #333',
  },
  title: {
    marginBottom: '12px',
    fontSize: '16px',
    color: '#e0e0e0',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '6px 0',
    borderBottom: '1px solid #333',
    fontSize: '14px',
    color: '#a0a0a0',
  },
};

export default StatsPanel;