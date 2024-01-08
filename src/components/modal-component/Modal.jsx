// Імпорт бібліотек
import React from 'react';
import {
  Backdrop,
  Modal as PhotoModal,
  Fade,
  Paper,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ imageUrl, onClose }) => {
  const handleCloseModal = () => {
    onClose();
  };

  return (
    <PhotoModal
      open={Boolean(imageUrl)}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={Boolean(imageUrl)}>
        <Paper
          style={{
            padding: 16,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseModal}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <img
            src={imageUrl}
            alt="Large"
            style={{ maxWidth: '100%', maxHeight: '80vh' }}
          />
        </Paper>
      </Fade>
    </PhotoModal>
  );
};
// Експорт
export default Modal;
