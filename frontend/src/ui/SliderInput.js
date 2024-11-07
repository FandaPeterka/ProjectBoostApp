// Inside SliderInput.js

import React, { useState, useEffect } from 'react';
import './SliderInput.css'; // Ensure this path is correct

const SliderInput = ({ label, value, onChange, min, max, step, sliderColorStart, sliderColorEnd }) => {
    // State to manage the background style
    const [backgroundStyle, setBackgroundStyle] = useState('');

    // Function to update the background style based on the current value
    useEffect(() => {
        const percentage = ((value - min) / (max - min)) * 100;
        const newBackgroundStyle = `linear-gradient(to right, ${sliderColorStart} 0%, ${sliderColorStart} ${percentage}%, ${sliderColorEnd} ${percentage}%, ${sliderColorEnd} 100%)`;
        setBackgroundStyle(newBackgroundStyle);
    }, [value, min, max, sliderColorStart, sliderColorEnd]); // Depend on these props to recalculate when they change

    return (
        <div className="reusable-slider-input">
            <label>{label}</label>
            <input
                type="number"
                value={value}
                onChange={onChange}
                min={min}
                max={max}
                className="reusable-input"
                required
            />
            <input
                type="range"
                className="reusable-slider"
                style={{ background: backgroundStyle }}
                value={value}
                onChange={onChange}
                min={min}
                max={max}
                step={step}
            />
        </div>
    );
};

export default SliderInput;