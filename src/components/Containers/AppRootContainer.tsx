import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { RecoilRoot } from 'recoil';

export const AppRootContainer: React.FC = ({ children }) => {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <CssBaseline />
        {children}
      </RecoilRoot>
    </React.StrictMode>
  );
};
