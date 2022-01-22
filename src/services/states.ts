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

export const useQuery: UseQuery = <T>(...args: [(usecases: UseCases) => Query<T>, { initial?: T } | undefined]) => {
  const [selector, params = {}] = useRef(args).current;
  const usecases = useRecoilValue(appUseCases);
  const observable = useMemo(() => selector(usecases), [selector, usecases]);
  const [value, setValue] = useState<T | undefined>(params.initial);

  useEffect(() => {
    const subscription = observable.subscribe((value) => setValue(value));

    return () => subscription.unsubscribe();
  }, [observable]);

  return value;
};

export const useAppQuery = useQuery as UseQuery<AppUseCases>;
