import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { DepositsService } from '@dsh/api';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { ButtonModule } from '@dsh/components/buttons';
import { RangeDatepickerModule } from '@dsh/components/form-controls';
import { IndicatorsModule, SpinnerModule } from '@dsh/components/indicators';
import { FloatPanelModule, JustifyWrapperModule } from '@dsh/components/layout';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { DEPOSITS_UPDATE_DELAY, UPDATE_DELAY_TOKEN } from './consts';
import { DepositPanelsModule } from './deposit-panels';
import { DepositsRoutingModule } from './deposits-routing.module';
import { DepositsComponent } from './deposits.component';
import { SearchFormComponent } from './search-form';

@NgModule({
    imports: [
        DepositsRoutingModule,
        TranslocoModule,
        FlexModule,
        DepositPanelsModule,
        ShowMorePanelModule,
        CommonModule,
        SpinnerModule,
        FloatPanelModule,
        JustifyWrapperModule,
        MatFormFieldModule,
        RangeDatepickerModule,
        ReactiveFormsModule,
        MatSelectModule,
        ButtonModule,
        MatInputModule,
        IndicatorsModule,
    ],
    declarations: [DepositsComponent, SearchFormComponent],
    providers: [
        DepositsService,
        { provide: SEARCH_LIMIT, useValue: 10 },
        { provide: UPDATE_DELAY_TOKEN, useValue: DEPOSITS_UPDATE_DELAY },
    ],
})
export class DepositsModule {}
