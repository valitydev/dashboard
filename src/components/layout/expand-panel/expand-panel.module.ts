import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '../../buttons';
import { ResizedModule } from '../../indicators';
import { CardModule } from '../card';
import { ExpandPanelAccordionComponent } from './expand-panel-accordion.component';
import { ExpandPanelMoreHeaderTemplateComponent, ExpandPanelMoreTemplateComponent } from './expand-panel-more';
import { ExpandPanelComponent } from './expand-panel.component';

const EXPORTED_DECLARATIONS = [
    ExpandPanelComponent,
    ExpandPanelMoreTemplateComponent,
    ExpandPanelMoreHeaderTemplateComponent,
    ExpandPanelAccordionComponent
];

@NgModule({
    imports: [MatIconModule, FlexLayoutModule, CommonModule, ButtonModule, ResizedModule, CardModule, TranslocoModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS
})
export class ExpandPanelModule {}