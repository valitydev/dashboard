import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
    selector: 'dsh-mobile-user-bar',
    templateUrl: './mobile-user-bar.component.html',
    styleUrls: ['./mobile-user-bar.component.scss'],
    standalone: false,
})
export class MobileUserBarComponent {
    userName: string = this.keycloakService.getUsername();

    constructor(private keycloakService: KeycloakService) {}

    logout(): Promise<void> {
        return this.keycloakService.logout();
    }
}
