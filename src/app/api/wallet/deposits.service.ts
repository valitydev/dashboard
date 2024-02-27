import { Injectable } from '@angular/core';
import { DepositsService as ApiDepositsService } from '@vality/swag-wallet';

import { PartyIdExtension } from '@dsh/app/api/utils/extensions';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class DepositsService extends createApi(ApiDepositsService, [PartyIdExtension]) {}
