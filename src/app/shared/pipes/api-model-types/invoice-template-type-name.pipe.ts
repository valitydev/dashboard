import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { InvoiceTemplateType } from '@dsh/api/payments';

@Pipe({
    name: 'invoiceTemplateTypeName',
})
export class InvoiceTemplateTypeNamePipe implements PipeTransform {
    constructor(private transloco: TranslocoService) {}

    transform(type: InvoiceTemplateType): string {
        switch (type) {
            case InvoiceTemplateType.InvoiceTemplateMultiLine:
                return this.transloco.translate(`invoiceTemplateTypeName.InvoiceTemplateMultiLine`, null, 'pipes');
            case InvoiceTemplateType.InvoiceTemplateSingleLine:
                return this.transloco.translate(`invoiceTemplateTypeName.InvoiceTemplateSingleLine`, null, 'pipes');
            default:
                return type;
        }
    }
}
