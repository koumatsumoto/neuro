import { AppStorage } from './AppStorage';
import { Note } from './models';

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

  saveNote(note: Note) {
    console.log('[app] saveNote', note);
    this.storage.saveNote(note);
  }
}
