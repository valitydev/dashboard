import { Injectable } from '@angular/core';
import { WithdrawalsService as ApiWithdrawalsService } from '@vality/swag-wallet';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class WithdrawalsService extends createApi(ApiWithdrawalsService) {}
