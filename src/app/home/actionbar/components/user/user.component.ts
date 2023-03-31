import { ChangeDetectionStrategy, Component, EventEmitter, Output, Inject } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Organization } from '@vality/swag-organizations';
import { map, filter } from 'rxjs/operators';

import { DIALOG_CONFIG, DialogConfig } from '@dsh/app/sections/tokens';
import { ContextOrganizationService } from '@dsh/app/shared';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';

import { KeycloakService } from '../../../../auth';
import { ConfigService } from '../../../../config';
import { SelectActiveOrganizationDialogComponent } from '../select-active-organization-dialog/select-active-organization-dialog.component';

@Component({
    selector: 'dsh-user',
    templateUrl: 'user.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
    @Output() selected = new EventEmitter<void>();

    username = this.keycloakService.getUsername();
    activeOrg$ = this.contextOrganizationService.organization$;
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
        private contextOrganizationService: ContextOrganizationService,
        private router: Router,
        private dialog: MatDialog,
        private transloco: TranslocoService,
        @Inject(DIALOG_CONFIG) private dialogConfig: DialogConfig
    ) {}

    openBlank(href: string): void {
        window.open(href, '_blank');
    }

    async logout(): Promise<void> {
        await this.keycloakService.logout();
    }

    selectActiveOrg(): void {
        this.selected.emit();
        this.dialog
            .open<SelectActiveOrganizationDialogComponent, void, BaseDialogResponseStatus | Organization>(
                SelectActiveOrganizationDialogComponent,
                this.dialogConfig.medium
            )
            .afterClosed()
            .pipe(filter((res) => !Object.values(BaseDialogResponseStatus).includes(res as BaseDialogResponseStatus)))
            .subscribe((org: Organization) => {
                this.contextOrganizationService.switchOrganization(org.id);
            });
    }

    openOrgList(): void {
        void this.router.navigate(['organization-section', 'organizations']);
        this.selected.emit();
    }

    toActiveOrg(activeOrg: string): void {
        void this.router.navigate(['organization-section', 'organizations'], { fragment: activeOrg });
        this.selected.emit();
    }
}
