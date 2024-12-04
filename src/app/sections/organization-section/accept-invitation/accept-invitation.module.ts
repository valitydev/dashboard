import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexModule } from 'ng-flex-layout';

import { ErrorModule } from '@dsh/app/shared';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LinkModule } from '@dsh/components/link';

import { AcceptInvitationRoutingModule } from './accept-invitation-routing.module';
import { AcceptInvitationComponent } from './accept-invitation.component';

@NgModule({
    imports: [
        CommonModule,
        AcceptInvitationRoutingModule,
        ErrorModule,
        TranslocoModule,
        MatButtonModule,
        FlexModule,
        IndicatorsModule,
        LinkModule,
    ],
    declarations: [AcceptInvitationComponent],
    exports: [AcceptInvitationComponent],
})
export class AcceptInvitationModule {}
