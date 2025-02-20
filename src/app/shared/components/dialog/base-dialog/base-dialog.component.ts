import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';

// TODO: add unit test for template with new ng-content
@Component({
    selector: 'dsh-base-dialog',
    templateUrl: 'base-dialog.component.html',
    styleUrls: ['base-dialog.component.scss'],
    standalone: false,
})
export class BaseDialogComponent {
    @Input() title: string;
    @Input() subtitle: string;
    @Input({ transform: booleanAttribute }) disabled: boolean;
    @Input({ transform: booleanAttribute }) hasDivider = true;
    @Input({ transform: booleanAttribute }) noActions = false;

    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() cancel = new EventEmitter<void>();

    cancelDialog(): void {
        if (!this.disabled) {
            this.cancel.emit();
        }
    }
}
