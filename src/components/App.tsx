import Box from '@mui/material/Box';
import React from 'react';
import { MainContainer } from './Containers';
import { Header } from './Header';
import { NoteContents } from './Note';

export const App = () => {
  return (
    <Box
      sx={{
        maxWidth: '100vw',
        minWidth: '100vw',
        maxHeight: '100vh',
        minHeight: '100vh',
        display: 'grid',
        grid: 'auto 1fr / auto',
      }}
    >
      <Header />
      <MainContainer>
        <NoteContents />
      </MainContainer>
    </Box>
  );
};
