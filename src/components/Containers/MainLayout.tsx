import Box from '@mui/material/Box';
import React from 'react';

export const MainLayout = ({ toolbar, contents }: { toolbar: React.ReactNode; contents: React.ReactNode }) => {
  const screenHeight = window.innerHeight + 'px';
  const toolbarHeight = '56px';

  return (
    <Box
      sx={{
        maxWidth: '100vw',
        minWidth: '100vw',
        maxHeight: screenHeight,
        minHeight: screenHeight,
        paddingBottom: toolbarHeight,
        display: 'grid',
        grid: `
          "MainContents" 1fr
          / auto
        `,
      }}
    >
      <Box
        sx={{
          gridArea: 'MainContents',
          display: 'grid',
          grid: 'auto / auto',
          overflow: 'auto',
        }}
      >
        {contents}
      </Box>

      <Box
        sx={{
          overflow: 'hidden',
          position: 'fixed',
          bottom: 0,
          width: '100%',
          height: toolbarHeight,
        }}
      >
        {toolbar}
      </Box>
    </Box>
  );
};
