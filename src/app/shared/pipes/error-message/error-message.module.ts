import { NgModule } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

import { ErrorMessagePipe } from './error-message.pipe';

@NgModule({
    imports: [TranslocoModule],
    declarations: [ErrorMessagePipe],
    exports: [ErrorMessagePipe],
})
export class ErrorMessageModule {}
