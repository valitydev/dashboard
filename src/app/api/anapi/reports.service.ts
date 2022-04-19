import { Injectable } from '@angular/core';
import { ReportsService as ApiReportsService } from '@vality/swag-anapi-v2';

import { createApi, PartyIdExtension } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class ReportsService extends createApi(ApiReportsService, [PartyIdExtension]) {}
