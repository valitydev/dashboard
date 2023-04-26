import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { ConfigService } from '@dsh/app/config';
import { NotificationService } from '@dsh/app/shared';

@Component({
    templateUrl: 'api-keys.component.html',
    styleUrls: ['api-keys.component.scss'],
})
export class ApiKeysComponent {
    paymentsApiSpecEndpoint = this.configService.docsEndpoints.payments;
    keys$;
    isLoading$;

    constructor(
        private configService: ConfigService,
        private notificationService: NotificationService,
        private transloco: TranslocoService
    ) {}

    create() {
        throw new Error('Method not implemented.');
    }
}
