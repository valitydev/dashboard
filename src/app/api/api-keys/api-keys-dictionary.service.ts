import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { ApiKeyStatus } from '@vality/swag-api-keys-v2';

import { DictionaryService } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class ApiKeysDictionaryService {
    apiKeyStatus$ = this.dictionaryService.create<ApiKeyStatus>(() => ({
        active: this.t.translate('api-keys.ApiKeyStatus.active', null, 'dictionary'),
        revoked: this.t.translate('api-keys.ApiKeyStatus.revoked', null, 'dictionary'),
    }));

    constructor(
        private t: TranslocoService,
        private dictionaryService: DictionaryService,
    ) {}
}
