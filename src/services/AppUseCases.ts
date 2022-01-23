import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Editor } from 'slate';
import { Note } from '../models';
import { filterNullish } from '../utils';
import { AppStorage, NoteRecords } from './AppStorage';
import { UseCases } from './interfaces';

export class AppUseCases implements UseCases {
  readonly #storage: AppStorage;
  readonly #noteRecords = new BehaviorSubject<NoteRecords | null>(null);
  readonly #activeEditor = new BehaviorSubject<Editor | null>(null);

  constructor(storage: AppStorage) {
    this.#storage = storage;
  }

  get hasActiveEditor() {
    return this.#activeEditor.pipe(map(Boolean));
  }

  queryLatestNotesWithReloading(): Observable<Note[]> {
    this.#loadNotes();

    return this.#noteRecords.pipe(
      filterNullish,
      map(({ latest }) => Object.values(latest)),
      map(Note.orderByCreatedNewer),
      map((notes) => [Note.createNewOne(), ...notes]),
    );
  }

  async changeEditorInactiveAndSaveNote(source: Note, updates: Pick<Note, 'text' | 'editorNodes'>) {
    this.#activeEditor.next(null);
    await this.#saveNote(source, updates);
  }

  async changeEditorActive(editor: Editor) {
    this.#activeEditor.next(editor);
  }

  addHash() {
    this.#activeEditor.getValue()?.customCommands.addHash();
  }

  addAt() {
    this.#activeEditor.getValue()?.customCommands.addAt();
  }

  addSlash() {
    this.#activeEditor.getValue()?.customCommands.addSlash();
  }

  #loadNotes() {
    this.#noteRecords.next(this.#storage.loadNotes());
  }

  async #saveNote(source: Note, updates: Pick<Note, 'text' | 'editorNodes'>) {
    await this.#storage.saveNote(source, updates).then(({ errors, data }) => {
      if (errors) {
        console.log('[AppUseCases/updateNote/errors]', { errors, source, updates });
      } else {
        this.#noteRecords.next(data!);
      }
    });
  }
}
