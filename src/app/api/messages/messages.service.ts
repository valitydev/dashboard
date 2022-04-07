import { Injectable } from '@angular/core';
import { ConversationsService as ApiConversationsService } from '@vality/swag-messages';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class MessagesService extends createApi(ApiConversationsService) {}
