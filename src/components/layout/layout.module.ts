import { NgModule } from '@angular/core';

import { AccordionModule } from './accordion';
import { CardModule } from './card';
import { CollapseModule } from './collapse';
import { DetailsItemModule } from './details-item';
import { DropdownModule } from './dropdown';
import { LimitedListModule } from './limited-list';
import { LimitedPanelComponent } from './limited-panel/limited-panel.component';
import { LinkLabelModule } from './link-label';
import { PanelModule } from './panel';
import { RowModule } from './row';
import { SectionHeaderModule } from './section-header';

const EXPORTED_MODULES = [
    CardModule,
    DropdownModule,
    PanelModule,
    DetailsItemModule,
    RowModule,
    AccordionModule,
    LinkLabelModule,
    LimitedListModule,
    CollapseModule,
    SectionHeaderModule,
    LimitedPanelComponent,
];

@NgModule({
    imports: EXPORTED_MODULES,
    exports: EXPORTED_MODULES,
})
export class LayoutModule {}
