import { useEffect, useRef, useState } from 'react';
import { Observable } from 'rxjs';

interface UseSubscribe {
  <V>(observable: Observable<V>, params?: { initialValue: undefined; onSubscribe?: () => void; onNext?: (v: V) => void }): V | undefined;
  <V>(observable: Observable<V>, params?: { initialValue: V; onSubscribe?: () => void; onNext?: (v: V) => void }): V;
  <V>(observable: Observable<V>, params?: { initialValue?: V; onSubscribe?: () => void; onNext?: (v: V) => void }): V | undefined;
}

export const useSubscribe: UseSubscribe = <V>(
  observable: Observable<V>,
  { initialValue, onSubscribe, onNext }: { onSubscribe?: () => void; initialValue?: V; onNext?: (v: V) => void } = {},
) => {
  const $ = useRef(observable).current;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const subscription = $.subscribe((value) => {
      setValue(value);
      if (onNext) {
        onNext(value);
      }
    });
    if (onSubscribe) {
      onSubscribe();
    }

    return () => subscription.unsubscribe();
  }, [$]);

  return value;
};
