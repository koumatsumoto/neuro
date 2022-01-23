import { Note } from '../entities';
import { StorageService } from './StorageService';

export type NoteRecords = {
  all: Record<Note['id'], Note>;
  latest: Record<Note['id'], Note>;
  stats: { allCount: number; latestCount: number };
};

const createInitialNoteRecords = () => ({ all: {}, latest: {}, stats: { allCount: 0, latestCount: 0 } } as const);

/**
 * Application Storage Data Schema
 */
type AppStorageData = {
  '/notes': NoteRecords;
};

export class AppRepository {
  readonly #storage: StorageService<AppStorageData>;

  constructor(storageOptions: { version?: string; namespace?: string } = {}) {
    this.#storage = new StorageService(storageOptions);
  }

  async loadNotes(): Promise<NoteRecords> {
    return Promise.resolve().then(() => this.#storage.load('/notes') ?? createInitialNoteRecords());
  }

  async saveNote(source: Note, changes: Pick<Note, 'text' | 'editorNodes'>): Promise<{ errors: string[]; data?: never } | { errors?: never; data: NoteRecords }> {
    const created = await Note.createChild(source, { text: changes.text, editorNodes: changes.editorNodes });
    const errors = Note.validateUpdates(source, created);
    if (errors) {
      return { errors };
    }

    const data = await this.loadNotes();
    data.all[source.id] = { ...source };
    delete data.latest[source.id];
    data.all[created.id] = created;
    data.latest[created.id] = created;
    data.stats = { allCount: Object.keys(data.all).length, latestCount: Object.keys(data.latest).length };
    this.#storage.save('/notes', data);

    return { data };
  }
}
