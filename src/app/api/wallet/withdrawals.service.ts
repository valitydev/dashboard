import { Injectable } from '@angular/core';
import { WithdrawalsService as ApiWithdrawalsService } from '@vality/swag-wallet';

import { PartyIdExtension } from '@dsh/api/utils/extensions';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class WithdrawalsService extends createApi(ApiWithdrawalsService, [PartyIdExtension]) {}
