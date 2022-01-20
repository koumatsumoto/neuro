import { Note } from '../../../common';
import { getNoteValidation } from './validation';

test('getNoteValidation', () => {
  const source = { id: 'id', text: 'text', createdAt: 1 } as Note;
  const valid = { id: 'id', text: 'changed', createdAt: 1 } as Note;
  const validation = getNoteValidation(source);

  expect(validation({ ...valid })).toBeNull();
  expect(validation({ ...valid, id: 'other id' })).toEqual(expect.arrayContaining(['id should not be changed']));
  expect(validation({ ...valid, text: '' })).toEqual(['text should not be empty']);
  expect(validation({ ...valid, text: source.text })).toEqual(['text should be changed']);
});
