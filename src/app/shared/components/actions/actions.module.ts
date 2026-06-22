import { FlexLayoutModule } from 'ng-flex-layout';

import { NgModule } from '@angular/core';

import { ActionsComponent } from './actions.component';

@NgModule({
    imports: [FlexLayoutModule],
    declarations: [ActionsComponent],
    exports: [ActionsComponent],
})
export class ActionsModule {}
