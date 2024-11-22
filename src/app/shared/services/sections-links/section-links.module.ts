import { NgModule } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

import { SectionsLinksService } from './section-links.service';

@NgModule({
    imports: [TranslocoModule],
    providers: [SectionsLinksService],
})
export class SectionsLinksModule {}
