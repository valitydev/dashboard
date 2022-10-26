import { Injectable } from '@angular/core';
import { ReportsService as ApiReportsService } from '@vality/swag-anapi-v2';

import { createApi } from '../utils';
import { PartyIdExtension } from '../utils/extensions';

@Injectable({
    providedIn: 'root',
})
export class ReportsService extends createApi(ApiReportsService, [PartyIdExtension]) {}
