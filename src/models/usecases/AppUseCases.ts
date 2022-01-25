import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Editor } from 'slate';
import { filterNullish } from '../../utils';
import { Note } from '../entities';
import { AppRepository, NoteRecords } from '../services';

export class AppUseCases {
  readonly #repository: AppRepository;
  readonly #noteRecords = new BehaviorSubject<NoteRecords | null>(null);
  readonly #activeEditor = new BehaviorSubject<Editor | null>(null);

  constructor(repository: AppRepository = new AppRepository({ version: 'v4' })) {
    this.#repository = repository;
  }

  hasActiveEditor = () => {
    return this.#activeEditor.pipe(map(Boolean));
  };

  queryLatestNotesWithReloading = (): Observable<Note[]> => {
    this.#loadNotes().catch();

    return this.#noteRecords.pipe(
      filterNullish,
      map(({ latest }) => Object.values(latest)),
      map(Note.orderByAncestor),
      map((notes) => [Note.createNewOne(), ...notes]),
    );
  };

  saveNoteAfterEdit = async (source: Note, updates: Pick<Note, 'text'>) => {
    await this.#saveNote(source, updates);
  };

  // TODO(feat): currently not working
  addHash() {
    this.#activeEditor.getValue()?.customCommands.addHash();
  }

  // TODO(feat): currently not working
  addAt() {
    this.#activeEditor.getValue()?.customCommands.addAt();
  }

  // TODO(feat): currently not working
  addSlash() {
    this.#activeEditor.getValue()?.customCommands.addSlash();
  }

  async #loadNotes() {
    this.#noteRecords.next(await this.#repository.loadNotes());
  }

  async #saveNote(source: Note, updates: Pick<Note, 'text' | 'editorNodes'>) {
    await this.#repository.saveNote(source, updates).then(({ errors, data }) => {
      if (errors) {
        throw errors;
      } else {
        this.#noteRecords.next(data!);
      }
    });
  }
}
