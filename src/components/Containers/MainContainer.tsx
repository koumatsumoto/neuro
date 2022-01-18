import Box from '@mui/material/Box';
import React from 'react';

export const MainContainer: React.FC = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        grid: 'auto / auto',
        overflow: 'auto',
      }}
    >
      {children}
    </Box>
  );
};
