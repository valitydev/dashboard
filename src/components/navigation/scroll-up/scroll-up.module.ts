import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { BootstrapIconModule } from '@dsh/components/indicators';

import { ScrollUpComponent } from './scroll-up.component';

@NgModule({
    imports: [MatButtonModule, CommonModule, BootstrapIconModule],
    declarations: [ScrollUpComponent],
    exports: [ScrollUpComponent],
})
export class ScrollUpModule {}
