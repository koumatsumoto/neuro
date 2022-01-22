import Box from '@mui/material/Box';
import React from 'react';
import { Note } from '../../models';
import { useCommand, useQuery } from '../../services';
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
  const loadedNotes = useQuery((usecases) => usecases.queryNotesWithReloading(), []);
  const saveNoteAndChangeEditorInactive = useCommand((usecases) => usecases.changeEditorInactiveAndSaveNote);
  const changeEditorActive = useCommand((usecases) => usecases.changeEditorActive);

  const createEditableNote = (note: Note) => {
    return (
      <EditableNote
        key={note.uid}
        data={note}
        onBlur={(data) => saveNoteAndChangeEditorInactive(note, { text: data.text, editorNodes: JSON.stringify(data.editorNodes) })}
        onFocus={(editor) => changeEditorActive(editor)}
      />
    );
  };

  return <NoteListLayout>{loadedNotes.map(createEditableNote)}</NoteListLayout>;
};
