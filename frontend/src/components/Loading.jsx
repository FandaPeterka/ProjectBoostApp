import React from 'react';
import { AiOutlineClose, AiOutlineLoading3Quarters } from 'react-icons/ai';

// Loading component to display a loading indicator with an overlay.
const Loading = ({ isOpen, onClose }) => {
    // If the isOpen prop is false, the component renders nothing.
    if (!isOpen) return null;

    // Render a modal-style component that covers the entire viewport.
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            {/* Prevents event propagation to ensure that clicking the modal does not trigger the onClick of the outer div. */}
            <div className="relative w-full max-w-2xl rounded-lg shadow-xl bg-transparent" onClick={e => e.stopPropagation()}>
                {/* Modal background styling with partial opacity to focus attention on the loading content. */}
                <div className="modal-background p-4 rounded-lg overflow-auto bg-gray-900 bg-opacity-75" style={{ maxHeight: '70vh' }}>
                    {/* Close icon positioned in the top-right corner of the modal. */}
                    <div className="flex justify-end p-2">
                        <AiOutlineClose className="text-white cursor-pointer text-2xl" onClick={onClose} />
                    </div>
                    {/* Main content area for the loading indicator. */}
                    <div className="flex flex-col items-center justify-center p-4 space-y-4 text-white">
                        {/* Spinning icon indicating loading process. */}
                        <AiOutlineLoading3Quarters className="animate-spin text-4xl" />
                        {/* Text message informing the user that data is loading. */}
                        <p>Data is loading...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;