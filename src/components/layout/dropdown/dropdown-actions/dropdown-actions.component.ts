import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-dropdown-actions',
    template: `<ng-content></ng-content>`,
    styleUrls: ['dropdown-actions.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class DropdownActionsComponent {}
