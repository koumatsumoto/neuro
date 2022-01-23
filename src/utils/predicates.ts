export const isNotNullish = <V>(value: V): value is NonNullable<V> => value !== null && value !== undefined;
