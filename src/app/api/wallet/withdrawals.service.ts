import { Injectable } from '@angular/core';
import { PartyIdExtension } from '@dsh/app/api/utils/extensions';

import { WithdrawalsService as ApiWithdrawalsService } from '@vality/swag-wallets';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class WithdrawalsService extends createApi(ApiWithdrawalsService, [PartyIdExtension]) {}
