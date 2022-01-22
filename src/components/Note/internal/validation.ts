import { contramap, not } from 'fp-ts/Predicate';
import { pipe } from 'fp-ts/function';
import { isEmpty } from 'fp-ts/string';
import { Note } from '../../../models';
import { getValidation } from './validation-fp';

const isChangedFrom =
  <T>(a: T) =>
  (b: T) =>
    a !== b;
const isWhiteSpace = (text: string) => text.trim() === '';

export const getNoteValidation = (source: Note) => {
  return getValidation<Note>({
    'text should not be empty': pipe(not(isEmpty), contramap(Note.toText)),
    'text should not be only whitespaces': pipe(not(isWhiteSpace), contramap(Note.toText)),
    'text should be changed': pipe(isChangedFrom(source.text), contramap(Note.toText)),
    // TODO(feat): add more validations
    //   - 'updatedAt should be changed'
  });
};
