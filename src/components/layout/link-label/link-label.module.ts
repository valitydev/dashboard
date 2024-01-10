import { NgModule } from '@angular/core';
import { FlexLayoutModule } from 'ng-flex-layout';

import { BootstrapIconModule } from '@dsh/components/indicators';

import { LinkLabelComponent } from './link-label.component';

@NgModule({
    imports: [BootstrapIconModule, FlexLayoutModule],
    declarations: [LinkLabelComponent],
    exports: [LinkLabelComponent],
})
export class LinkLabelModule {}
