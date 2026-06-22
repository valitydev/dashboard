import { NgModule } from '@angular/core';
import { AlertModule } from '@dsh/components/layout';
import { TranslocoModule } from '@jsverse/transloco';

import { NoShopsComponent } from './no-shops-alert.component';

@NgModule({
    imports: [AlertModule, TranslocoModule],
    declarations: [NoShopsComponent],
    exports: [NoShopsComponent],
})
export class NoShopsAlertModule {}
