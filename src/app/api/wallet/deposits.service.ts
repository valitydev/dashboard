import { Injectable } from '@angular/core';
import { PartyIdExtension } from '@dsh/app/api/utils/extensions';

import { DepositsService as ApiDepositsService } from '@vality/swag-wallets';


import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class DepositsService extends createApi(ApiDepositsService, [PartyIdExtension]) {}
