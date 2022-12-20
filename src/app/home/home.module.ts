import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { LaptopGridModule } from './laptop-grid/laptop-grid.module';
import { MobileGridModule } from './mobile-grid/mobile-grid.module';
import { ToolbarModule } from './toolbar';

@NgModule({
    imports: [
        CommonModule,
        ToolbarModule,
        RouterModule,
        FlexLayoutModule,
        MatIconModule,
        MobileGridModule,
        LaptopGridModule,
    ],
    declarations: [HomeComponent],
    exports: [HomeComponent],
})
export class HomeModule {}
