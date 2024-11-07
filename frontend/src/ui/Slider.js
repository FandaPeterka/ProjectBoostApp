import React, { useState, useEffect } from 'react';
import './Slider.css'; // Ensure this path is correct

const Slider = ({ label, value, onChange, min, max, step, sliderColorStart, sliderColorEnd }) => {
    // State to manage the background style
    const [backgroundStyle, setBackgroundStyle] = useState('');

    // Function to update the background style based on the current value
    useEffect(() => {
        const percentage = ((value - min) / (max - min)) * 100;
        const newBackgroundStyle = `linear-gradient(to right, ${sliderColorStart} 0%, ${sliderColorStart} ${percentage}%, ${sliderColorEnd} ${percentage}%, ${sliderColorEnd} 100%)`;
        setBackgroundStyle(newBackgroundStyle);
    }, [value, min, max, sliderColorStart, sliderColorEnd]);

    return (
        <div className="reusable-slider-container">
            {label && <label className="reusable-slider-label">{label}</label>}
            <input
                type="range"
                className="reusable-slider"
                value={value}
                onChange={onChange}
                min={min}
                max={max}
                step={step}
                // Pass slider colors as CSS variables
                style={{ background: backgroundStyle, '--slider-color-start': sliderColorStart, '--slider-color-end': sliderColorEnd }}
            />
        </div>
    );
};

export default Slider;