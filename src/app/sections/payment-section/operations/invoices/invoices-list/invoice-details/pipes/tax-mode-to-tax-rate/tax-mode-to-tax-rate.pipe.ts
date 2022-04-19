import { Pipe, PipeTransform } from '@angular/core';
import { InvoiceLineTaxMode, InvoiceLineTaxVAT } from '@vality/swag-anapi-v2';

@Pipe({
    name: 'taxModeToTaxRate',
})
export class TaxModeToTaxRatePipe implements PipeTransform {
    transform(taxMode: InvoiceLineTaxMode): string {
        switch (taxMode.type) {
            case 'InvoiceLineTaxVAT':
                return (taxMode as InvoiceLineTaxVAT).rate;
        }
    }
}
