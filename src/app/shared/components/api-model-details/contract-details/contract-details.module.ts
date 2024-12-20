import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { LayoutModule } from '@dsh/components/layout';

import { ContractorDetailsModule } from '../contractor-details';

import { ContractDetailsComponent } from './contract-details.component';

@NgModule({
    imports: [
        FlexLayoutModule,
        TranslocoModule,
        CommonModule,
        MatDividerModule,
        ContractorDetailsModule,
        LayoutModule,
    ],
    declarations: [ContractDetailsComponent],
    exports: [ContractDetailsComponent],
})
export class ContractDetailsModule {}
