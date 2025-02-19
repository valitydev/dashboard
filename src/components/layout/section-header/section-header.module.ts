import { NgModule } from '@angular/core';
import { FlexLayoutModule } from 'ng-flex-layout';

import { SectionHeaderComponent } from './section-header.component';
import { ContentLoadingComponent } from '@vality/matez';

@NgModule({
    imports: [FlexLayoutModule, ContentLoadingComponent],
    declarations: [SectionHeaderComponent],
    exports: [SectionHeaderComponent],
})
export class SectionHeaderModule {}
