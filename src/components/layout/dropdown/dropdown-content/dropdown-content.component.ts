import { Component } from '@angular/core';

@Component({
    selector: 'dsh-dropdown-content',
    template: `<ng-content></ng-content>`,
    styleUrls: ['dropdown-content.component.scss'],
    standalone: false
})
export class DropdownContentComponent {}
