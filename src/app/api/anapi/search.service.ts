import { Injectable } from '@angular/core';
import { SearchService as ApiSearchService } from '@vality/swag-anapi-v2';

import { createApi, PartyIdExtension } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class SearchService extends createApi(ApiSearchService, [PartyIdExtension]) {}
