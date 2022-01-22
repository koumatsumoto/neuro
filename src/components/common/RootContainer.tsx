import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { theme } from './index';

export const RootContainer: React.FC = ({ children }) => {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <React.Suspense fallback={<div>Loading...</div>}>
          <CssBaseline />
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </React.Suspense>
      </RecoilRoot>
    </React.StrictMode>
  );
};
