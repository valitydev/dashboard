import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexModule } from 'ng-flex-layout';

import { ContractorDetailsModule, ErrorMessageModule } from '@dsh/app/shared';
import { ShopFieldModule } from '@dsh/app/shared/components/inputs/shop-field';

import { ExistingContractFormComponent } from './existing-contract-form.component';

@NgModule({
    imports: [
        TranslocoModule,
        ShopFieldModule,
        FlexModule,
        ReactiveFormsModule,
        CommonModule,
        ErrorMessageModule,
        ContractorDetailsModule,
    ],
    declarations: [ExistingContractFormComponent],
    exports: [ExistingContractFormComponent],
})
export class ExistingContractFormModule {}
