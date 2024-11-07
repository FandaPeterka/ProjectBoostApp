import React, { useEffect, useRef } from 'react';
import './TaskInput.css'; // Make sure the path to CSS file is correct

const TaskInput = ({ value, onChange, onBlur }) => {
    const textAreaRef = useRef(null);

    useEffect(() => {
        const adjustHeight = () => {
            if (textAreaRef.current) {
                textAreaRef.current.style.height = 'auto'; // Reset the height
                textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Set height based on content
            }
        };

        adjustHeight();
    }, [value]); // Run the effect again if the value changes

    return (
        <textarea
            ref={textAreaRef}
            className="task-input"
            value={value}
            onChange={onChange}
            onBlur={onBlur} // Handling onBlur event
            placeholder="Type your task..."
            maxLength={200} // Limit the number of characters to 200
            style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', sans-serif" }} // Set a playful font style
        />
    );
};

export default TaskInput;