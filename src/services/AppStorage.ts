import { Note } from '../models';

/**
 * Database Schema
 *  - app/notes: string[]
 */
type StorageData = {
  'app/notes': Record<Note['id'], Note>;
};

export class AppStorage<Data extends StorageData = StorageData> {
  readonly #keyPrefix: string;

  constructor({ version = 'v1', dbname = 'app' }: { version?: string; dbname?: string } = {}) {
    this.#keyPrefix = `${version}/${dbname}/`;
  }

  loadNotes(): Record<Note['id'], Note> {
    return this.#load('app/notes') ?? {};
  }

  saveNote(note: Note): Record<Note['id'], Note> {
    const notes = { ...this.loadNotes(), [note.id]: note };
    this.#save('app/notes', notes);

    return notes;
  }

  #load<Key extends keyof Data & string>(key: Key): Data[Key] | null {
    const value = localStorage.getItem(`${this.#keyPrefix}${key}`);
    return value === null ? null : (JSON.parse(value) as Data[Key]);
  }

  #save<Key extends keyof Data & string>(key: Key, value: Data[Key]) {
    localStorage.setItem(`${this.#keyPrefix}${key}`, JSON.stringify(value));
  }
}
