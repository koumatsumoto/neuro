import { AppStorage } from './AppStorage';
import { Note } from './types';

export class AppService {
  constructor(private readonly storage: AppStorage) {}

  loadSavedNotes() {
    const notes = this.storage.loadNotes();
    console.log('[app] loadNotes', notes);
    return notes;
  }

  loadLastNotes(): Note | undefined {
    const note = this.storage.loadNotes().at(-1);
    console.log('[app] loadLastNotes', note);
    return note;
  }

  saveNewNote(note: Note) {
    console.log('[app] saveNewNote', note);
    this.storage.saveNote(note);
  }
}
