import { useMemo } from 'react';
import { UseCaseQuery } from './interfaces';
import { useSubscribe } from './useSubscribe';

interface UseQuery {
  <T>(query: UseCaseQuery<T>, initialValue: undefined): T | undefined;
  <T>(query: UseCaseQuery<T>, initialValue: T): T;
  <T>(query: UseCaseQuery<T>, initialValue: T | undefined): T | undefined;
}

export const useQuery: UseQuery = <T>(query: UseCaseQuery<T>, initialValue?: T) => {
  const observable = useMemo(query, [query]);

  return useSubscribe(observable, initialValue);
};
