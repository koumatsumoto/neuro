import Box from '@mui/material/Box';
import React from 'react';
import { MainLayout } from './Containers';
import { NoteContents } from './Note';
import { AppToolbar } from './Toolbar';

const MainContents = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        grid: 'auto 1fr',
        overflow: 'auto',
      }}
    >
      <Box
        sx={{
          padding: '16px 0 48px',
        }}
      >
        <img src="./logo.png" alt="logo" style={{ width: 120 }} />
      </Box>
      <NoteContents />
    </Box>
  );
};

export const App = () => {
  return <MainLayout toolbar={<AppToolbar />} contents={<MainContents />} />;
};
