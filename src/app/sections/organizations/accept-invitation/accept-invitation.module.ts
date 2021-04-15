import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorModule } from '@dsh/app/shared';

import { AcceptInvitationRoutingModule } from './accept-invitation-routing.module';
import { AcceptInvitationComponent } from './accept-invitation.component';

@NgModule({
    imports: [CommonModule, AcceptInvitationRoutingModule, ErrorModule],
    declarations: [AcceptInvitationComponent],
    exports: [AcceptInvitationComponent],
})
export class AcceptInvitationModule {}