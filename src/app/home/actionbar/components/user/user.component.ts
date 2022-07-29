import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { map } from 'rxjs/operators';

import { KeycloakService } from '../../../../auth';
import { ConfigService } from '../../../../config';

@Component({
    selector: 'dsh-user',
    templateUrl: 'user.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
    @Output() selected = new EventEmitter<void>();

    username = this.keycloakService.getUsername();
    keycloakAccountEndpoint = `${this.config.keycloakEndpoint}/auth/realms/external/account/`;
    userLinksConfig$ = this.transloco.selectTranslation('components').pipe(
        map(() => [
            {
                title: this.transloco.translate('actionbar.user.changePassword', {}, 'components'),
                href: `${this.keycloakAccountEndpoint}/password`,
            },
            {
                title: this.transloco.translate('actionbar.user.sessions', {}, 'components'),
                href: `${this.keycloakAccountEndpoint}/sessions`,
            },
            {
                title: this.transloco.translate('actionbar.user.twoFactorAuth', {}, 'components'),
                href: `${this.keycloakAccountEndpoint}/totp`,
            },
        ])
    );

    constructor(
        private keycloakService: KeycloakService,
        private config: ConfigService,
        private transloco: TranslocoService
    ) {}

    openBlank(href: string): void {
        window.open(href, '_blank');
    }

    async logout(): Promise<void> {
        await this.keycloakService.logout();
    }
}
