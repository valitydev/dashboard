import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ToolbarModule } from '../toolbar';

import { LaptopGridComponent } from './laptop-grid.component';

@NgModule({
    imports: [CommonModule, ToolbarModule, FlexLayoutModule],
    declarations: [LaptopGridComponent],
    exports: [LaptopGridComponent],
})
export class LaptopGridModule {}
