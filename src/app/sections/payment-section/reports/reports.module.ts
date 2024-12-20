import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';
import { ScrollUpModule } from '@dsh/components/navigation';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { CreateReportModule } from './create-report';
import { ReportsListModule } from './reports-list';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsSearchFiltersModule } from './reports-search-filters';
import { ReportsComponent } from './reports.component';

@NgModule({
    imports: [
        TranslocoModule,
        ReportsRoutingModule,
        LayoutModule,
        MatButtonModule,
        FlexLayoutModule,
        CommonModule,
        IndicatorsModule,
        MatSnackBarModule,
        EmptySearchResultModule,
        ReportsListModule,
        ScrollUpModule,
        ReportsSearchFiltersModule,
        CreateReportModule,
        ShowMorePanelModule,
    ],
    declarations: [ReportsComponent],
})
export class ReportsModule {}
