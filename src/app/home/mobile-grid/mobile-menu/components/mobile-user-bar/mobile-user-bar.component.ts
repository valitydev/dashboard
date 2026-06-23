import { KeycloakService } from 'keycloak-angular';

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-mobile-user-bar',
    templateUrl: './mobile-user-bar.component.html',
    styleUrls: ['./mobile-user-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class MobileUserBarComponent {
    userName: string = this.keycloakService.getUsername();

    constructor(private keycloakService: KeycloakService) {}

    logout(): Promise<void> {
        return this.keycloakService.logout();
    }
}
