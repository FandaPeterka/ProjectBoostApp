import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useProjectsContext } from '../hooks/useProjectsContext';
import SliderInput from '../ui/SliderInput';
import { MdPlayArrow, MdPause, MdStop, MdDone } from 'react-icons/md';
import { AuthContext } from '../context/AuthContext';

// TaskTimer component is used to manage and track time for tasks.
const TaskTimer = ({ task, projectId, tasksTimer, onComplete }) => {
    const [secondsLeft, setSecondsLeft] = useState(tasksTimer * 60);  // State for tracking the remaining time in seconds.
    const [customTimer, setCustomTimer] = useState(tasksTimer);  // State for storing user-defined time settings.
    const [isActive, setIsActive] = useState(false);  // State to track if the timer is active.
    const { dispatch } = useProjectsContext();  // Dispatch from ProjectsContext for state updates.
    const { user } = useContext(AuthContext);  // Current user context for authorization checks.

    // Reset secondsLeft whenever the timer setting or active status changes.
    useEffect(() => {
        if (!isActive) {
            setSecondsLeft(customTimer * 60);
        }
    }, [customTimer, isActive]);

    // Function to handle automatic task completion once the timer ends.
    const completeTaskAutomatically = useCallback(async () => {
        setSecondsLeft(0);
        if (user) {
            const apiUrl = `/api/projects/${projectId}/tasks/${task._id}/complete`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
            });
            if (response.ok) {
                dispatch({ type: 'UPDATE_TASK_STATE', payload: { updates: { state: 'completed' }, taskId: task._id, projectId } });
                onComplete && onComplete();  // Call onComplete if it's provided and the task is successfully completed.
            } else {
                // If the fetch call fails, handle it gracefully without altering the UI.
            }
        }
    }, [user, task._id, projectId, dispatch, onComplete]);

    // Handle countdown timer logic.
    useEffect(() => {
        let interval = null;
        if (isActive && secondsLeft > 0) {
            interval = setInterval(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);
        } else if (!isActive || secondsLeft <= 0) {
            clearInterval(interval);
            if (secondsLeft <= 0 && isActive) {
                completeTaskAutomatically();
                setIsActive(false);
            }
        }
        return () => clearInterval(interval);  // Cleanup the interval on component unmount.
    }, [isActive, secondsLeft, completeTaskAutomatically]);

    // Start the timer.
    const startTimer = () => {
        setIsActive(true);
    };

    // Pause the timer.
    const pauseTimer = () => setIsActive(false);

    // Reset the timer to the initial custom timer value.
    const resetTimer = () => {
        setIsActive(false);
        setSecondsLeft(customTimer * 60);
    };

    // Function to dynamically change the progress bar color based on time left.
    const getBarColor = () => {
        const percentage = (secondsLeft / (customTimer * 60)) * 100;
        if (percentage < 10) return 'bg-red-500';
        if (percentage < 30) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <div className="">
            <div className="text-center font-bold text-xl mb-2 pb-[20px]">Task: {task.text || 'Task Timer'}</div>
            {isActive && (  // Render the timer and progress bar when the timer is active.
                <>
                    <div className="text-3xl font-semibold mb-4">
                        {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden mt-4">
                        <div className={`${getBarColor()} h-6 rounded-full transition-width duration-500`} style={{ width: `${(secondsLeft / (customTimer * 60)) * 100}%` }}></div>
                    </div>
                </>
            )}
            {!isActive && (
                <SliderInput
                    label="Adjust Timer (minutes):"
                    value={customTimer}
                    onChange={(e) => setCustomTimer(Number(e.target.value))}
                    min={1}
                    max={120}
                    step={1}
                    sliderColorStart="#785db1"
                    sliderColorEnd="#b67b82"
                />
            )}
            <div className="flex justify-around items-center mt-4">
                {!isActive && <button onClick={startTimer} className="text-blue-500 text-3xl"><MdPlayArrow /></button>}
                {isActive && <button onClick={pauseTimer} className="text-yellow-500 text-3xl"><MdPause /></button>}
                <button onClick={resetTimer} className="text-gray-500 text-3xl"><MdStop /></button>
                <button onClick={completeTaskAutomatically} className="text-green-500 text-3xl"><MdDone /></button>
            </div>
        </div>
    );
};

export default TaskTimer;