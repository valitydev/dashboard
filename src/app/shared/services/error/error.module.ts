import { NgModule } from '@angular/core';

import { ErrorService } from './error.service';
import { NotificationModule } from '../notification';

@NgModule({
    imports: [NotificationModule],
    providers: [ErrorService],
})
export class ErrorModule {}
