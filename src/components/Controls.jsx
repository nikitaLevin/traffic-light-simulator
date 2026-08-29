import React from 'react';

const Controls = ({ mode, setMode, intensity, setIntensity }) => {
  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>🎮 Controls</h3>

      <div style={styles.group}>
        <label style={styles.label}>Mode</label>
        <div style={styles.btnGroup}>
          <button
            style={{ ...styles.btn, ...(mode === 'fixed' ? styles.btnActive : {}) }}
            onClick={() => setMode('fixed')}
          >
            Fixed
          </button>
          <button
            style={{ ...styles.btn, ...(mode === 'adaptive' ? styles.btnActiveGreen : {}) }}
            onClick={() => setMode('adaptive')}
          >
            Adaptive
          </button>
        </div>
      </div>

      <div style={styles.group}>
        <label style={styles.label}>Traffic Intensity</label>
        <div style={styles.btnGroup}>
          {['low', 'medium', 'high'].map(level => (
            <button
              key={level}
              style={{ ...styles.btn, ...(intensity === level ? styles.btnActive : {}) }}
              onClick={() => setIntensity(level)}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
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
  group: {
    marginBottom: '12px',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    color: '#a0a0a0',
    marginBottom: '8px',
  },
  btnGroup: {
    display: 'flex',
    gap: '8px',
  },
  btn: {
    flex: 1,
    padding: '6px',
    border: '1px solid #444',
    borderRadius: '6px',
    background: '#1a1a2e',
    color: '#a0a0a0',
    cursor: 'pointer',
    fontSize: '13px',
  },
  btnActive: {
    background: '#facc15',
    color: '#1a1a2e',
    border: '1px solid #facc15',
    fontWeight: '600',
  },
  btnActiveGreen: {
    background: '#4ade80',
    color: '#1a1a2e',
    border: '1px solid #4ade80',
    fontWeight: '600',
  },
};

export default Controls;