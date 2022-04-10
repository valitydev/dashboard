import { Injectable } from '@angular/core';
import { AnalyticsService as ApiAnalyticsService } from '@vality/swag-anapi-v2';

import { createApi, PartyIdExtension } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class AnalyticsService extends createApi(ApiAnalyticsService, [PartyIdExtension]) {}
