import { pipe } from 'rxjs';
import { filter } from 'rxjs/operators';
import { isNotNullish } from './predicates';

export const filterNullish = pipe(filter(isNotNullish));
