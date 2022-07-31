import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { map } from 'rxjs/operators';

import { shareReplayRefCount } from '@dsh/operators';

@Injectable({
    providedIn: 'root',
})
export class DictionaryService {
    readonly init$ = this.transloco.selectTranslation('dictionary');

    constructor(private readonly transloco: TranslocoService) {}

    create<T extends Record<string, string>>(getTranslations: () => T) {
        return this.init$.pipe(
            map(() => getTranslations()),
            shareReplayRefCount()
        );
    }
}
