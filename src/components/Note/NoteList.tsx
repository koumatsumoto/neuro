import Box from '@mui/material/Box';
import React from 'react';
import { Note, useAppUseCases, useQuery } from '../../models';
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

  const createEditableNote = (note: Note) => {
    return (
      <EditableNote
        key={note.uid}
        data={note}
        onBlur={(data) => usecases.changeEditorInactiveAndSaveNote(note, { text: data.text, editorNodes: JSON.stringify(data.editorNodes) })}
        onFocus={(editor) => usecases.changeEditorActive(editor)}
      />
    );
  };

  return <NoteListLayout>{loadedNotes.map(createEditableNote)}</NoteListLayout>;
};
