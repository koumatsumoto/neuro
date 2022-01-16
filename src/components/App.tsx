import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { Header } from './Header';
import { NoteContainer } from './Note';

const AppContents = () => {
  return (
    <>
      <Header />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', gap: '24px' }}>
        <NoteContainer />
      </Box>
    </>
  );
};

export const App = () => {
  return (
    <RecoilRoot>
      <CssBaseline />
      <AppContents />
    </RecoilRoot>
  );
};
