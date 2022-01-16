import { useCallback, useState } from 'react';
import { Note, useAppService } from '../../common';
import { NeuroEditor } from '../Editor';

export const createNote = () => {
  return {
    id: `note/${Date.now()}`,
    text: '',
  };
};

export const EditableNote = ({ data }: { data?: Note }) => {
  const appService = useAppService();
  const [note, setNote] = useState(data ?? createNote());
  const save = useCallback(
    (text: string) => {
      const updated = { ...note, text };
      setNote(updated);
      appService.saveNote(updated);
    },
    [appService, note, setNote],
  );

  return <NeuroEditor text={note.text} onSave={save} onBlur={save} />;
};
