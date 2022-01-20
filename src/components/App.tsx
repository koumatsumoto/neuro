import React from 'react';
import { MainLayout } from './Containers';
import { Header } from './Header';
import { NoteContents } from './Note';
import { AppToolbar } from './Toolbar';

export const App = () => {
  return <MainLayout header={<Header />} toolbar={<AppToolbar />} contents={<NoteContents />} />;
};
