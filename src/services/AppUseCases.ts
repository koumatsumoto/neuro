import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map, mergeMap } from 'rxjs/operators';
import { Editor } from 'slate';
import { Note } from '../models';
import { AppStorage } from './AppStorage';

// TODO(refactor): consider renaming to NoteService
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

  saveNote(note: Note) {
    const notes = this.storage.saveNote(note);
    this.#notes.next(notes);
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
