import { Component } from '@angular/core';
import { DialogSuperclass } from '@vality/matez';

@Component({
    templateUrl: 'confirm-action-dialog.component.html',
    styleUrls: ['confirm-action-dialog.component.scss'],
    standalone: false,
})
export class ConfirmActionDialogComponent extends DialogSuperclass<ConfirmActionDialogComponent> {
    cancel() {
        this.closeWithCancellation();
    }

    confirm() {
        this.closeWithSuccess();
    }
}
