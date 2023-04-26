import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { map } from 'rxjs';

import { ApiKeysService } from '@dsh/api/api-keys';
import { ConfigService } from '@dsh/app/config';
import { NotificationService } from '@dsh/app/shared';

@Component({
    templateUrl: 'api-keys.component.html',
    styleUrls: ['api-keys.component.scss'],
})
export class ApiKeysComponent {
    paymentsApiSpecEndpoint = this.configService.docsEndpoints.payments;
    apiKeys$ = this.apiKeysService.listApiKeys().pipe(map((r) => r.results));
    isLoading$;

    constructor(
        private configService: ConfigService,
        private notificationService: NotificationService,
        private transloco: TranslocoService,
        private apiKeysService: ApiKeysService
    ) {}

    create() {
        throw new Error('Method not implemented.');
    }
}
