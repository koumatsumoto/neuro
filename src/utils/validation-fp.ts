import { sequenceT } from 'fp-ts/Apply';
import { fromPredicate, getApplicativeValidation, getOrElse, map } from 'fp-ts/Either';
import { Predicate } from 'fp-ts/Predicate';
import { getSemigroup } from 'fp-ts/ReadonlyNonEmptyArray';
import { pipe } from 'fp-ts/function';

const applicativeValidation = getApplicativeValidation(getSemigroup<string>());
const sequenceValidations = sequenceT(applicativeValidation);

// function for application layer not to expose fp-ts interfaces
export const getValidation = <T>(record: Record<string, Predicate<T>>) => {
  // TODO(fix): handle empty object

  return (value: T): [error: string] | null =>
    pipe(
      sequenceValidations(
        ...(Object.entries(record)
          .map(([error, predicate]) => fromPredicate(predicate, () => [error] as const))
          .map((v) => v(value)) as any),
      ),
      map(() => null),
      getOrElse((error) => error as [string] | null),
    );
};
