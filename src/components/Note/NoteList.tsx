import Box from '@mui/material/Box';
import React from 'react';
import { Editor } from 'slate';
import { Note } from '../../models';
import { useAppUseCases } from '../../services';
import { useSubscribe } from '../../utils';
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
  const usecases = useAppUseCases();
  const notes = useSubscribe(usecases.notesWithNewOne, { onSubscribe: () => usecases.loadNotes(), initialValue: [] });

  const makeNote = (note: Note) => {
    const validate = getNoteValidation(note);
    const save = async (data: EditorOutputData) => {
      const newNote = await Note.create({ ...note, text: data.text, editorNodes: JSON.stringify(data.editorNodes) });
      const errors = validate(newNote);
      if (errors === null) {
        usecases.saveNote(newNote);
      } else {
        console.log('[note/save/errors]', errors);
      }
    };

    const handleBlur = (data: EditorOutputData) => (save(data), usecases.resetActiveEditor());
    const handleFocus = (editor: Editor) => usecases.setActiveEditor(editor);

    return <EditableNote key={note.id} data={note} onBlur={handleBlur} onFocus={handleFocus} />;
  };

  return <NoteListLayout>{notes.map(makeNote)}</NoteListLayout>;
};
