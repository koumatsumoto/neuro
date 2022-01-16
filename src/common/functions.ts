import { type Eq } from 'fp-ts/Eq';

export const includes =
  <A>(E: Eq<A>) =>
  (a: A, array: Array<A>) =>
    array.some((x) => E.equals(x, a));
