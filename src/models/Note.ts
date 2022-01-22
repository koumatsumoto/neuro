import { sort } from 'fp-ts/Array';
import { contramap, equals, reverse } from 'fp-ts/Ord';
import { pipe } from 'fp-ts/function';
import * as S from 'fp-ts/string';
import { Crypto } from '../utils';

/**
 * @Note IDの計算
 * - NoteのIDは本文にparentIDを加えた結果に対してSHA256でハッシュした値とする
 * - parentIdが指定されない場合は、Timestampのハッシュ値が使われる
 */
export interface Note {
  readonly id: string;
  readonly text: string;
  readonly createdAt: number;
  readonly editorNodes?: string; // json of Editor.Descendant[]
  readonly parentId?: string; // not implemented
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

export const calculateId = async (note: Pick<Note, 'text' | 'parentId'>) => {
  return Crypto.hashHex(note.text + note.parentId);
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Note = {
  create,
  isEqualTo: equals(Ord),
  orderByIdAsc: sort(Ord),
  orderByIdDesc: sort(reverse(Ord)),
  toId,
  toText,
} as const;
