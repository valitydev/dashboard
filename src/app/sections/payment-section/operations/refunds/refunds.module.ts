import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { FormControlsModule } from '@dsh/components/form-controls';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';
import { StateNavModule } from '@dsh/components/navigation';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { RefundsListModule } from './refunds-list';
import { RefundsRoutingModule } from './refunds-routing.module';
import { RefundsSearchFiltersModule } from './refunds-search-filters';
import { RefundsComponent } from './refunds.component';

@NgModule({
    imports: [
        CommonModule,
        RefundsRoutingModule,
        LayoutModule,
        FlexLayoutModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        MatSelectModule,
        FormControlsModule,
        IndicatorsModule,
        MatSnackBarModule,
        TranslocoModule,
        StateNavModule,
        MatMenuModule,
        EmptySearchResultModule,
        RefundsListModule,
        RefundsSearchFiltersModule,
        ShowMorePanelModule,
        MatDialogModule,
    ],
    declarations: [RefundsComponent],
})
export class RefundsModule {}
