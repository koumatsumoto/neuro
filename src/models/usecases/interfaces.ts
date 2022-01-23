import { Observable } from 'rxjs';

export interface UseCaseQuery<T> {
  (): Observable<T>;
}

export interface UseCases {}
