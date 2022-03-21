type ThreewiseMapValue<T, U> =
  // first
  | [previousValue: undefined, currentValue: T, nextValue: T | undefined]
  // mid
  | [previousValue: U, currentValue: T, nextValue: T | undefined]
  // last
  | [previousValue: U, currentValue: T, nextValue: undefined];

export const threewiseMap = <T, U>(array: T[], fn: (values: ThreewiseMapValue<T, U>, index: number) => U): U[] => {
  const mapped: U[] = [];

  for (let i = 0; i < array.length; i++) {
    const prev = mapped[i - 1];
    const curr = array[i];
    const next = array[i + 1];

    mapped.push(fn([prev, curr, next], i));
  }

  return mapped;
};

export const parseIndent = (text: string) => {
  const withoutIndent = text.trimStart();
  const removedIndentCount = text.length - withoutIndent.length; // NOTE: The length of whitespaces matches actual length of String
  const empty = withoutIndent.trimEnd() === '';

  return { text: withoutIndent, indent: removedIndentCount, empty };
};
