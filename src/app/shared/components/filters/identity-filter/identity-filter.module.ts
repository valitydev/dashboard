import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { IdentityFieldComponent } from '@dsh/app/shared/components/inputs/identity-field';
import { FilterModule } from '@dsh/components/filter';

import { IdentityFilterComponent } from './identity-filter.component';
import { ClaimFieldModule } from '../../inputs/claim-field';

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
