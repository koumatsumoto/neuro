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

const create = (data: Partial<Note> = {}) => ({
  id: data.id ?? `note/${Date.now()}`,
  text: data.text ?? '',
  createdAt: data.createdAt ?? Date.now(),
  editorNodes: data.editorNodes ?? undefined,
});
const toId = (note: Note) => note.id;
const toText = (note: Note) => note.text;

const Ord = pipe(S.Ord, contramap(toId));

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Note = {
  create,
  isEqualTo: equals(Ord),
  orderByIdAsc: sort(Ord),
  orderByIdDesc: sort(reverse(Ord)),
  toId,
  toText,
} as const;
