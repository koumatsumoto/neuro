import { useState } from 'react';
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
  const onSave = (text: string) => {
    const newNote = { ...note, text };
    setNote(newNote);
    appService.saveNote(newNote);
  };

  return <NeuroEditor text={note.text} onSave={onSave} />;
};
