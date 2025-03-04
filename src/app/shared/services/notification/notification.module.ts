import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@jsverse/transloco';

import { NotificationService } from './notification.service';

@NgModule({
    imports: [MatSnackBarModule, TranslocoModule],
    providers: [NotificationService],
})
export class NotificationModule {}
