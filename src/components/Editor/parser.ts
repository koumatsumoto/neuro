import { parseIndent, threewiseMap } from './functions';

export type Line = {
  readonly index: number;
  readonly indent: number;
  readonly text: string;
  readonly empty: boolean;
  readonly isFirst: boolean;
  readonly isLast: boolean;
};

export const parseText = (text: string): Line[] => {
  return threewiseMap(text.split('\n'), ([prev, curr, next], index) => {
    const { text, indent, empty } = parseIndent(curr);
    const isFirst = prev === undefined;
    const isLast = next === undefined;
    const indentDown = isFirst ? false : indent < prev.indent;

    return {
      index,
      indent,
      text,
      empty,
      isFirst,
      isLast,
    } as const;
  });
};
