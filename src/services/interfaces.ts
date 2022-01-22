import { Observable } from 'rxjs';

// TODO(feat): support parameterized query ((...args: any[]) => Observable<any>)
export type Query<T extends any> = Observable<T>;
export type Command<Params extends any[]> = (...args: Params) => void | Promise<void>;

export type UseCase = Query<any> | Command<any[]>;

export interface UseCases {}
