import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { DictionaryService } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class DarkApiDictionaryService {
    refundStatus$ = this.dictionaryService.create(() => ({
        pending: this.t.translate('darkApi.refundStatus.pending', null, 'dictionary'),
        succeeded: this.t.translate('darkApi.refundStatus.succeeded', null, 'dictionary'),
        failed: this.t.translate('darkApi.refundStatus.failed', null, 'dictionary'),
    }));

    constructor(private t: TranslocoService, private dictionaryService: DictionaryService) {}
}
