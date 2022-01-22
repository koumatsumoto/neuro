import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, mergeMap } from 'rxjs/operators';
import { Editor } from 'slate';
import { Note } from '../models';
import { AppStorage } from './AppStorage';
import { UseCases } from './interfaces';

export class AppUseCases implements UseCases {
  readonly #notes = new BehaviorSubject<Note[]>([]);
  readonly #activeEditor = new BehaviorSubject<Editor | null>(null);

  constructor(private readonly storage: AppStorage) {}

  get activeEditor() {
    return this.#activeEditor.pipe();
  }

  get hasActiveEditor() {
    return this.#activeEditor.pipe(map(Boolean));
  }

  queryNotesWithReloading(): Observable<Note[]> {
    this.loadNotes();

    return this.#notes.pipe(
      map(Note.orderByCreatedNewer),
      mergeMap((notes) => Note.create().then((note) => [note, ...notes])),
      distinctUntilChanged(), // TODO(feat): check by latest updated time
    );
  }

  async changeEditorInactiveAndSaveNote(source: Note, updates: Pick<Note, 'text' | 'editorNodes'>) {
    this.#activeEditor.next(null);
    await this.saveNote(source, updates);
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

  private loadNotes() {
    const notes = this.storage.loadNotes();
    this.#notes.next(notes);
  }

  private async saveNote(source: Note, updates: Pick<Note, 'text' | 'editorNodes'>) {
    const newNote = await Note.create({ ...source, text: updates.text, editorNodes: updates.editorNodes });
    const errors = Note.validateUpdates(source, newNote);
    if (errors === null) {
      const notes = this.storage.saveNote(newNote);
      this.#notes.next(notes);
    } else {
      console.log('[AppUseCases/updateNote/errors]', { errors, source, updates });
    }
  }
}
