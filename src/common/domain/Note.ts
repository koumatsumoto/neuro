import { sort } from 'fp-ts/Array';
import { contramap, equals, reverse } from 'fp-ts/Ord';
import { pipe } from 'fp-ts/function';
import * as S from 'fp-ts/string';

export interface Note {
  readonly id: string;
  readonly text: string;
  readonly createdAt: number;
}

const Ord = pipe(
  S.Ord,
  contramap(({ id }: Note) => id),
);

export const createNote = ({ id = `note/${Date.now()}`, text = '', createdAt = Date.now() }: Partial<Note> = {}) => ({ id, text, createdAt });
export const isEqualTo = equals(Ord);
export const orderById = sort(Ord);
export const orderByIdDesc = sort(reverse(Ord));
