import { useEffect, useState } from 'react';
import { createNote, Note, useAppService } from '../../common';
import { EditableNote } from './EditableNote';

export const NoteContents = () => {
  const service = useAppService();
  const [lastSavedNoteId, setLastSavedNoteId] = useState<string>(); // to control reloading notes from storage
  const [notes, setNotes] = useState([] as Note[]);
  useEffect(() => {
    // first is always new one
    setNotes([createNote(), ...service.loadSavedNotes()]);
  }, [setNotes, service, lastSavedNoteId]);

  return (
    <>
      {notes.map((note) => (
        <EditableNote key={note.id} data={note} onSave={(note) => setLastSavedNoteId(note.id)} />
      ))}
    </>
  );
};
