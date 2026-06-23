import { FlexLayoutModule } from 'ng-flex-layout';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApiModelRefsModule } from '@dsh/app/shared';
import { CollapseModule, LimitedListModule } from '@dsh/components/layout';
import { TranslocoModule } from '@jsverse/transloco';

import { OrganizationRolesComponent } from './organization-roles.component';

@NgModule({
    imports: [
        CommonModule,
        CollapseModule,
        LimitedListModule,
        TranslocoModule,
        FlexLayoutModule,
        ApiModelRefsModule,
    ],
    declarations: [OrganizationRolesComponent],
    exports: [OrganizationRolesComponent],
})
export class OrganizationRolesModule {}
