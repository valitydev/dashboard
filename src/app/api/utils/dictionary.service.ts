import { Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class DictionaryService {
    readonly init$ = this.transloco.selectTranslation('dictionary');

    constructor(private readonly transloco: TranslocoService) {}

    create<T extends PropertyKey>(
        getTranslations: () => Record<T, string>,
    ): Observable<Record<T, string>> {
        return this.init$.pipe(
            map(() => getTranslations()),
            shareReplay({ refCount: true, bufferSize: 1 }),
        );
    }
}
