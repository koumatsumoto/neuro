import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Editor } from 'slate';
import { Note } from '../models';
import { AppStorage } from './AppStorage';
import { UseCases } from './interfaces';

export class AppUseCases implements UseCases {
  readonly #storage: AppStorage;
  readonly #notes = new BehaviorSubject<Note[]>([]);
  readonly #activeEditor = new BehaviorSubject<Editor | null>(null);

  constructor(storage: AppStorage) {
    this.#storage = storage;
  }

  get hasActiveEditor() {
    return this.#activeEditor.pipe(map(Boolean));
  }

  queryNotesWithReloading(): Observable<Note[]> {
    this.#loadNotes();

    return this.#notes.pipe(
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
    const notes = this.#storage.loadNotes();
    const notesOfLastChild = Note.filterLastChild(Object.values(notes));
    this.#notes.next(notesOfLastChild);
  }

  async #saveNote(source: Note, updates: Pick<Note, 'text' | 'editorNodes'>) {
    const newNote = await Note.createChild(source, { text: updates.text, editorNodes: updates.editorNodes });
    const errors = Note.validateUpdates(source, newNote);
    if (errors === null) {
      this.#storage.saveNote(newNote);
      this.#loadNotes();
    } else {
      console.log('[AppUseCases/updateNote/errors]', { errors, source, updates });
    }
  }
}
