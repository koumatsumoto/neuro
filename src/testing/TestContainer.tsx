import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { RecoilRoot } from 'recoil';

// TODO(refactor): replace with AppRootContainer
export const TestContainer: React.FC<{
  useSetup?: () => void;
}> = ({ children }) => {
  return (
    <RecoilRoot>
      <CssBaseline />
      <React.Suspense fallback={<div>loading...</div>}>{children}</React.Suspense>
    </RecoilRoot>
  );
};
