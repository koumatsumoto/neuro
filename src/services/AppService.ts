import { pipe } from 'fp-ts/function';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Note } from '../models';
import { AppStorage } from './AppStorage';

// TODO(refactor): consider renaming to NoteService
export class AppService {
  readonly #notes = new BehaviorSubject([] as Note[]);

  get notesWithNewOne() {
    return this.#notes.pipe(
      map(Note.orderByIdDesc),
      map((notes) => [Note.create(), ...notes]),
      distinctUntilChanged(), // TODO(feat): check by latest updated time
    );
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
}
