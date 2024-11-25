import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';

import { RadioGroupFieldModule } from '@dsh/components/form-controls/radio-group-field';

import { InvoiceStatusFieldComponent } from './invoice-status-field.component';
import { InvoiceStatusLabelPipe } from './pipes/invoice-status-label.pipe';

@NgModule({
    imports: [CommonModule, TranslocoModule, ReactiveFormsModule, RadioGroupFieldModule],
    declarations: [InvoiceStatusFieldComponent, InvoiceStatusLabelPipe],
    exports: [InvoiceStatusFieldComponent, InvoiceStatusLabelPipe],
})
export class InvoiceStatusFieldModule {}
