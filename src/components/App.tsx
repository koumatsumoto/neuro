import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { NeuroEditor } from './Editor';
import { Header } from './Header';

const AppContents = () => {
  return (
    <>
      <Header />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', gap: '24px' }}>
        <Paper elevation={3} sx={{ minWidth: '600px', padding: '24px' }}>
          <NeuroEditor />
        </Paper>
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
