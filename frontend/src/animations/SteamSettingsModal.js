import React, { useRef, useEffect, useState } from 'react';
import { useSteam } from './SteamContext';
import DrawerLeft from '../ui/DrawerLeft';
import Slider from '../ui/Slider';
import MusicPlayer from '../ui/MusicPlayer';

const SteamSettingsModal = ({ setIsModalOpen, isModalOpen }) => {
  const { numberOfDots, setNumberOfDots, dotSpeed, setDotSpeed } = useSteam();
  const [volume] = useState(50); // Přidáme stav pro hlasitost

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume / 100; // Nastavení hlasitosti podle stavu
      audio.loop = true;
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, volume]); // Přidáme volume do seznamu závislostí

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    setIsPlaying(!isPlaying);
    if (audio) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  };

  return (
    <DrawerLeft isOpen={isModalOpen} toggleDrawer={toggleModal}>
      <div className={`steam-settings-modal ${isModalOpen ? 'show-steam-settings' : 'hide-steam-settings'}`}>
        <div className="steam-settings-content">
          <div className="steam-settings-fields-container">
            <div className="steam-settings-field">
              <label htmlFor="numberOfDots">Number</label>
              <Slider
                label=""
                value={numberOfDots}
                onChange={(e) => setNumberOfDots(Number(e.target.value))}
                min={1}
                max={500}
                step={1}
                sliderColorStart="#00FF00"
                sliderColorEnd="#FFFFFF"
              />
            </div>
            <div className="steam-settings-field">
              <label htmlFor="dotSpeed">Speed</label>
              <Slider
                label=""
                value={dotSpeed}
                onChange={(e) => setDotSpeed(Number(e.target.value))}
                min={0.1}
                max={3}
                step={0.1}
                sliderColorStart="#00FF00"
                sliderColorEnd="#FFFFFF"
              />
            </div>
            <div className="steam-settings-field">
              
            </div>
          </div>
          <MusicPlayer src="/music/steam.mp3" />
        </div>
        <div className="steam-audio-controls" onClick={togglePlay}>
        </div>
        <audio ref={audioRef} src="/music/steam.mp3" hidden></audio>
      </div>
    </DrawerLeft>
  );
};

export default SteamSettingsModal;