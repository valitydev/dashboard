import { NgModule } from '@angular/core';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';

import { OrginizationSectionRoutingModule } from './organization-section-routing.module';
import { OrginizationSectionComponent } from './organization-section.component';

@NgModule({
    imports: [OrginizationSectionRoutingModule],
    declarations: [OrginizationSectionComponent],
    exports: [OrginizationSectionComponent],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'organization-section' }],
})
export class OrginizationSectionModule {}
