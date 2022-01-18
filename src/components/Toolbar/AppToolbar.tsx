import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useUiState } from '../../common';
import { EditorToolbar } from './EditorToolbar';
import { SearchToolbar } from './SearchToolbar';

export const AppToolbar = () => {
  const uiState = useUiState();

  const toolbar = uiState === 'editing-note' ? <EditorToolbar /> : <SearchToolbar />;

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>{toolbar}</Toolbar>
      </AppBar>
    </Box>
  );
};
