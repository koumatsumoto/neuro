import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { createNote, Note, useAppService, useSetUiState } from '../../common';
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
  const service = useAppService();
  const setUiState = useSetUiState();
  const [lastSavedNoteId, setLastSavedNoteId] = useState<string>(); // to control reloading notes from storage
  const [notes, setNotes] = useState([] as Note[]);

  // reload notes on lastSavedNoteId changed
  useEffect(() => {
    setNotes([createNote(), ...service.loadSavedNotes()]);
  }, [setNotes, service, lastSavedNoteId]);

  const Notes = notes.map((note) => {
    const save = (text: string) => {
      if (text !== note.text) {
        service.saveNote({ ...note, text });
        setLastSavedNoteId(note.id); // reload notes
      }
    };
    const handleBlur = (text: string) => (save(text), setUiState('default'));
    const handleFocus = () => setUiState('editing-note');

    return <EditableNote key={note.id} data={note} onBlur={handleBlur} onFocus={handleFocus} />;
  });

  return <NoteListLayout>{Notes}</NoteListLayout>;
};
