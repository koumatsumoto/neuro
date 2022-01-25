import { useCallback, useMemo } from 'react';
import { atom, useRecoilValue } from 'recoil';
import { Subject } from 'rxjs';
import { isPromise } from '../predicates';
import { UseCaseCommand } from './interfaces';
import { useSubscribe } from './useSubscribe';

class CommandIdController {
  #idMap = new WeakMap<Function, number>();
  #data = { lastId: 0 }; // use object to avoid error from recoil, Cannot assign to read only property of

  getId = (fn: Function) => {
    const id = this.#idMap.get(fn);
    if (id) {
      return id;
    } else {
      const newId = this.#incrementId();
      this.#idMap.set(fn, newId);
      return newId;
    }
  };

  #incrementId = () => {
    return ++this.#data.lastId;
  };
}

const commandIdCtrlAtom = atom({
  key: 'atoms/useCommand/commandIdCtrlAtom',
  default: new CommandIdController(),
});

const useUniqueFunctionId = (fn: Function) => {
  const ctrl = useRecoilValue(commandIdCtrlAtom);

  return ctrl.getId(fn);
};

type CommandResult<ResultValue> = {
  command: number;
  type: 'init' | 'start' | 'complete' | 'error';
  result?: ResultValue;
  error?: unknown;
  time: number;
};

// const [command, commandResult] = useCommand(usecases.someCommand);
export const useCommand = <P extends any[], R>(command: UseCaseCommand<P, R | Promise<R>>): readonly [(...params: P) => void, CommandResult<R>] => {
  const id = useUniqueFunctionId(command);
  const subject = useMemo(() => new Subject<CommandResult<R>>(), []);

  const fn = useCallback(
    (...args: P) => {
      subject.next({ command: id, type: 'start', time: Date.now() });
      try {
        const result = command(...args);
        if (isPromise(result)) {
          result
            .then((value) => subject.next({ command: id, type: 'complete', time: Date.now(), result: value }))
            .catch((error) => subject.next({ command: id, type: 'error', time: Date.now(), error }));
        } else {
          subject.next({ command: id, type: 'complete', time: Date.now(), result });
        }
      } catch (error) {
        subject.next({ command: id, type: 'error', time: Date.now(), error });
      }
    },
    [command, subject, id],
  );

  const result = useSubscribe(subject, { command: id, type: 'init', time: Date.now() });

  return [fn, result] as const;
};
