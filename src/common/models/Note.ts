import { sort } from 'fp-ts/Array';
import { contramap, equals, reverse } from 'fp-ts/Ord';
import { pipe } from 'fp-ts/function';
import * as S from 'fp-ts/string';

export interface Note {
  readonly id: string;
  readonly text: string;
  readonly createdAt: number;
  readonly editorNodes?: string; // json of Editor.Descendant[]
}

const toId = (note: Note) => note.id;
const toText = (note: Note) => note.text;

const Ord = pipe(S.Ord, contramap(toId));

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Note = {
  create: ({ id = `note/${Date.now()}`, text = '', createdAt = Date.now() }: Partial<Note> = {}) => ({ id, text, createdAt }),
  isEqualTo: equals(Ord),
  orderByIdAsc: sort(Ord),
  orderByIdDesc: sort(reverse(Ord)),
  toId,
  toText,
} as const;
