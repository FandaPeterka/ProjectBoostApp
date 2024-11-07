import React, { useRef, useEffect, useState } from 'react';
import { useMeteors } from './MeteorsContext';
import DrawerLeft from '../ui/DrawerLeft';
import Slider from '../ui/Slider';
import MusicPlayer from '../ui/MusicPlayer';

const MeteorsSettingsModal = ({ setIsModalOpen, isModalOpen }) => {
  const {
    meteorCount, setMeteorCount,
    meteorSpeedFactor, setMeteorSpeedFactor,
    soundVolume
  } = useMeteors();

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
      <div className={`meteors-settings-modal ${isModalOpen ? 'show-meteors-settings' : 'hide-meteors-settings'}`}>
        <div className="meteors-settings-content">
          <div className="meteors-settings-field">
            <label htmlFor="meteorCount">Number</label>
            <Slider
              label=""
              value={meteorCount}
              onChange={(e) => setMeteorCount(Number(e.target.value))}
              min={1}
              max={12}
              step={1}
              sliderColorStart="#00FF00"
              sliderColorEnd="#FFFFFF"
            />
          </div>
          <div className="meteors-settings-field">
            <label htmlFor="meteorSpeedFactor">Speed</label>
            <Slider
              label=""
              value={meteorSpeedFactor}
              onChange={(e) => setMeteorSpeedFactor(Number(e.target.value))}
              min={0.1}
              max={1.7}
              step={0.1}
              sliderColorStart="#00FF00"
              sliderColorEnd="#FFFFFF"
            />
          </div>
          <div className="meteors-settings-field">
            
          </div>
          <div className="meteors-audio-controls" onClick={togglePlay}>
          </div>
          <MusicPlayer src="/music/meteors.mp3" />
        </div>
        <audio ref={audioRef} src="/music/meteors.mp3" hidden></audio>
      </div>
    </DrawerLeft>
  );
};

export default MeteorsSettingsModal;