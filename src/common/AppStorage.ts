import { pipe } from 'fp-ts/function';
import { isEqualTo, Note, orderByIdDesc } from './domain';

/**
 * Database Schema
 *  - app/notes: string[]
 */
type StorageData = {
  'app/notes': Note[];
};

export class AppStorage<Data extends StorageData = StorageData> {
  loadNotes(): Note[] {
    return pipe(this.#load('app/notes') ?? [], orderByIdDesc);
  }

  saveNote(note: Note) {
    const isSame = isEqualTo(note);
    const notes = this.loadNotes();

    if (notes.some(isSame)) {
      this.#save(
        'app/notes',
        notes.map((n) => (isSame(n) ? { ...n, ...note } : n)),
      );
    } else {
      this.#save('app/notes', [...notes, note]);
    }
  }

  #load<Key extends keyof Data & string>(key: Key): Data[Key] | null {
    const value = localStorage.getItem(key);
    return value === null ? null : (JSON.parse(value) as Data[Key]);
  }

  #save<Key extends keyof Data & string>(key: Key, value: Data[Key]) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
