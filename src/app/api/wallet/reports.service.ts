import { Injectable } from '@angular/core';
import { ReportsService as ApiService } from '@vality/swag-wallets';

import { PartyIdExtension } from '@dsh/app/api/utils/extensions';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class ReportsService extends createApi(ApiService, [PartyIdExtension]) {}
