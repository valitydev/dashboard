import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-dropdown-content',
    template: `<ng-content></ng-content>`,
    styleUrls: ['dropdown-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class DropdownContentComponent {}
