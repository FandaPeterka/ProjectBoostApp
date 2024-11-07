import React, { useRef, useState, useEffect } from 'react';
import { MdOutlineMusicNote, MdOutlineMusicOff } from "react-icons/md";
import Slider from './Slider';
import './MusicPlayer.css';

const MusicPlayer = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        const handleEnded = () => {
            setIsPlaying(false);
            audio.currentTime = 0;
        };
        audio.addEventListener('ended', handleEnded);
        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        const newPlayingState = !isPlaying; // Invertovaný stav přehrávání
        setIsPlaying(newPlayingState); // Nastavit nový stav přehrávání
        if (audio) {
            if (newPlayingState) {
                audio.play();
            } else {
                audio.pause();
            }
        }
    };

    const handleVolumeChange = (event) => {
        const newVolume = Number(event.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume / 100;
        }
    };

    return (
        <div className="music-player">
            <Slider
                label="Volume"
                value={volume}
                onChange={handleVolumeChange}
                min={0}
                max={100}
                step={1}
                sliderColorStart="#FFD700"
                sliderColorEnd="#FFFFFF"
            />
            <div className="audio-controls" onClick={togglePlay}>
                {isPlaying ? <MdOutlineMusicNote /> : <MdOutlineMusicOff />}
            </div>
            <audio ref={audioRef} src={src} hidden></audio>
        </div>
    );
};

export default MusicPlayer;