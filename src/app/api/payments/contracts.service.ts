import { Injectable } from '@angular/core';
import { ContractsService as ApiContractsService } from '@vality/swag-payments';

import { PartyIdExtension } from '@dsh/api/utils/extensions';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class ContractsService extends createApi(ApiContractsService, [PartyIdExtension]) {}
