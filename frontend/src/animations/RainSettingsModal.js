import React, { useRef, useEffect } from 'react';
import { useRain } from './RainContext';
import DrawerLeft from '../ui/DrawerLeft'; // Import komponenty DrawerLeft
import Slider from '../ui/Slider'; // Import komponenty Slider
import MusicPlayer from '../ui/MusicPlayer'; // Import komponenty MusicPlayer

const RainSettingsModal = () => {
  const {
    numberOfDrops, setNumberOfDrops,
    dropSpeed, setDropSpeed,
    soundVolume, 
    isModalOpen, setIsModalOpen
  } = useRain();

  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = soundVolume / 100;
      audio.loop = true;
    }
  }, [soundVolume]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <DrawerLeft isOpen={isModalOpen} toggleDrawer={toggleModal}>
      <div className={`settings-modal ${isModalOpen ? 'show-settings' : 'hide-settings'}`}>
        <div className="settings-content">
          <div className="settings-fields-container">
            <div className="rain-settings-field">
              <label htmlFor="numberOfDrops">Number</label>
              <Slider
                  label=""
                  value={numberOfDrops}
                  onChange={(e) => setNumberOfDrops(Number(e.target.value))}
                  min={1}
                  max={300}
                  step={1}
                  sliderColorStart="#00FF00"
                  sliderColorEnd="#FFFFFF"
                  />
            </div>
            <div className="rain-settings-field">
              <label htmlFor="dropSpeed">Speed</label>
              <Slider
                  label=""
                  value={dropSpeed}
                  onChange={(e) => setDropSpeed(Number(e.target.value))}
                  min={0.1}
                  max={4}
                  step={0.1}
                  sliderColorStart="#00FF00"
                  sliderColorEnd="#FFFFFF"
                  />
            </div>
            <div className="rain-settings-field">
              
            </div>
          </div>
          <MusicPlayer src="/music/rain.mp3" />
        </div>
      </div>
    </DrawerLeft>
  );
};

export default RainSettingsModal;

