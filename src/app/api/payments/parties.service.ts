import { Injectable } from '@angular/core';
import { PartiesService as ApiPartiesService } from '@vality/swag-payments';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class PartiesService extends createApi(ApiPartiesService) {}
