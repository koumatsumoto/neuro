import Paper from '@mui/material/Paper';
import { useCallback, useState } from 'react';
import { createNote, Note, useAppService } from '../../common';
import { noop } from '../../utils';
import { NeuroEditor } from '../Editor';

export const EditableNote = ({ data, onSave = noop }: { data?: Note; onSave?: (note: Note) => void }) => {
  const appService = useAppService();
  const [note, setNote] = useState(data ?? createNote());
  const save = useCallback(
    (text: string) => {
      if (text) {
        const updated = { ...note, text };
        setNote(updated);
        appService.saveNote(updated);
        onSave(updated);
      }
    },
    [appService, note, setNote, onSave],
  );

  return (
    <Paper elevation={3} sx={{ width: '600px', maxWidth: '100%', padding: '24px' }}>
      <NeuroEditor text={note.text} onSave={save} onBlur={save} />
    </Paper>
  );
};
