import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { EditorToolbar } from './EditorToolbar';
import { SearchToolbar } from './SearchToolbar';

export const AppToolbar = () => {
  const isEditorActive = false; // TODO(feat): implement EditorToolbar control

  const toolbar = isEditorActive ? <EditorToolbar /> : <SearchToolbar />;

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>{toolbar}</Toolbar>
      </AppBar>
    </Box>
  );
};
