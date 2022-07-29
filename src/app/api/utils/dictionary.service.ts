import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
    providedIn: 'root',
})
export class DictionaryService {
    readonly init$ = this.transloco.selectTranslation('dictionary');

    constructor(private readonly transloco: TranslocoService) {}
}
