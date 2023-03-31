import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { TranslocoModule } from '@ngneat/transloco';

import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { ButtonModule } from '@dsh/components/buttons';
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
        ButtonModule,
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
