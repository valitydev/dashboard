import { Injectable } from '@angular/core';
import { InvitationsService as ApiInvitationsService } from '@vality/swag-organizations';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class InvitationsService extends createApi(ApiInvitationsService) {}
