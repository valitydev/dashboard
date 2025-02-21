import { NgModule } from '@angular/core';
import { ContentLoadingComponent } from '@vality/matez';
import { FlexLayoutModule } from 'ng-flex-layout';

import { SectionHeaderComponent } from './section-header.component';

@NgModule({
    imports: [FlexLayoutModule, ContentLoadingComponent],
    declarations: [SectionHeaderComponent],
    exports: [SectionHeaderComponent],
})
export class SectionHeaderModule {}
