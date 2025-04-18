import React from 'react';
import './modalSpinner.scss';

interface ModalSpinnerProps {
  isOpen: boolean;
}

const ModalSpinner: React.FC<ModalSpinnerProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-spinner__overlay">
      <div className="modal-spinner__container">
        <div className="modal-spinner__loader" />
      </div>
    </div>
  );
};

export default ModalSpinner;
