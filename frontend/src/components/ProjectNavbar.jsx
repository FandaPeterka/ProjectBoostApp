import React, { useState } from 'react';
import Modal from '../ui/Modal';
import CreateProjectForm from '../components/CreateProjectForm';
import ProjectInventory from '../components/ProjectInventory';
import BackgroundSelector from './BackgroundSelector';
import RoundIconButton from '../ui/RoundIconButton';
import { FiPlus, FiFolder, FiSliders } from 'react-icons/fi';

// ProjectNavbar manages the navigation and actions related to project operations.
const ProjectNavbar = ({ onChangeBackground }) => {
  // State hooks to manage the visibility of various modals.
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isInventoryModalOpen, setInventoryModalOpen] = useState(false);
  const [isBackgroundSelectorOpen, setBackgroundSelectorOpen] = useState(false);

  // JSX rendering a vertical toolbar with buttons for creating projects, viewing project inventory, and changing the background.
  return (
    <div className="fixed right-5 top-20 z-10 flex flex-col items-center space-y-4">
      {/* Button to open the create project modal */}
      <RoundIconButton Icon={FiPlus} onClick={() => setCreateModalOpen(true)} tooltip="Create Project" />
      {/* Button to open the project inventory modal */}
      <RoundIconButton Icon={FiFolder} onClick={() => setInventoryModalOpen(true)} tooltip="View Projects" />
      {/* Button to toggle the background selector modal */}
      <RoundIconButton Icon={FiSliders} onClick={() => setBackgroundSelectorOpen(!isBackgroundSelectorOpen)} tooltip="Change Background" />
      
      {/* Modal for creating a new project. It closes by resetting the modal's state to false. */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)}>
        <CreateProjectForm onClose={() => setCreateModalOpen(false)} />
      </Modal>
      {/* Modal for viewing and selecting projects. It also closes by resetting the modal's state to false. */}
      <Modal isOpen={isInventoryModalOpen} onClose={() => setInventoryModalOpen(false)}>
        <ProjectInventory onClose={() => setInventoryModalOpen(false)} />
      </Modal>
      {/* Modal for changing the application background. Provides a handler to change the background and close the modal. */}
      <Modal isOpen={isBackgroundSelectorOpen} onClose={() => setBackgroundSelectorOpen(false)}>
        <BackgroundSelector onChangeBackground={onChangeBackground} onClose={() => setBackgroundSelectorOpen(false)} />
      </Modal>
    </div>
  );
};

export default ProjectNavbar;