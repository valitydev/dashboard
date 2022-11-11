import { Injectable } from '@angular/core';
import { AnalyticsService as ApiAnalyticsService } from '@vality/swag-anapi-v2';

import { createApi } from '../utils';
import { PartyIdExtension } from '../utils/extensions';

@Injectable({
    providedIn: 'root',
})
export class AnalyticsService extends createApi(ApiAnalyticsService, [PartyIdExtension]) {}
