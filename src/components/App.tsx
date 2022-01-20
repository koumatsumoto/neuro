import React from 'react';
import { Header } from './Header';
import { MainLayout } from './Layout';
import { NoteList } from './Note';
import { AppToolbar } from './Toolbar';

export const App = () => {
  return <MainLayout header={<Header />} toolbar={<AppToolbar />} contents={<NoteList />} />;
};
