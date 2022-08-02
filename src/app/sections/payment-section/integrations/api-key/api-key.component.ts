import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { KeycloakService } from 'keycloak-angular';
import { from } from 'rxjs';

import { NotificationService } from '@dsh/app/shared';

import { ConfigService } from '../../../../config';

@Component({
    templateUrl: 'api-key.component.html',
    styleUrls: ['api-key.component.scss'],
})
export class ApiKeyComponent {
    token$ = from(this.keycloakService.getToken());
    paymentsApiSpecEndpoint = this.configService.docsEndpoints.payments;

    constructor(
        private keycloakService: KeycloakService,
        private configService: ConfigService,
        private notificationService: NotificationService,
        private transloco: TranslocoService
    ) {}

    copied(isCopied: boolean): void {
        if (isCopied) this.notificationService.success(this.transloco.translate('copied'));
        else this.notificationService.success(this.transloco.translate('copyFailed'));
    }
}
