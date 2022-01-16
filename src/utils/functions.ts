export const isNonNullable = <V>(value: V): value is NonNullable<V> => value !== null && value !== undefined;

export const ifNonNullable = <T>(value: T, fn: (value: NonNullable<T>) => void) => {
  if (isNonNullable(value)) {
    fn(value);
  }
};
