import React, { useEffect, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import 'tailwindcss/tailwind.css';
import "./Modal.css";

const Modal = ({ isOpen, onClose, children }) => {
    const modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside, true);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-2000 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={onClose}>
            <div className="relative w-full max-w-2xl rounded-lg shadow-xl bg-transparent" ref={modalRef} onClick={e => e.stopPropagation()} style={{ maxHeight: '70vh', zIndex: 2001, border: '2px solid silver' }}>
                <div className="modal-background p-4 rounded-lg overflow-auto" style={{ maxHeight: 'inherit' }}>
                    <div className="flex justify-end p-2">
                        <AiOutlineClose className="text-white cursor-pointer text-2xl" onClick={onClose} />
                    </div>
                    <div className="p-4 space-y-4 text-white">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;