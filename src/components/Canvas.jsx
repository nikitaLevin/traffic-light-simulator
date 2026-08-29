import React, { useRef, useEffect, useCallback } from 'react';
import { Intersection } from '../simulation/Intersection';

const CANVAS_SIZE = 600;

const Canvas = ({ mode, intensity, onStatsUpdate }) => {
  const canvasRef = useRef(null);
  const intersectionRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(null);

  const animate = useCallback((timestamp) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const delta = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const intersection = intersectionRef.current;

    intersection.update(delta, mode, intensity);
    intersection.draw(ctx);
    onStatsUpdate(intersection.getStats());

    animationRef.current = requestAnimationFrame(animate);
  }, [mode, intensity, onStatsUpdate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    intersectionRef.current = new Intersection(CANVAS_SIZE);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      style={{ borderRadius: '12px', border: '2px solid #333' }}
    />
  );
};

export default Canvas;