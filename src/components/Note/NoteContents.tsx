import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { createNote, Note, useAppService } from '../../common';
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

export const NoteContents = () => {
  const service = useAppService();
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

    return <EditableNote key={note.id} data={note} onBlur={save} />;
  });

  return <NoteListLayout>{Notes}</NoteListLayout>;
};
