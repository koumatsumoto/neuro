import { Note } from '../entities';

export type NoteRecords = {
  all: Record<Note['id'], Note>;
  latest: Record<Note['id'], Note>;
  stats: { allCount: number; latestCount: number };
};

/**
 * Application Storage Data Schema
 */
type StorageData = {
  '/notes': NoteRecords;
};

export class AppStorage<Data extends StorageData = StorageData> {
  readonly #keyPrefix: string;

  constructor({ version = 'v1', dbname = 'app' }: { version?: string; dbname?: string } = {}) {
    this.#keyPrefix = `${version}/${dbname}/`;
  }

  loadNotes(): NoteRecords {
    return this.#load('/notes') ?? { all: {}, latest: {}, stats: { allCount: 0, latestCount: 0 } };
  }

  async saveNote(source: Note, changes: Pick<Note, 'text' | 'editorNodes'>): Promise<{ errors: string[]; data?: never } | { errors?: never; data: NoteRecords }> {
    const created = await Note.createChild(source, { text: changes.text, editorNodes: changes.editorNodes });
    const errors = Note.validateUpdates(source, created);
    if (errors) {
      return { errors };
    }

    const data = this.loadNotes();
    data.all[source.id] = { ...source };
    delete data.latest[source.id];
    data.all[created.id] = created;
    data.latest[created.id] = created;
    data.stats = { allCount: Object.keys(data.all).length, latestCount: Object.keys(data.latest).length };
    this.#save('/notes', data);

    return { data };
  }

  #load<Key extends keyof Data & string>(key: Key): Data[Key] | null {
    const value = localStorage.getItem(`${this.#keyPrefix}${key}`);
    return value === null ? null : (JSON.parse(value) as Data[Key]);
  }

  #save<Key extends keyof Data & string>(key: Key, value: Data[Key]) {
    localStorage.setItem(`${this.#keyPrefix}${key}`, JSON.stringify(value));
  }
}
