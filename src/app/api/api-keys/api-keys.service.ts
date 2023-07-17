import { Injectable } from '@angular/core';
import { ApiKeysService as ApiService } from '@vality/swag-api-keys-v2';

import { createApi } from '../utils';
import { PartyIdExtension } from '../utils/extensions';

@Injectable({
    providedIn: 'root',
})
export class ApiKeysService extends createApi(ApiService, [PartyIdExtension]) {}
