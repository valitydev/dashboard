import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';

import { CancelHoldModule } from './cancel-hold';
import { CreateHoldModule } from './create-hold';
import { HoldDetailsComponent } from './hold-details.component';
import { HoldActivePipe } from './pipes/hold-active/hold-active.pipe';
import { HumanizeDurationModule } from '../../../../../../../humanize-duration';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        HumanizeDurationModule,
        CreateHoldModule,
        CancelHoldModule,
        ButtonModule,
        TranslocoModule,
    ],
    declarations: [HoldDetailsComponent, HoldActivePipe],
    exports: [HoldDetailsComponent],
})
export class HoldDetailsModule {}
