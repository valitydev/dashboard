import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { HumanizeDurationModule } from '../../../../../../../humanize-duration';

import { CancelHoldModule } from './cancel-hold';
import { CreateHoldModule } from './create-hold';
import { HoldDetailsComponent } from './hold-details.component';
import { HoldActivePipe } from './pipes/hold-active/hold-active.pipe';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        HumanizeDurationModule,
        CreateHoldModule,
        CancelHoldModule,
        MatButtonModule,
        TranslocoModule,
    ],
    declarations: [HoldDetailsComponent, HoldActivePipe],
    exports: [HoldDetailsComponent],
})
export class HoldDetailsModule {}
