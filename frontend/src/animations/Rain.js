import React, { useEffect, useRef, useState, useMemo } from 'react';
import RainContext from './RainContext'; 
import RainSettingsModal from './RainSettingsModal'; 
import './Rain.css';

const Rain = () => {
  const [numberOfDrops, setNumberOfDrops] = useState(100);
  const [dropSpeed, setDropSpeed] = useState(1);
  const [backgroundGradient, setBackgroundGradient] = useState('to top, #0f0c29, #302b63, #24243e');
  const [soundVolume, setSoundVolume] = useState(50);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const boardRef = useRef(null);
  const updateRef = useRef(null); // Reference pro update timeout

  useEffect(() => {
    const board = boardRef.current;
    let frameId;

    const createRain = (width, numberOfDrops) => {
      board.innerHTML = '';
      for (let i = 0; i < numberOfDrops; i++) {
        let margin = Math.floor(Math.random() * width);
        let duration = (Math.random() * 4 + 1) / dropSpeed; 
        let delay = Math.random() * 5; 
        let raindrop = `<div class="raindrop" style="margin-left: ${margin}px; animation-delay: ${delay}s; animation-duration: ${duration}s;"></div>`;          
        board.insertAdjacentHTML('beforeend', raindrop);
      }
    };

    const updateRain = () => {
      cancelAnimationFrame(frameId);
      clearTimeout(updateRef.current);
      updateRef.current = setTimeout(() => {
        const width = window.innerWidth;
        createRain(width, numberOfDrops);
      }, 5000); // Zpoždění aktualizace deště
    };

    updateRain(); // Inicializujeme dešť při prvním spuštění
    window.addEventListener('resize', updateRain);

    return () => {
      window.removeEventListener('resize', updateRain);
      cancelAnimationFrame(frameId);
      clearTimeout(updateRef.current);
      board.innerHTML = '';
    };
  }, [numberOfDrops, dropSpeed]); // Závislosti na počtu kapek a rychlosti kapek

  const value = useMemo(() => ({
    numberOfDrops, setNumberOfDrops,
    dropSpeed, setDropSpeed,
    backgroundGradient, setBackgroundGradient,
    soundVolume, setSoundVolume,
    isModalOpen, setIsModalOpen
  }), [numberOfDrops, dropSpeed, backgroundGradient, soundVolume, isModalOpen]);

  return (
    <RainContext.Provider value={value}>
      <div ref={boardRef} className="night" style={{ background: `linear-gradient(${backgroundGradient})` }}></div>
      <RainSettingsModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
    </RainContext.Provider>
  );
};

export default Rain;