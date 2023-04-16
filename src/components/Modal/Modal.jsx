import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Overlay, ModalStyled } from './Modal.styled';

import React, { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalStyled>{children}</ModalStyled>
    </Overlay>,
    modalRoot
  );
};

export { Modal };

Modal.propTypes = {
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
};
