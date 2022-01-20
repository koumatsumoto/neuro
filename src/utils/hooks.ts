import { useEffect, useRef, useState } from 'react';
import { Observable } from 'rxjs';

interface UseSubscribe {
  <V>(observable: Observable<V>, { onSubscribe, initialValue }: { onSubscribe?: () => void; initialValue: undefined }): V | undefined;
  <V>(observable: Observable<V>, { onSubscribe, initialValue }: { onSubscribe?: () => void; initialValue: V }): V;
}

export const useSubscribe: UseSubscribe = <V>(observable: Observable<V>, { onSubscribe, initialValue }: { onSubscribe?: () => void; initialValue?: V } = {}) => {
  const $ = useRef(observable).current;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const subscription = $.subscribe(setValue);
    if (onSubscribe) {
      onSubscribe();
    }

    return () => subscription.unsubscribe();
  }, [$]);

  return value;
};
