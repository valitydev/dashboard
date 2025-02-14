import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from 'ng-flex-layout';

import { BootstrapIconModule } from '@dsh/components/indicators';

import { AccordionItemComponent, LazyPanelContentDirective } from './accordion-item';
import { AccordionItemContentComponent } from './accordion-item-content';
import { AccordionItemContentHeaderComponent } from './accordion-item-content-header';
import { AccordionComponent } from './accordion.component';

const EXPORTED_DECLARATIONS = [
    AccordionComponent,
    AccordionItemComponent,
    AccordionItemContentHeaderComponent,
    AccordionItemContentComponent,
    LazyPanelContentDirective,
];

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatDividerModule,
        BootstrapIconModule,
    ],
    declarations: [EXPORTED_DECLARATIONS],
    exports: [EXPORTED_DECLARATIONS],
})
export class AccordionModule {}
