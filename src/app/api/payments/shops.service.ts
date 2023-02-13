import { Injectable } from '@angular/core';
import { ShopsService as ApiShopsService } from '@vality/swag-payments';

import { createApi } from '../utils';
import { PartyIdExtension } from '../utils/extensions';

/**
 * Use only "SomeForParty" methods
 */
@Injectable({
    providedIn: 'root',
})
export class ShopsService extends createApi(ApiShopsService, [PartyIdExtension]) {}
