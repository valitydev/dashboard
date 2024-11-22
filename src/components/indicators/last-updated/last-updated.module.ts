import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { HumanizeDurationModule } from '../../../app/humanize-duration';

import { LastUpdatedComponent } from './last-updated.component';

@NgModule({
    imports: [CommonModule, HumanizeDurationModule, FlexLayoutModule, TranslocoModule],
    exports: [LastUpdatedComponent],
    declarations: [LastUpdatedComponent],
})
export class LastUpdatedModule {}
