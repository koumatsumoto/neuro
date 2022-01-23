import { useEffect, useState } from 'react';
import { UseCaseQuery } from '../usecases';

interface UseQuery {
  <T>(query: UseCaseQuery<T>, initialValue: undefined): T | undefined;
  <T>(query: UseCaseQuery<T>, initialValue: T): T;
  <T>(query: UseCaseQuery<T>, initialValue: T | undefined): T | undefined;
}

export const useQuery: UseQuery = <T>(query: UseCaseQuery<T>, initialValue?: T) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const subscription = query().subscribe((value) => setValue(value));

    return () => subscription.unsubscribe();
  }, [query]);

  return value;
};
