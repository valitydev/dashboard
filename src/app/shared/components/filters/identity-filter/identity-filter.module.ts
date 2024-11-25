import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexModule } from 'ng-flex-layout';

import { IdentityFieldComponent } from '@dsh/app/shared/components/inputs/identity-field';
import { FilterModule } from '@dsh/components/filter';

import { ClaimFieldModule } from '../../inputs/claim-field';

import { IdentityFilterComponent } from './identity-filter.component';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        ReactiveFormsModule,
        FilterModule,
        ClaimFieldModule,
        FlexModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        IdentityFieldComponent,
    ],
    declarations: [IdentityFilterComponent],
    exports: [IdentityFilterComponent],
})
export class IdentityFilterModule {}
