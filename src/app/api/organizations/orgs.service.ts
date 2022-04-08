import { Injectable } from '@angular/core';
import { OrgsService as ApiOrgsService } from '@vality/swag-organizations';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class OrgsService extends createApi(ApiOrgsService) {}
