import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

import { AlertModule } from '@dsh/components/layout';

import { NoShopsComponent } from './no-shops-alert.component';

@NgModule({
    imports: [AlertModule, TranslocoModule],
    declarations: [NoShopsComponent],
    exports: [NoShopsComponent],
})
export class NoShopsAlertModule {}
