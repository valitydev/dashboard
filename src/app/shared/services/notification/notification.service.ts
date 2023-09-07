import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { NotifyLogService } from '@vality/ng-core';
import { Observable } from 'rxjs';

@Injectable()
/**
 * @deprecated
 */
export class NotificationService {
    constructor(
        private log: NotifyLogService,
        private transloco: TranslocoService,
    ) {}

    success(
        message: string | Observable<string> = this.transloco.selectTranslate(
            'notification.success',
            null,
            'services',
        ),
    ) {
        this.log.success(message);
    }
}
