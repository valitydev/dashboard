import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Observable } from 'rxjs';

import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';

import { CancelHoldDialogComponent } from './components/cancel-hold-dialog/cancel-hold-dialog.component';
import { CancelHoldDialogData } from './types/cancel-hold-dialog-data';

@Injectable()
export class CancelHoldService {
    constructor(private dialog: MatDialog) {}

    openDialog(data: CancelHoldDialogData): Observable<BaseDialogResponseStatus> {
        return this.dialog
            .open<CancelHoldDialogComponent, CancelHoldDialogData>(CancelHoldDialogComponent, {
                data,
            })
            .afterClosed();
    }
}
