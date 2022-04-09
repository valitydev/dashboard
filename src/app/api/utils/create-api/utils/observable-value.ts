import { Observable } from 'rxjs';

export type ObservableValue<O> = O extends Observable<infer T> ? T : O;
