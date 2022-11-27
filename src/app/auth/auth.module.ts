import { NgModule } from '@angular/core';

import { AppAuthGuardService } from './app-auth-guard.service';
import { IsAccessAllowedPipe } from './role-access.pipe';

@NgModule({
    providers: [AppAuthGuardService],
    declarations: [IsAccessAllowedPipe],
    exports: [IsAccessAllowedPipe],
})
export class AuthModule {}
