// Імпорт бібліотек
import React from 'react';
import { Paper, CircularProgress } from '@mui/material';

const Loader = () => {
  return (
    <Paper
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
      }}
    >
      <CircularProgress color="primary" size={50} />
    </Paper>
  );
};

export default Loader;
