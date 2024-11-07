import React from 'react';
import './TextInput.css'; // Ujistěte se, že cesta k CSS souboru je správná

const TextInput = ({ label, type = "text", value, onChange, className }) => {
    return (
        <div className={`text-input-group ${className || ''}`}>
            <label>{label}</label>
            <input
                type={type}  // Použije se zadaný typ, nebo výchozí hodnota "text"
                value={value}
                onChange={onChange}
                className="text-input"
                required
            />
        </div>
    );
};

export default TextInput;