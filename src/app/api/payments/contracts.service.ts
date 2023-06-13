import { Injectable } from '@angular/core';
import { ContractsService as ApiContractsService } from '@vality/swag-payments';

import { PartyIdExtension } from '@dsh/app/api/utils/extensions';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class ContractsService extends createApi(ApiContractsService, [PartyIdExtension]) {}
