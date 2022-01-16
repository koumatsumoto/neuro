import { useCallback, useState } from 'react';
import { createNote, Note, useAppService } from '../../common';
import { NeuroEditor } from '../Editor';

export const EditableNote = ({ data }: { data?: Note }) => {
  const appService = useAppService();
  const [note, setNote] = useState(data ?? createNote());
  const save = useCallback(
    (text: string) => {
      if (text) {
        const updated = { ...note, text };
        setNote(updated);
        appService.saveNote(updated);
      }
    },
    [appService, note, setNote],
  );

  return <NeuroEditor text={note.text} onSave={save} onBlur={save} />;
};
