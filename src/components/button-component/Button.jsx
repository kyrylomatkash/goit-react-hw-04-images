// Імпорт бібліотек
import React from 'react';
import { Button } from '@mui/material';
// Основна функція компоненту
const LoadMoreButton = ({ onClick, disabled }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled}
      style={{ margin: '16px 0' }}
    >
      Load More
    </Button>
  );
};
// Експорт
export default LoadMoreButton;
