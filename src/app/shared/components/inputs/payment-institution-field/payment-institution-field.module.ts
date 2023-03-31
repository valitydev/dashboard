import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { TranslocoModule } from '@ngneat/transloco';

import { SelectSearchFieldModule } from '@dsh/components/form-controls/select-search-field';

import { PaymentInstitutionFieldComponent } from './payment-institution-field.component';

@NgModule({
    imports: [
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        SelectSearchFieldModule,
        TranslocoModule,
    ],
    declarations: [PaymentInstitutionFieldComponent],
    exports: [PaymentInstitutionFieldComponent],
})
export class PaymentInstitutionFieldModule {}
