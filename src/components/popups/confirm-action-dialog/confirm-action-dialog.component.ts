import { Component } from '@angular/core';
import { DialogSuperclass } from '@vality/ng-core';

@Component({
    templateUrl: 'confirm-action-dialog.component.html',
    styleUrls: ['confirm-action-dialog.component.scss'],
})
export class ConfirmActionDialogComponent extends DialogSuperclass<ConfirmActionDialogComponent> {
    cancel() {
        this.closeWithCancellation();
    }

    confirm() {
        this.closeWithSuccess();
    }
}
