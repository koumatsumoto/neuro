import Box from '@mui/material/Box';
import React from 'react';

export const MainLayout = ({ toolbar, contents }: { toolbar: React.ReactNode; contents: React.ReactNode }) => {
  const windowHeight = window.innerHeight + 'px';

  return (
    <Box
      sx={{
        maxWidth: '100vw',
        minWidth: '100vw',
        maxHeight: windowHeight,
        minHeight: windowHeight,
        display: 'grid',
        grid: `
          "MainContents" 1fr
          "Footer" auto
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
          gridArea: 'Footer',
          overflow: 'hidden',
        }}
      >
        {toolbar}
      </Box>
    </Box>
  );
};
