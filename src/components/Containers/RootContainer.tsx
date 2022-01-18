import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { RecoilRoot } from 'recoil';

export const RootContainer: React.FC = ({ children }) => {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <CssBaseline />
        {children}
      </RecoilRoot>
    </React.StrictMode>
  );
};
