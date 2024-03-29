import { NgModule } from '@angular/core';
import { FlexLayoutModule } from 'ng-flex-layout';

import { ActionsComponent } from './actions.component';

@NgModule({
    imports: [FlexLayoutModule],
    declarations: [ActionsComponent],
    exports: [ActionsComponent],
})
export class ActionsModule {}
