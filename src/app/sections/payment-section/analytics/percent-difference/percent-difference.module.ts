import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from 'ng-flex-layout';

import { CardModule } from '@dsh/components/layout';

import { PercentDifferenceComponent } from './percent-difference.component';

@NgModule({
    imports: [CommonModule, CardModule, FlexLayoutModule],
    exports: [PercentDifferenceComponent],
    declarations: [PercentDifferenceComponent],
})
export class PercentDifferenceModule {}
