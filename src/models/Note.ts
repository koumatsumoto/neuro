import { sort } from 'fp-ts/Array';
import { contramap, equals, reverse } from 'fp-ts/Ord';
import { pipe } from 'fp-ts/function';
import * as N from 'fp-ts/number';
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

export const calculateId = async (text: string, parentId: string) => {
  return Crypto.hashHex(text + parentId);
};

const create = async (data: Partial<Note> = {}) => {
  const parentId = data.parentId ?? (await calculateId(String(Date.now()), ''));
  const id = await calculateId(data.text ?? '', parentId);

  return {
    id,
    parentId,
    text: data.text ?? '',
    createdAt: data.createdAt ?? Date.now(),
    editorNodes: data.editorNodes ?? undefined,
  };
};

const toId = (note: Note) => note.id;
const toText = (note: Note) => note.text;
const toCreatedAt = (note: Note) => note.createdAt;

const byId = pipe(S.Ord, contramap(toId));
const byCreatedAt = pipe(N.Ord, contramap(toCreatedAt));

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Note = {
  create,
  isEqualTo: equals(byId),
  orderByCreatedNewer: sort(reverse(byCreatedAt)),
  toId,
  toText,
} as const;
