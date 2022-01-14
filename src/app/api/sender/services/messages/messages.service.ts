import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IdGeneratorService } from '@dsh/app/shared';

import { MessagesService as ApiMessagesService } from '../../../../api-codegen/sender';

@Injectable()
export class MessagesService {
    constructor(private messagesService: ApiMessagesService, private idGeneratorService: IdGeneratorService) {}

    sendFeedbackEmailMsg(text: string): Observable<any> {
        return this.messagesService.sendFeedbackEmailMsg(this.idGeneratorService.shortUuid(), { text });
    }
}
