import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexModule } from 'ng-flex-layout';

import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { MaxLengthInputModule } from '@dsh/app/shared/components/inputs/max-length-input/max-length-input.module';

import { CancelHoldService } from './cancel-hold.service';
import { CancelHoldDialogComponent } from './components/cancel-hold-dialog/cancel-hold-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        BaseDialogModule,
        MaxLengthInputModule,
        ReactiveFormsModule,
        FlexModule,
        TranslocoModule,
        MatButtonModule,
    ],
    declarations: [CancelHoldDialogComponent],
    providers: [CancelHoldService],
})
export class CancelHoldModule {}
