import { NgModule } from '@angular/core';
import { FlexLayoutModule } from 'ng-flex-layout';

import { SectionHeaderComponent } from './section-header.component';

@NgModule({
    imports: [FlexLayoutModule],
    declarations: [SectionHeaderComponent],
    exports: [SectionHeaderComponent],
})
export class SectionHeaderModule {}
