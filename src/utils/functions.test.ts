import { ifNonEmpty, ifNonNullable } from './functions';

describe('ifNonNullable', () => {
  test('with nullish', () => {
    const fn = jest.fn();
    ifNonNullable(null, fn);
    ifNonNullable(undefined, fn);
    expect(fn).not.toBeCalled();
  });
  test('with false', () => {
    const fn = jest.fn();
    ifNonNullable(false, fn);
    expect(fn).toBeCalledWith(false);
  });
  test('with true', () => {
    const fn = jest.fn();
    ifNonNullable(true, fn);
    expect(fn).toBeCalledWith(true);
  });
});

describe('ifNonEmpty', () => {
  test('with array', () => {
    const fn = jest.fn();
    ifNonEmpty([], fn);
    ifNonEmpty([0], fn);
    expect(fn).toBeCalledWith([0]);
  });
});
