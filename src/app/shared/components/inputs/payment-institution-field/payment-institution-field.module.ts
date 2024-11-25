import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { SelectFieldModule } from '@vality/ng-core';

import { PaymentInstitutionFieldComponent } from './payment-institution-field.component';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, SelectFieldModule, TranslocoModule],
    declarations: [PaymentInstitutionFieldComponent],
    exports: [PaymentInstitutionFieldComponent],
})
export class PaymentInstitutionFieldModule {}
