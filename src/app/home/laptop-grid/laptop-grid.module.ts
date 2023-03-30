import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LaptopGridComponent } from './laptop-grid.component';
import { ToolbarModule } from '../toolbar';

@NgModule({
    imports: [CommonModule, ToolbarModule, FlexLayoutModule],
    declarations: [LaptopGridComponent],
    exports: [LaptopGridComponent],
})
export class LaptopGridModule {}
