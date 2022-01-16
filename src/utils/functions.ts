export const isNonNullable = <V>(value: V): value is NonNullable<V> => value !== null && value !== undefined;

export const ifNonNullable = <T>(value: T, fn: (value: NonNullable<T>) => void) => {
  if (isNonNullable(value)) {
    fn(value);
  }
};

interface IfNonEmpty {
  <V>(value: Array<V>, fn: (value: [V, ...V[]]) => void): void;
}
export const ifNonEmpty: IfNonEmpty = (value: any, fn: (value: any) => void) => {
  if (Array.isArray(value) && value.length > 0) {
    fn(value);
  }
};
