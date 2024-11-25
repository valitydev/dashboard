import { NgModule } from '@angular/core';
import { TRANSLOCO_SCOPE } from '@jsverse/transloco';

import { OrganizationSectionRoutingModule } from './organization-section-routing.module';
import { OrganizationSectionComponent } from './organization-section.component';

@NgModule({
    imports: [OrganizationSectionRoutingModule],
    declarations: [OrganizationSectionComponent],
    exports: [OrganizationSectionComponent],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'organization-section' }],
})
export class OrganizationSectionModule {}
