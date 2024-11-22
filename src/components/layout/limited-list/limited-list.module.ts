import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { LimitedListItemComponent } from './components/limited-list-item/limited-list-item.component';
import { LimitedListComponent } from './limited-list.component';

const EXPORTED_DECLARATIONS = [LimitedListComponent, LimitedListItemComponent];

@NgModule({
    imports: [CommonModule, FlexLayoutModule, TranslocoModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class LimitedListModule {}
