import React, { useState, useEffect, useRef } from 'react';
import { useProjectsContext } from "../hooks/useProjectsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import TaskInput from '../ui/TaskInput';
import TaskTimer from './TaskTimer';
import Modal from '../ui/Modal';
import Loading from './Loading'; // Import the Loading component
import { MdClose, MdDone, MdTimer, MdRestore } from 'react-icons/md';
import "./TaskDetails.css";

const TaskDetails = ({ task, projectId, tasksTimer }) => {
    const { dispatch } = useProjectsContext();
    const { user } = useAuthContext();
    const textRef = useRef(task.text || '');
    const [text, setText] = useState(task.text || '');
    const [completed, setCompleted] = useState(task.state === 'completed');
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // State for the Loading component

    useEffect(() => {
        textRef.current = task.text;
        setText(task.text);
        setCompleted(task.state === 'completed');
    }, [task]);

    const handleTimerClick = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const updateTaskText = async (newText, taskId) => {
        if (!user) return;
        setIsLoading(true); // Start loading
        const response = await fetch(`/api/projects/tasks/${taskId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({ text: newText })
        });
        setIsLoading(false); // End loading
        if (response.ok) {
            await response.json();
            dispatch({ type: "UPDATE_TASK_TEXT", payload: { text: newText, taskId, projectId } });
        }
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
        textRef.current = e.target.value;
    };

    const handleBlur = () => {
        if (textRef.current !== task.text) {
            updateTaskText(textRef.current, task._id);
        }
    };

    const handleDeleteTask = async () => {
        if (!user) return;
        setIsLoading(true); // Start loading
        const response = await fetch(`/api/projects/tasks/${task._id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        });
        setIsLoading(false); // End loading
        if (response.ok) {
            dispatch({ type: "REMOVE_TASK", payload: { taskId: task._id, projectId } });
        }
    };

    const markTaskAsCompleted = async () => {
        if (!user) return;
        setIsLoading(true); // Start loading
        const response = await fetch(`/api/projects/tasks/${task._id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({ state: 'completed' })
        });
        setIsLoading(false); // End loading
        if (response.ok) {
            dispatch({ type: "UPDATE_TASK_STATE", payload: { updates: { state: 'completed' }, taskId: task._id, projectId } });
            setCompleted(true);
        }
    };

    const restoreTask = async () => {
        if (!user) return;
        setIsLoading(true); // Start loading
        const response = await fetch(`/api/projects/tasks/${task._id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({ state: 'not completed' })
        });
        setIsLoading(false); // End loading
        setModalOpen(false);
        if (response.ok) {
            await response.json();
            dispatch({ type: "UPDATE_TASK_STATE", payload: { updates: { state: 'not completed' }, taskId: task._id, projectId } });
            setCompleted(false);
        }
    };

    const taskStyle = completed ? { backgroundColor: '#28a745' } : {};

    return (
        <div className="task" style={taskStyle}>
            <div>
                {completed ? (
                    <>
                        <MdDone className="complete-task-button" />
                        <button onClick={() => restoreTask(task._id)} className="restore-task-button">
                            <MdRestore className="icon" />
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={handleTimerClick} className="timer-button complete-task-button">
                            <MdTimer className="icon" />
                        </button>
                        <Modal isOpen={isModalOpen} onClose={closeModal}>
                            <TaskTimer task={task} projectId={projectId} tasksTimer={tasksTimer} onComplete={() => markTaskAsCompleted(task._id)} />
                        </Modal>
                    </>
                )}
            </div>
            <TaskInput
                value={text}
                onChange={handleTextChange}
                onBlur={handleBlur}
                placeholder="Enter task description"
            />
            <button onClick={() => handleDeleteTask(task._id)} className="delete-task-button">
                <MdClose className="icon" />
            </button>
            <Loading isOpen={isLoading} onClose={() => setIsLoading(false)} />
        </div>
    );
};

export default TaskDetails;