import { not } from 'fp-ts/Predicate';
import { isEmpty, startsWith } from 'fp-ts/string';
import { getValidation } from './validation-fp';

test('getValidation', () => {
  const v = getValidation({
    'value should not be empty': not(isEmpty),
    'value should start with ok': startsWith('ok'),
  });
  expect(v('')).toEqual(['value should not be empty', 'value should start with ok']);
  expect(v('not ok')).toEqual(['value should start with ok']);
  expect(v('ok')).toEqual(null);
});
