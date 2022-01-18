import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { createNote, Note, useAppService } from '../../common';
import { EditableNote } from './EditableNote';

export const NoteListLayout: React.FC = ({ children }) => {
  return (
    <Box
      sx={{
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

export const NoteContents = () => {
  const service = useAppService();
  const [lastSavedNoteId, setLastSavedNoteId] = useState<string>(); // to control reloading notes from storage
  const [notes, setNotes] = useState([] as Note[]);
  useEffect(() => {
    // first is always new one
    setNotes([createNote(), ...service.loadSavedNotes()]);
  }, [setNotes, service, lastSavedNoteId]);

  return (
    <NoteListLayout>
      {notes.map((note) => (
        <EditableNote key={note.id} data={note} onSave={(note) => setLastSavedNoteId(note.id)} />
      ))}
    </NoteListLayout>
  );
};
