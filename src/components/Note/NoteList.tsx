import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { Note, useAppService, useSetUiState } from '../../common';
import { EditableNote } from './EditableNote';
import { EditorOutputData, getNoteValidation } from './internal';

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
    setNotes([Note.create(), ...service.loadSavedNotes()]);
  }, [setNotes, service, lastSavedNoteId]);

  const Notes = notes.map((note) => {
    const validate = getNoteValidation(note);
    const save = (data: EditorOutputData) => {
      const newNote = Note.create({ ...note, text: data.text, editorNodes: JSON.stringify(data.editorNodes) });
      const errors = validate(newNote);
      if (errors === null) {
        service.saveNote(newNote);
        setLastSavedNoteId(newNote.id); // reload notes
      }
    };

    const handleBlur = (data: EditorOutputData) => (save(data), setUiState('default'));
    const handleFocus = () => setUiState('editing-note');

    return <EditableNote key={note.id} data={note} onBlur={handleBlur} onFocus={handleFocus} />;
  });

  return <NoteListLayout>{Notes}</NoteListLayout>;
};
