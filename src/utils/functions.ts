export const isNonNullable = <V>(value: V): value is NonNullable<V> => value !== null && value !== undefined;
export const ifNonNullable = <T>(value: T, fn: (value: NonNullable<T>) => void) => {
  if (isNonNullable(value)) {
    fn(value);
  }
};

interface IfNonEmpty {
  <V extends string>(value: V, fn: (value: V) => void): void;
  <V, A extends Array<V>>(value: A, fn: (value: [V, ...V[]]) => void): void;
}
export const ifNonEmpty: IfNonEmpty = (value: any, fn: (value: any) => void) => {
  if (Array.isArray(value) && value.length > 0) {
    fn(value);
  } else if (typeof value === 'string' && value !== '') {
    fn(value);
  }
};

export const noop = (...args: unknown[]) => {};

export const debug = (label: string, fn: (...args: unknown[]) => unknown) => {
  try {
    console.log(`[debug] ${label}`, fn());
  } catch (e) {
    console.error(`[debug] ${label}`, e);
  }
};
