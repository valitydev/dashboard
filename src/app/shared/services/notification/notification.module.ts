import { NgModule } from '@angular/core';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { NotificationService } from './notification.service';

@NgModule({
    imports: [MatSnackBarModule, TranslocoModule],
    providers: [NotificationService],
})
export class NotificationModule {}
