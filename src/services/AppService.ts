import { pipe } from 'fp-ts/function';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter, map, withLatestFrom } from 'rxjs/operators';
import { ReactEditor } from 'slate-react';
import { Note } from '../models';
import { AppStorage } from './AppStorage';

type EditorCommand = 'AddHash' | 'AddAt' | 'AddSlash' | '';

// TODO(refactor): consider renaming to NoteService
export class AppService {
  readonly #notes = new BehaviorSubject<Note[]>([]);
  readonly #activeEditor = new BehaviorSubject<ReactEditor | null>(null);
  readonly #editorCommand = new BehaviorSubject<EditorCommand>('');

  get notesWithNewOne() {
    return this.#notes.pipe(
      map(Note.orderByIdDesc),
      map((notes) => [Note.create(), ...notes]),
      distinctUntilChanged(), // TODO(feat): check by latest updated time
    );
  }

  get activeEditor() {
    return this.#activeEditor.pipe();
  }

  get hasActiveEditor() {
    return this.#activeEditor.pipe(map(Boolean));
  }

  constructor(private readonly storage: AppStorage) {}

  loadNotes() {
    const notes = pipe(this.storage.loadNotes(), Note.orderByIdDesc);
    this.#notes.next(notes);
  }

  saveNote(note: Note) {
    this.storage.saveNote(note);
    this.#notes.next([...this.#notes.getValue(), note]);
  }

  setActiveEditor(editor: ReactEditor) {
    this.#activeEditor.next(editor);
  }

  resetActiveEditor() {
    this.#activeEditor.next(null);
  }

  getCommandsOf(editor: ReactEditor) {
    return this.#editorCommand.pipe(
      withLatestFrom(this.#activeEditor),
      filter(([, e]) => editor === e),
      map(([command]) => command),
    );
  }

  addHash() {
    this.#editorCommand.next('AddHash');
  }

  addAt() {
    this.#editorCommand.next('AddAt');
  }

  addSlash() {
    this.#editorCommand.next('AddSlash');
  }
}
