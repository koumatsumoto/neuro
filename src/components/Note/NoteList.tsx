import Box from '@mui/material/Box';
import React from 'react';
import { useAppUseCases } from '../../hooks';
import { Note } from '../../models';
import { useCommand, useQuery } from '../../utils';
import { EditableNote } from './EditableNote';

export const NoteListLayout: React.FC = ({ children }) => {
  return (
    <Box
      sx={{
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexFlow: 'column-reverse',
        justifyContent: 'end',
        padding: '24px',
        gap: '24px',
        overflow: 'auto',
      }}
    >
      {children}
    </Box>
  );
};

export const NoteList = () => {
  const usecases = useAppUseCases();
  const loadedNotes = useQuery(usecases.queryLatestNotesWithReloading, []);
  const [saveNoteAfterEdit] = useCommand(usecases.saveNoteAfterEdit);

  const createEditableNote = (note: Note) => {
    return <EditableNote key={note.uid} data={note} onChange={(changes) => saveNoteAfterEdit(note, changes)} />;
  };

  return <NoteListLayout>{loadedNotes.map(createEditableNote)}</NoteListLayout>;
};
