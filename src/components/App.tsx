import React from 'react';
import { MainLayout } from './Containers';
import { NoteContents } from './Note';
import { AppToolbar } from './Toolbar';

export const App = () => {
  return <MainLayout toolbar={<AppToolbar />} contents={<NoteContents />} />;
};
