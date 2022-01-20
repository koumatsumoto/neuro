import { pipe } from 'fp-ts/function';
import { Note } from '../models';

/**
 * Database Schema
 *  - app/notes: string[]
 */
type StorageData = {
  'app/notes': Note[];
};

export class AppStorage<Data extends StorageData = StorageData> {
  readonly #keyPrefix: string;

  constructor({ version = 'v1', dbname = 'app' }: { version?: string; dbname?: string } = {}) {
    this.#keyPrefix = `${version}/${dbname}/`;
  }

  loadNotes(): Note[] {
    return pipe(this.#load('app/notes') ?? [], Note.orderByIdDesc);
  }

  saveNote(note: Note) {
    const isEqualToNewOne = Note.isEqualTo(note);
    const notesInStorage = this.loadNotes();

    if (notesInStorage.some(isEqualToNewOne)) {
      this.#save(
        'app/notes',
        notesInStorage.map((n) => (isEqualToNewOne(n) ? { ...n, ...note } : n)),
      );
    } else {
      this.#save('app/notes', [...notesInStorage, note]);
    }
  }

  #load<Key extends keyof Data & string>(key: Key): Data[Key] | null {
    const value = localStorage.getItem(`${this.#keyPrefix}${key}`);
    return value === null ? null : (JSON.parse(value) as Data[Key]);
  }

  #save<Key extends keyof Data & string>(key: Key, value: Data[Key]) {
    localStorage.setItem(`${this.#keyPrefix}${key}`, JSON.stringify(value));
  }
}
