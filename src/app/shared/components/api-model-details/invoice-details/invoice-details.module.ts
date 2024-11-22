import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { AmountCurrencyModule } from '@dsh/app/shared/pipes';
import { StatusModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { InvoiceDetailsComponent } from './invoice-details.component';
import { InvoiceStatusColorPipe } from './invoice-status-color.pipe';

@NgModule({
    imports: [
        TranslocoModule,
        LayoutModule,
        FlexLayoutModule,
        CommonModule,
        StatusModule,
        AmountCurrencyModule,
    ],
    declarations: [InvoiceDetailsComponent, InvoiceStatusColorPipe],
    exports: [InvoiceDetailsComponent, InvoiceStatusColorPipe],
})
export class InvoiceDetailsModule {}
