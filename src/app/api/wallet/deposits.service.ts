import { Injectable } from '@angular/core';
import { DepositsService as ApiDepositsService } from '@vality/swag-wallet';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class DepositsService extends createApi(ApiDepositsService) {}
