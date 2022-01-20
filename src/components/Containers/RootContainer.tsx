import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { theme } from '../common';

export const RootContainer: React.FC = ({ children }) => {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <CssBaseline />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </RecoilRoot>
    </React.StrictMode>
  );
};
