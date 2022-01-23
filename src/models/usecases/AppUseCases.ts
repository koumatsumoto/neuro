import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Editor } from 'slate';
import { filterNullish } from '../../utils';
import { Note } from '../entities';
import { AppRepository, NoteRecords } from '../services';
import { UseCases } from './interfaces';

export class AppUseCases implements UseCases {
  readonly #repository: AppRepository;
  readonly #noteRecords = new BehaviorSubject<NoteRecords | null>(null);
  readonly #activeEditor = new BehaviorSubject<Editor | null>(null);

  constructor(repository: AppRepository = new AppRepository({ version: 'v3' })) {
    this.#repository = repository;
  }

  get hasActiveEditor() {
    return this.#activeEditor.pipe(map(Boolean));
  }

  queryLatestNotesWithReloading = (): Observable<Note[]> => {
    this.#loadNotes().catch();

    return this.#noteRecords.pipe(
      filterNullish,
      map(({ latest }) => Object.values(latest)),
      map(Note.orderByCreatedNewer),
      map((notes) => [Note.createNewOne(), ...notes]),
    );
  };

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

  async #loadNotes() {
    this.#noteRecords.next(await this.#repository.loadNotes());
  }

  async #saveNote(source: Note, updates: Pick<Note, 'text' | 'editorNodes'>) {
    await this.#repository.saveNote(source, updates).then(({ errors, data }) => {
      if (errors) {
        console.log('[AppUseCases/updateNote/errors]', { errors, source, updates });
      } else {
        this.#noteRecords.next(data!);
      }
    });
  }
}
