import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { ActionsModule } from '@dsh/app/shared/components/actions';
import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { FilterDialogComponent } from '@dsh/components/filter/components/filter-dialog/filter-dialog.component';
import { DropdownModule } from '@dsh/components/layout';

import { FilterButtonComponent } from './components/filter-button/filter-button.component';
import { FilterContentComponent } from './components/filter-content/filter-content.component';
import { FilterComponent } from './filter.component';
import { ListLabelPipe } from './pipes/list-label/list-label.pipe';

@NgModule({
    imports: [
        CommonModule,
        DropdownModule,
        FlexLayoutModule,
        MatDividerModule,
        TranslocoModule,
        MatButtonModule,
        ActionsModule,
        BaseDialogModule,
    ],
    declarations: [
        FilterComponent,
        FilterButtonComponent,
        FilterContentComponent,
        ListLabelPipe,
        FilterDialogComponent,
    ],
    exports: [FilterComponent, ListLabelPipe, FilterButtonComponent],
})
export class FilterModule {}
