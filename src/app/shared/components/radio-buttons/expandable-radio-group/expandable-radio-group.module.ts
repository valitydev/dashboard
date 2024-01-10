import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { InlineShowAllToggleModule } from '@dsh/app/shared/components/buttons/inline-show-all-toggle';

import { ExpandableRadioGroupItemDirective } from './directives/expandable-radio-group-item/expandable-radio-group-item.directive';
import { ExpandableRadioGroupComponent } from './expandable-radio-group.component';

@NgModule({
    imports: [
        CommonModule,
        MatRadioModule,
        TranslocoModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        InlineShowAllToggleModule,
    ],
    declarations: [ExpandableRadioGroupComponent, ExpandableRadioGroupItemDirective],
    exports: [ExpandableRadioGroupComponent, ExpandableRadioGroupItemDirective],
})
export class ExpandableRadioGroupModule {}
