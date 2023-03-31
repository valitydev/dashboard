import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Observable } from 'rxjs';

import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';

import { CreateHoldDialogComponent } from './components/create-hold-dialog/create-hold-dialog.component';
import { CreateHoldDialogData } from './types/create-hold-dialog-data';

@Injectable()
export class CreateHoldService {
    constructor(private dialog: MatDialog) {}

    openDialog(data: CreateHoldDialogData): Observable<BaseDialogResponseStatus> {
        return this.dialog
            .open<CreateHoldDialogComponent, CreateHoldDialogData>(CreateHoldDialogComponent, { data })
            .afterClosed();
    }
}
