import Box from '@mui/material/Box';
import React from 'react';
import { ReactEditor } from 'slate-react';
import { Note } from '../../models';
import { useAppService } from '../../services';
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
  const service = useAppService();
  const notes = useSubscribe(service.notesWithNewOne, { onSubscribe: () => service.loadNotes(), initialValue: [] });

  const makeNote = (note: Note) => {
    const validate = getNoteValidation(note);
    const save = (data: EditorOutputData) => {
      const newNote = Note.create({ ...note, text: data.text, editorNodes: JSON.stringify(data.editorNodes) });
      const errors = validate(newNote);
      if (errors === null) {
        service.saveNote(newNote);
      }
    };

    const handleBlur = (data: EditorOutputData) => (save(data), service.resetActiveEditor());
    const handleFocus = (editor: ReactEditor) => service.setActiveEditor(editor);

    return <EditableNote key={note.id} data={note} onBlur={handleBlur} onFocus={handleFocus} />;
  };

  return <NoteListLayout>{notes.map(makeNote)}</NoteListLayout>;
};
