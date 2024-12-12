import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { MaxLengthInputModule } from '@dsh/app/shared/components/inputs/max-length-input/max-length-input.module';

import { CreateHoldDialogComponent } from './components/create-hold-dialog/create-hold-dialog.component';
import { CreateHoldService } from './create-hold.service';

@NgModule({
    imports: [
        CommonModule,
        BaseDialogModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        TranslocoModule,
        MatCheckboxModule,
        MaxLengthInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
    ],
    declarations: [CreateHoldDialogComponent],
    providers: [CreateHoldService],
})
export class CreateHoldModule {}
