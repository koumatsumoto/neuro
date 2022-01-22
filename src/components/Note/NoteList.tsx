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
  const notes = useQuery((us) => us.queryNotesWithReloading(), { initial: [] });
  const saveNoteAndChangeEditorInactive = useCommand((us) => us.changeEditorInactiveAndSaveNote);
  const changeEditorActive = useCommand((us) => us.changeEditorActive);

  const makeNote = (note: Note) => {
    return (
      <EditableNote
        key={note.id}
        data={note}
        onBlur={(data) => saveNoteAndChangeEditorInactive(note, { text: data.text, editorNodes: JSON.stringify(data.editorNodes) })}
        onFocus={(editor) => changeEditorActive(editor)}
      />
    );
  };

  return <NoteListLayout>{notes.map(makeNote)}</NoteListLayout>;
};
