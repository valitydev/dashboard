import { Injectable } from '@angular/core';
import { DownloadsService as ApiService } from '@vality/swag-wallets';

import { createApi } from '../utils';
import { PartyIdExtension } from '../utils/extensions';

@Injectable({
    providedIn: 'root',
})
export class DownloadsService extends createApi(ApiService, [PartyIdExtension]) {}
