import { Injectable } from '@angular/core';
import { PartyIdExtension } from '@dsh/app/api/utils/extensions';

import { ReportsService as ApiService } from '@vality/swag-wallets';


import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class ReportsService extends createApi(ApiService, [PartyIdExtension]) {}
