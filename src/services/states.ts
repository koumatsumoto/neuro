import { useEffect, useMemo, useRef, useState } from 'react';
import { atom, useRecoilValue } from 'recoil';
import { AppStorage } from './AppStorage';
import { AppUseCases } from './AppUseCases';
import { Query, UseCases } from './interfaces';

const appUseCases = atom({
  key: 'atom/appUseCases',
  default: new AppUseCases(new AppStorage({ version: 'v2' })),
});

export const useAppUseCases = () => {
  return useRecoilValue(appUseCases);
};

interface UseQuery<U extends UseCases = UseCases> {
  <T>(selector: (usecases: U) => Query<T>, initialValue: undefined): T | undefined;
  <T>(selector: (usecases: U) => Query<T>, initialValue: T): T;
  <T>(selector: (usecases: U) => Query<T>, initialValue: T | undefined): T | undefined;
}

interface UseCommand<U extends UseCases = UseCases> {
  <T extends Function>(commandSelector: (usecases: U) => T): T;
}

export const useQuery: UseQuery<AppUseCases> = <T>(...args: [(usecases: AppUseCases) => Query<T>, T | undefined]) => {
  const usecases = useRecoilValue(appUseCases);
  const [selector, initialValue] = useRef(args).current;
  const query = useMemo(() => selector(usecases), [selector, usecases]);
  const [value, setValue] = useState<T | undefined>(initialValue);

  useEffect(() => {
    const subscription = query.subscribe((value) => setValue(value));

    return () => subscription.unsubscribe();
  }, [query]);

  return value;
};

export const useCommand: UseCommand<AppUseCases> = <C extends Function>(...args: [(usecases: AppUseCases) => C]): C => {
  const usecases = useRecoilValue(appUseCases);
  const [selector] = useRef(args).current;
  const command = useMemo(() => selector(usecases).bind(usecases), [selector, usecases]);

  return command;
};
