import { Note } from './types';

export const eqNote = {
  equals: (a: Note, b: Note) => a.id === b.id,
};

export const isSameNoteTo = (a: Note) => (b: Note) => a.id === b.id;

export const createNote = () => {
  return {
    id: `note/${Date.now()}`,
    text: '',
  };
};
