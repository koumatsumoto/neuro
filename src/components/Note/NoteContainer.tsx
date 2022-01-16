import { useState } from 'react';
import { useAppService } from '../../common';
import { EditableNote } from './EditableNote';

export const NoteContainer = () => {
  const service = useAppService();
  const [notes] = useState(service.loadSavedNotes());

  return (
    <>
      {notes.map((note) => (
        <EditableNote key={note.id} data={note} />
      ))}
    </>
  );
};
