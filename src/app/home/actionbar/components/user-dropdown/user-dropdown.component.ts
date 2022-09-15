import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';

import { ContextService } from '@dsh/app/shared/services/context';
import { coerceBoolean } from '@dsh/utils';

import { KeycloakService } from '../../../../auth';
import { ROTATE } from './utils/rotate-animation';

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
    orgName$ = this.contextService.organization$.pipe(map(({ name }) => name));

    constructor(private contextService: ContextService, private keycloakService: KeycloakService) {}
}
