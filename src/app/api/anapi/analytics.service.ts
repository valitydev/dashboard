import { Injectable, Injector } from '@angular/core';
import { AnalyticsService as ApiAnalyticsService } from '@vality/swag-anapi-v2';

import { IdGeneratorService } from '@dsh/app/shared';

import { createApi, PartyIdExtension } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class AnalyticsService extends createApi(ApiAnalyticsService, [PartyIdExtension]) {
    constructor(injector: Injector, _idGeneratorService: IdGeneratorService) {
        super(injector);
    }
}
