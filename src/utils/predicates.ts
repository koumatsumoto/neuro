export const isNotNullish = <V>(value: V): value is NonNullable<V> => value !== null && value !== undefined;

export const isPlainObject = <A>(value: A): value is A & Record<any, any> => Boolean(value) && typeof value === 'object' && !Array.isArray(value);

export const isPromise = <A>(value: A): value is A & Promise<unknown> =>
  isPlainObject(value) && typeof value.then === 'function' && typeof value.catch === 'function' && typeof value.finally === 'function';
