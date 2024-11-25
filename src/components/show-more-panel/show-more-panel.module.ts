import { NgModule } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

import { ButtonModule } from '@dsh/components/buttons';

import { ShowMorePanelComponent } from './show-more-panel.component';

@NgModule({
    declarations: [ShowMorePanelComponent],
    imports: [ButtonModule, TranslocoModule],
    exports: [ShowMorePanelComponent],
})
export class ShowMorePanelModule {}
