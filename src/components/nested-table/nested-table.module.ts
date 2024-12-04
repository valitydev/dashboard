import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { TranslocoModule } from '@jsverse/transloco';

import { BootstrapIconModule } from '@dsh/components/indicators';

import { NestedTableComponent } from './nested-table.component';

@NgModule({
    imports: [CommonModule, TranslocoModule, MatButtonModule, MatTableModule, BootstrapIconModule],
    declarations: [NestedTableComponent],
    exports: [NestedTableComponent],
})
export class NestedTableModule {}
