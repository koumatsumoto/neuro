import { sort } from 'fp-ts/Array';
import * as Eq from 'fp-ts/Eq';
import * as Ord from 'fp-ts/Ord';
import * as Predicate from 'fp-ts/Predicate';
import * as Set from 'fp-ts/Set';
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
  readonly editorNodes?: string; // json of Editor.Descendant[]
  readonly parentId: string | null; // not implemented
  readonly parentCount: number;
  readonly ancestor: string;
  readonly createdAt: number;
  readonly uid: string; // view id
}

export const calculateId = async (text: string, parentId: string) => {
  return Crypto.hashHex(text + parentId);
};

const genUid = () => `uid/note/${Date.now()}/${(Math.random() * 1000000).toFixed(6)}`;

const createNewOne = (): Note => {
  return {
    id: '',
    uid: genUid(),
    text: '',
    editorNodes: undefined,
    parentId: '',
    parentCount: 0,
    ancestor: '',
    createdAt: Date.now(),
  };
};

const createChild = async (source: Note, updates: Pick<Note, 'text' | 'editorNodes'>): Promise<Note> => {
  const id = await calculateId(updates.text, source.id);

  return {
    id,
    uid: genUid(),
    text: updates.text,
    editorNodes: updates.editorNodes,
    parentId: S.isEmpty(source.id) ? null : source.id,
    parentCount: source.parentCount + 1,
    ancestor: S.isEmpty(source.ancestor) ? id : source.ancestor,
    createdAt: Date.now(),
  };
};

const toId = (note: Note) => note.id;
const toText = (note: Note) => note.text;
const toCreatedAt = (note: Note) => note.createdAt;
const toParentCount = (note: Note) => note.parentCount;
const toAncestor = (note: Note) => note.ancestor;

const byParentCountDesc = pipe(N.Ord, Ord.contramap(toParentCount), Ord.reverse);
const byCreatedAtDesc = pipe(N.Ord, Ord.contramap(toCreatedAt), Ord.reverse);
const eqAncestor = pipe(S.Eq, Eq.contramap(toAncestor));

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
  });
};

const uniqByAncestor = (notes: Note[]) => {
  return pipe(notes, sort(byParentCountDesc), Set.fromArray(eqAncestor), Set.toArray(byCreatedAtDesc));
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Note = {
  createNewOne,
  createChild,
  orderByCreatedNewer: sort(byCreatedAtDesc),
  filterLastChild: uniqByAncestor,
  toId,
  toText,
  validateUpdates: (beforeUpdate: Note, afterUpdate: Note) => getNoteValidation(beforeUpdate)(afterUpdate),
} as const;
