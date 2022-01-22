import { useEffect, useMemo, useRef, useState } from 'react';
import { atom, useRecoilValue } from 'recoil';
import { AppStorage } from './AppStorage';
import { AppUseCases } from './AppUseCases';
import { Query, UseCases } from './interfaces';

const appUseCases = atom({
  key: 'atom/appUseCases',
  default: new AppUseCases(new AppStorage()),
});

export const useAppUseCases = () => {
  return useRecoilValue(appUseCases);
};

interface UseQuery<U extends UseCases = UseCases> {
  <V>(querySelector: (usecases: U) => Query<V>, params?: { initial: undefined }): V | undefined;
  <V>(querySelector: (usecases: U) => Query<V>, params?: { initial: V }): V;
  <V>(querySelector: (usecases: U) => Query<V>, params?: { initial?: V }): V | undefined;
}

interface UseCommand<U extends UseCases = UseCases> {
  <T extends Function>(commandSelector: (usecases: U) => T): T;
}

export const useQuery: UseQuery<AppUseCases> = <T>(...args: [(usecases: AppUseCases) => Query<T>, { initial?: T } | undefined]) => {
  const [selector, params = {}] = useRef(args).current;
  const usecases = useRecoilValue(appUseCases);
  const query = useMemo(() => selector(usecases), [selector, usecases]);
  const [value, setValue] = useState<T | undefined>(params.initial);

  useEffect(() => {
    const subscription = query.subscribe((value) => setValue(value));

    return () => subscription.unsubscribe();
  }, [query]);

  return value;
};

export const useCommand: UseCommand<AppUseCases> = <C extends Function>(...args: [(usecases: AppUseCases) => C]): C => {
  const [selector] = useRef(args).current;
  const usecases = useRecoilValue(appUseCases);
  const command = useMemo(() => selector(usecases).bind(usecases), [selector, usecases]);

  return command;
};
