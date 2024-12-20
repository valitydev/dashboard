import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexModule } from 'ng-flex-layout';

import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { IndicatorsModule, SpinnerModule } from '@dsh/components/indicators';
import { ScrollUpModule } from '@dsh/components/navigation';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { DEPOSITS_UPDATE_DELAY, UPDATE_DELAY_TOKEN } from './consts';
import { DepositPanelsModule } from './deposit-panels';
import { DepositsFiltersModule } from './deposits-filters';
import { DepositsRoutingModule } from './deposits-routing.module';
import { DepositsComponent } from './deposits.component';

@NgModule({
    imports: [
        DepositsRoutingModule,
        TranslocoModule,
        FlexModule,
        DepositPanelsModule,
        ShowMorePanelModule,
        CommonModule,
        SpinnerModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatButtonModule,
        MatInputModule,
        IndicatorsModule,
        DepositsFiltersModule,
        ScrollUpModule,
    ],
    declarations: [DepositsComponent],
    providers: [
        { provide: SEARCH_LIMIT, useValue: 10 },
        { provide: UPDATE_DELAY_TOKEN, useValue: DEPOSITS_UPDATE_DELAY },
    ],
})
export class DepositsModule {}
