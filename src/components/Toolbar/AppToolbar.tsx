import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useUiState } from '../../common';
import { SearchToolbar } from './SearchToolbar';

export const AppToolbar = () => {
  const uiState = useUiState();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>{uiState === 'editing-note' ? <></> : <SearchToolbar />}</Toolbar>
      </AppBar>
    </Box>
  );
};
