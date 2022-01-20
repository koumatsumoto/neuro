import Box from '@mui/material/Box';
import React from 'react';

export const Header = () => {
  return (
    <Box
      sx={{
        padding: '16px 0',
        background: '#f3f4f5', // TODO(feat): update color by using sx theming
      }}
    >
      <img src="./logo.png" alt="logo" style={{ width: 112 }} />
    </Box>
  );
};
