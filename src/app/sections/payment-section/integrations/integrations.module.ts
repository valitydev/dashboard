import { FlexModule } from 'ng-flex-layout';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthModule } from '@dsh/app/auth';
import { LayoutModule } from '@dsh/components/layout';
import { ScrollUpModule } from '@dsh/components/navigation';
import { TranslocoModule } from '@jsverse/transloco';

import { IntegrationsRoutingModule } from './integrations-routing.module';
import { IntegrationsComponent } from './integrations.component';

@NgModule({
    imports: [
        IntegrationsRoutingModule,
        CommonModule,
        FlexModule,
        LayoutModule,
        TranslocoModule,
        ScrollUpModule,
        MatTabsModule,
        AuthModule,
    ],
    declarations: [IntegrationsComponent],
})
export class IntegrationsModule {}
