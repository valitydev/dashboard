import { FlexModule } from 'ng-flex-layout';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExpandableRadioGroupModule } from '@dsh/app/shared/components/radio-buttons/expandable-radio-group';
import { TranslocoModule } from '@jsverse/transloco';

import { TokenProviderFilterComponent } from './token-provider-filter.component';

@NgModule({
    declarations: [TokenProviderFilterComponent],
    exports: [TokenProviderFilterComponent],
    imports: [CommonModule, TranslocoModule, FlexModule, ExpandableRadioGroupModule],
})
export class TokenProviderFilterModule {}
