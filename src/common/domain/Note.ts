import { sort } from 'fp-ts/Array';
import { contramap, equals, reverse } from 'fp-ts/Ord';
import { pipe } from 'fp-ts/function';
import * as S from 'fp-ts/string';

export interface Note {
  readonly id: string;
  readonly text: string;
}

const Ord = pipe(
  S.Ord,
  contramap(({ id }: { id: string }) => id),
);

export const createNote = ({ id = `note/${Date.now()}`, text = '' }: { id?: string; text?: string } = {}) => ({ id, text });
export const isEqualTo = equals(Ord);
export const orderById = sort(Ord);
export const orderByIdDesc = sort(reverse(Ord));
