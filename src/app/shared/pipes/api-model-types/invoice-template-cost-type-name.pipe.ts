import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { InvoiceTemplateLineCostType } from '@dsh/api/payments';

@Pipe({
    name: 'invoiceTemplateCostTypeName',
})
export class InvoiceTemplateCostTypeNamePipe implements PipeTransform {
    constructor(private transloco: TranslocoService) {}

    transform(type: InvoiceTemplateLineCostType): string {
        switch (type) {
            case InvoiceTemplateLineCostType.InvoiceTemplateLineCostFixed:
                return this.transloco.translate(
                    `invoiceTemplateCostTypeName.InvoiceTemplateLineCostFixed`,
                    null,
                    'pipes'
                );
            case InvoiceTemplateLineCostType.InvoiceTemplateLineCostRange:
                return this.transloco.translate(
                    `invoiceTemplateCostTypeName.InvoiceTemplateLineCostRange`,
                    null,
                    'pipes'
                );
            case InvoiceTemplateLineCostType.InvoiceTemplateLineCostUnlim:
                return this.transloco.translate(
                    `invoiceTemplateCostTypeName.InvoiceTemplateLineCostUnlim`,
                    null,
                    'pipes'
                );
            default:
                return type;
        }
    }
}
