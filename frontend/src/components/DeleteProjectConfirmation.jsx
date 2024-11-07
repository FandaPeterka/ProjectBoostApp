import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const DeleteProjectConfirmation = ({ isOpen, onClose, onDelete, projectName }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-4 space-y-4">
                <h2 className="text-lg font-bold text-white">Confirm Deletion</h2>
                <p className="text-white">Are you sure you want to delete the project "{projectName}"? This action cannot be undone.</p>
                <div className="flex justify-end space-x-2">
                    <Button onClick={onClose} className="bg-gray-500 hover:bg-gray-600">Cancel</Button>
                    <Button onClick={onDelete} className="bg-red-500 hover:bg-red-600">Delete</Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteProjectConfirmation;