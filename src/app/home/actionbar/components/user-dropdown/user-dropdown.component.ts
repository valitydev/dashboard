import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';

import { ContextOrganizationService } from '@dsh/app/shared/services';
import { coerceBoolean } from 'coerce-property';

import { ROTATE } from './utils/rotate-animation';
import { KeycloakService } from '../../../../auth';

@Component({
    selector: 'dsh-user-dropdown',
    templateUrl: 'user-dropdown.component.html',
    styleUrls: ['user-dropdown.component.scss'],
    animations: [ROTATE],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDropdownComponent {
    @Input() @coerceBoolean expanded = false;

    username = this.keycloakService.getUsername();
    orgName$ = this.contextOrganizationService.organization$.pipe(map(({ name }) => name));

    constructor(
        private contextOrganizationService: ContextOrganizationService,
        private keycloakService: KeycloakService
    ) {}
}
