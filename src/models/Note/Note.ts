import { sort } from 'fp-ts/Array';
import * as Ord from 'fp-ts/Ord';
import * as Predicate from 'fp-ts/Predicate';
import { pipe } from 'fp-ts/function';
import * as N from 'fp-ts/number';
import * as S from 'fp-ts/string';
import { Crypto, getValidation } from '../../utils';

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

const byId = pipe(S.Ord, Ord.contramap(toId));
const byCreatedAt = pipe(N.Ord, Ord.contramap(toCreatedAt));

const isChangedFrom =
  <T>(a: T) =>
  (b: T) =>
    a !== b;
const isWhiteSpace = (text: string) => text.trim() === '';

export const getNoteValidation = (source: Note) => {
  return getValidation<Note>({
    'text should not be empty': pipe(Predicate.not(S.isEmpty), Predicate.contramap(Note.toText)),
    'text should not be only whitespaces': pipe(Predicate.not(isWhiteSpace), Predicate.contramap(Note.toText)),
    'text should be changed': pipe(isChangedFrom(source.text), Predicate.contramap(Note.toText)),
    // TODO(feat): add more validations
    //   - 'updatedAt should be changed'
  });
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Note = {
  create,
  isEqualTo: Ord.equals(byId),
  orderByCreatedNewer: sort(Ord.reverse(byCreatedAt)),
  toId,
  toText,
  validateUpdates: (beforeUpdate: Note, afterUpdate: Note) => getNoteValidation(beforeUpdate)(afterUpdate),
} as const;
