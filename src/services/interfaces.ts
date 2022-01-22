import { Observable } from 'rxjs';

type Query = Observable<any> | ((...args: any[]) => Observable<any>);
type Command = (...args: any[]) => void;

// UseCase is consists of Queries and Commands
interface UseCases {
  [method: string]: Query | Command;
}
