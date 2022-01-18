import Box from '@mui/material/Box';
import React from 'react';

export const MainContainer: React.FC = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '24px',
        gap: '24px',
        maxWidth: '100%',
        overflow: 'auto',
      }}
    >
      {children}
    </Box>
  );
};
