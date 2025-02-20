import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from '@vality/matez';
import { FlexLayoutModule } from 'ng-flex-layout';

import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { IndicatorsModule } from '@dsh/components/indicators';
import { AccordionModule, CardModule, RowModule } from '@dsh/components/layout';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { AccordionTableComponent } from './accordion-table.component';

@NgModule({
    declarations: [AccordionTableComponent],
    imports: [
        CommonModule,
        EmptySearchResultModule,
        ShowMorePanelModule,
        IndicatorsModule,
        RowModule,
        AccordionModule,
        CardModule,
        FlexLayoutModule,
        PipesModule,
    ],
    exports: [AccordionTableComponent],
})
export class AccordionTableModule {}
