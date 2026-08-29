import React, { useRef, useEffect, useState } from 'react';
import Canvas from './components/Canvas';
import StatsPanel from './components/StatsPanel';
import Controls from './components/Controls';
import './App.css';

function App() {
  const [mode, setMode] = useState('fixed'); // 'fixed' | 'adaptive'
  const [intensity, setIntensity] = useState('medium'); // 'low' | 'medium' | 'high'
  const [stats, setStats] = useState({
    avgWaitTime: 0,
    maxQueue: 0,
    carsPassedThrough: 0,
  });

  return (
    <div className="app">
      <h1 className="title">🚦 Traffic Light Simulator</h1>
      <div className="layout">
        <Canvas mode={mode} intensity={intensity} onStatsUpdate={setStats} />
        <div className="sidebar">
          <Controls mode={mode} setMode={setMode} intensity={intensity} setIntensity={setIntensity} />
          <StatsPanel stats={stats} mode={mode} />
        </div>
      </div>
    </div>
  );
}

export default App;