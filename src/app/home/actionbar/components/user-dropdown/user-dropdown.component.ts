import { ChangeDetectionStrategy, Component, Input, booleanAttribute } from '@angular/core';
import { map } from 'rxjs/operators';

import { ContextOrganizationService } from '@dsh/app/shared/services';

import { KeycloakService } from '../../../../auth';

import { ROTATE } from './utils/rotate-animation';

@Component({
    selector: 'dsh-user-dropdown',
    templateUrl: 'user-dropdown.component.html',
    styleUrls: ['user-dropdown.component.scss'],
    animations: [ROTATE],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class UserDropdownComponent {
    @Input({ transform: booleanAttribute }) expanded = false;

    username = this.keycloakService.getUsername();
    orgName$ = this.contextOrganizationService.organization$.pipe(map(({ name }) => name));

    constructor(
        private contextOrganizationService: ContextOrganizationService,
        private keycloakService: KeycloakService,
    ) {}
}
