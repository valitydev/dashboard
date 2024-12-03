import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@jsverse/transloco';

import { ShowMorePanelComponent } from './show-more-panel.component';

@NgModule({
    declarations: [ShowMorePanelComponent],
    imports: [MatButtonModule, TranslocoModule],
    exports: [ShowMorePanelComponent],
})
export class ShowMorePanelModule {}
