import { NgModule } from '@angular/core';
import { TRANSLOCO_SCOPE } from '@jsverse/transloco';

import { ClaimSectionRoutingModule } from './claim-section-routing.module';
import { ClaimSectionComponent } from './claim-section.component';

@NgModule({
    imports: [ClaimSectionRoutingModule],
    declarations: [ClaimSectionComponent],
    exports: [ClaimSectionComponent],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'claim-section' }],
})
export class ClaimSectionModule {}
