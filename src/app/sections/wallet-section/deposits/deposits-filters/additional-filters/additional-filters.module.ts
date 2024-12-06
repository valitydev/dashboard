import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexModule } from 'ng-flex-layout';

import { DialogModule } from '@dsh/app/shared/components/dialog';

import { DialogFiltersComponent } from './components/dialog-filters/dialog-filters.component';
import { DepositStatusFilterModule } from './deposit-status-filter';
import { DepositSumFilterModule } from './deposit-sum-filter';
import { MainInfoFiltersModule } from './main-info-filters';

@NgModule({
    declarations: [DialogFiltersComponent],
    imports: [
        DialogModule,
        FlexModule,
        MatDividerModule,
        MatButtonModule,
        TranslocoModule,
        MainInfoFiltersModule,
        DepositStatusFilterModule,
        DepositSumFilterModule,
        MatDialogModule,
    ],
})
export class AdditionalFiltersModule {}
