import React, { useEffect, useRef, useState, useCallback } from 'react';
import './Steam.css';
import SteamContext from './SteamContext';
import SteamSettingsModal from './SteamSettingsModal';

const Steam = () => {
  const [numberOfDots, setNumberOfDots] = useState(200);
  const [dotSpeed, setDotSpeed] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [restartFlag, setRestartFlag] = useState(false); // Nová stavová proměnná pro restartování animace
  const canvasRef = useRef(null);
  const requestRef = useRef();

  const pushDots = useCallback((dots, w, h) => {
    if (dots.length > numberOfDots) return dots; // Upraveno, aby se funkce nehodila na změny
    const rad = Math.random() * (4 - 1) + 1;
    const zix = Math.floor(Math.random() * 7 + 1);
    const newDot = {
      x: Math.random() * w,
      y: h + 30,
      v: (4 - rad / 1.2) * dotSpeed,
      r: (rad + zix) * 0.5,
      h: Math.random() * 20,
      z: zix,
    };
    return [...dots, newDot]; // Vrací nový seznam bodů
  }, [numberOfDots, dotSpeed]); // Závislosti useCallback

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let dots = [];
    let resizeTimeout;

    const resizeHandler = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      }, 5000); 
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      dots = dots.filter(dot => {
        ctx.fillStyle = `hsl(${330 + dot.h}, 60%, ${80 - dot.z * (60 / 7)}%)`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fill();
        dot.y -= dot.v;

        return dot.y >= -30; // Filtruje pouze body, které jsou stále viditelné
      });

      if (dots.length < numberOfDots) {
        dots = pushDots(dots, w, h); // Používá pushDots pro přidání nových bodů
      }
    };

    const dotInterval = setInterval(() => { dots = pushDots(dots, w, h); }, 25 / dotSpeed);
    const render = () => {
      draw();
      requestRef.current = requestAnimationFrame(render);
    };
    render();

    window.addEventListener('resize', resizeHandler);

    return () => {
      clearInterval(dotInterval);
      cancelAnimationFrame(requestRef.current);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', resizeHandler);
    };
  }, [dotSpeed, numberOfDots, pushDots, restartFlag]); // Přidali jsme 'restartFlag' do seznamu závislostí

  const restartAnimation = useCallback(() => {
    setRestartFlag(prev => !prev); // Funkce pro restartování animace
  }, []);

  return (
    <SteamContext.Provider value={{ numberOfDots, setNumberOfDots, dotSpeed, setDotSpeed, restartAnimation }}>
      <canvas ref={canvasRef} id="canvas"></canvas>
      <SteamSettingsModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
    </SteamContext.Provider>
  );
};

export default Steam;