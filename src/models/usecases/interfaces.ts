import { Observable } from 'rxjs';

// TODO(feat): support parameterized query ((...args: any[]) => Observable<any>)
export type Query<T extends any> = Observable<T>;
export type Command = Function;
export type UseCase = Query<any> | Command;

export interface UseCases {}
