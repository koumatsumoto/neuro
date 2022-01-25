import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useAppUseCases } from '../../hooks';
import { useQuery } from '../../utils';
import { EditorToolbar } from './EditorToolbar';
import { SearchToolbar } from './SearchToolbar';

export const AppToolbar = () => {
  const usecases = useAppUseCases();
  const isEditorActive = useQuery(usecases.hasActiveEditor, false);

  const toolbar = isEditorActive ? <EditorToolbar /> : <SearchToolbar />;

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>{toolbar}</Toolbar>
      </AppBar>
    </Box>
  );
};
