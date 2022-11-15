import { NgModule } from '@angular/core';

import { AppAuthGuardService } from './app-auth-guard.service';

@NgModule({
    providers: [AppAuthGuardService],
})
export class AuthModule {}
