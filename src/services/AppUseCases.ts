import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map, mergeMap } from 'rxjs/operators';
import { Editor } from 'slate';
import { Note } from '../models';
import { AppStorage } from './AppStorage';

export class AppUseCases {
  readonly #notes = new BehaviorSubject<Note[]>([]);
  readonly #activeEditor = new BehaviorSubject<Editor | null>(null);

  constructor(private readonly storage: AppStorage) {}

  get notesWithNewOne() {
    return this.#notes.pipe(
      map(Note.orderByCreatedNewer),
      mergeMap((notes) => Note.create().then((note) => [note, ...notes])),
      distinctUntilChanged(), // TODO(feat): check by latest updated time
    );
  }

  get activeEditor() {
    return this.#activeEditor.pipe();
  }

  get hasActiveEditor() {
    return this.#activeEditor.pipe(map(Boolean));
  }

  loadNotes() {
    const notes = this.storage.loadNotes();
    this.#notes.next(notes);
  }

  async saveNote(source: Note, updates: Pick<Note, 'text' | 'editorNodes'>) {
    const newNote = await Note.create({ ...source, text: updates.text, editorNodes: updates.editorNodes });
    const errors = Note.validateUpdates(source, newNote);
    if (errors === null) {
      const notes = this.storage.saveNote(newNote);
      this.#notes.next(notes);
    } else {
      console.log('[AppUseCases/updateNote/errors]', { errors, source, updates });
    }
  }

  setActiveEditor(editor: Editor) {
    this.#activeEditor.next(editor);
  }

  resetActiveEditor() {
    this.#activeEditor.next(null);
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
}
