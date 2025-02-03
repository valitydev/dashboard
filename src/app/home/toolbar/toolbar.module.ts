import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from 'ng-flex-layout';

import { SectionsLinksModule } from '@dsh/app/shared/services/sections-links';

import { ActionbarModule } from '../actionbar';

import { ToolbarComponent } from './toolbar.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        ActionbarModule,
        RouterModule,
        MatTabsModule,
        SectionsLinksModule,
    ],
    declarations: [ToolbarComponent],
    exports: [ToolbarComponent],
})
export class ToolbarModule {}
