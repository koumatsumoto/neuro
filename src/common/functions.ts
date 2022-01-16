import { Note } from './types';

export const eqNote = {
  equals: (a: Note, b: Note) => a.id === b.id,
};

export const isSameNoteTo = (a: Note) => (b: Note) => a.id === b.id;
