import { useEffect } from 'react';

export const useDebug = (value: unknown, label?: string) => {
  useEffect(() => console.log(`[debug]${label ? ` ${label}` : ''}:`, value), [value, label]);
};
