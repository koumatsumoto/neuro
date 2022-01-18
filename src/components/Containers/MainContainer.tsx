import Box from '@mui/material/Box';
import React from 'react';

export const MainContainer: React.FC = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        gap: '24px',
      }}
    >
      {children}
    </Box>
  );
};
