import { FlexLayoutModule } from 'ng-flex-layout';

import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { TranslocoModule } from '@jsverse/transloco';

import { ConfirmActionDialogComponent } from './confirm-action-dialog.component';

@NgModule({
    imports: [TranslocoModule, MatButtonModule, FlexLayoutModule, BaseDialogModule],
    declarations: [ConfirmActionDialogComponent],
    exports: [ConfirmActionDialogComponent],
})
export class ConfirmActionDialogModule {}
