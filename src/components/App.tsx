import Box from '@mui/material/Box';
import React from 'react';
import { Header } from './Header';
import { NoteContainer } from './Note';

export const App = () => {
  return (
    <>
      <Header />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', gap: '24px' }}>
        <NoteContainer />
      </Box>
    </>
  );
};
