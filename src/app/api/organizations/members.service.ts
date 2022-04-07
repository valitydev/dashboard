import { Injectable } from '@angular/core';
import { MembersService as ApiMembersService } from '@vality/swag-organizations';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class MembersService extends createApi(ApiMembersService) {}
