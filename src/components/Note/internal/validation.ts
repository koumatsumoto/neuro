import { contramap, not } from 'fp-ts/Predicate';
import { pipe } from 'fp-ts/function';
import { isEmpty } from 'fp-ts/string';
import { Note } from '../../../common';
import { getValidation } from './validation-fp';

const isChangedFrom =
  <T>(a: T) =>
  (b: T) =>
    a !== b;
const isWhiteSpace = (text: string) => text.trim() === '';
const toId = (note: Note) => note.id;
const toText = (note: Note) => note.text;

export const getNoteValidation = (source: Note) => {
  return getValidation<Note>({
    'id should not be changed': pipe(not(isChangedFrom(source.id)), contramap(toId)),
    'text should not be empty': pipe(not(isEmpty), contramap(toText)),
    'text should not be only whitespaces': pipe(not(isWhiteSpace), contramap(toText)),
    'text should be changed': pipe(isChangedFrom(source.text), contramap(toText)),
    // TODO(feat): add more validations
    //   - 'updatedAt should be changed'
  });
};
