import { Observable } from 'rxjs';

// Class methods of UseCases
export interface UseCaseQuery<Data> {
  (): Observable<Data>;
}

// Class methods of UseCases
export interface UseCaseCommand<Params extends unknown[], ReturnValue> {
  (...args: Params): ReturnValue;
}

// UseCases class should have only UseCaseQuery and UseCaseCommand methods
export interface UseCases {}
