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
    return this.#load('app/notes') ?? [];
  }

  saveNote(note: Note): Note[] {
    const isEqualToNewOne = Note.isEqualTo(note);
    const notesInStorage = this.loadNotes();
    const isUpdateExistence = notesInStorage.some(isEqualToNewOne);
    const newNotes = isUpdateExistence ? notesInStorage.map((n) => (isEqualToNewOne(n) ? { ...n, ...note } : n)) : [...notesInStorage, note];
    this.#save('app/notes', newNotes);

    return newNotes;
  }

  #load<Key extends keyof Data & string>(key: Key): Data[Key] | null {
    const value = localStorage.getItem(`${this.#keyPrefix}${key}`);
    return value === null ? null : (JSON.parse(value) as Data[Key]);
  }

  #save<Key extends keyof Data & string>(key: Key, value: Data[Key]) {
    localStorage.setItem(`${this.#keyPrefix}${key}`, JSON.stringify(value));
  }
}
