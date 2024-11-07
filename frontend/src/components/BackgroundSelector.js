import React from 'react';
import Button from '../ui/Button'; // Importing a reusable Button component
import "./BackgroundSelector.css" // CSS for styling the BackgroundSelector component

// BackgroundSelector component allows users to choose a background from a predefined list.
const BackgroundSelector = ({ onChangeBackground, onClose }) => {
    // Array of background options available for selection.
    const backgrounds = [
        'Fish', 'Leaves', 'Meteors', 'Rain', 'Snow', 'Steam'
    ];

    // Function to handle the selection of a background.
    const handleBackgroundChange = (name) => {
        onChangeBackground(name); // Trigger the change background action passed from parent component.
        onClose(); // Close the modal after changing the background to confirm the action.
    };

    // Render a list of buttons for each background option.
    return (
        <div className="background-selector">
            {backgrounds.map(name => (
                // Render a button for each background in the backgrounds array.
                <Button key={name} onClick={() => handleBackgroundChange(name)}>
                    {name}  {/* Display the name of the background on the button. */}
                </Button>
            ))}
        </div>
    );
};

export default BackgroundSelector;