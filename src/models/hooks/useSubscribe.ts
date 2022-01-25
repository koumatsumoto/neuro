import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

interface UseSubscribe {
  <A>(observable: Observable<A>, initialValue: undefined): A | undefined;
  <A>(observable: Observable<A>, initialValue: A): A;
  <A>(observable: Observable<A>, initialValue?: A): A | undefined;
}

export const useSubscribe: UseSubscribe = <A>(observable: Observable<A>, initialValue?: A) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const subscription = observable.subscribe(setValue);

    return () => subscription.unsubscribe();
  }, [observable]);

  return value;
};
