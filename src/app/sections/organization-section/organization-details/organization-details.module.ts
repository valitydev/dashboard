import { FlexLayoutModule } from 'ng-flex-layout';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { OrganizationManagementModule } from '@dsh/app/shared/services/organization-management/organization-management.module';
import { IndicatorsModule } from '@dsh/components/indicators';
import { BreadcrumbModule } from '@dsh/components/navigation';
import { TranslocoModule } from '@jsverse/transloco';

import { OrganizationDetailsRoutingModule } from './organization-details-routing.module';
import { OrganizationDetailsComponent } from './organization-details.component';

@NgModule({
    imports: [
        OrganizationDetailsRoutingModule,
        CommonModule,
        FlexLayoutModule,
        TranslocoModule,
        BreadcrumbModule,
        IndicatorsModule,
        OrganizationManagementModule,
        MatTabsModule,
    ],
    declarations: [OrganizationDetailsComponent],
    exports: [OrganizationDetailsComponent],
})
export class OrganizationDetailsModule {}
