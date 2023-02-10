import { Injectable, Injector } from '@angular/core';
import { InvoiceTemplatesService as ApiInvoiceTemplatesService } from '@vality/swag-payments';
import { switchMap, first, map } from 'rxjs/operators';

import { ContextOrganizationService } from '@dsh/app/shared';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class InvoiceTemplatesService extends createApi(ApiInvoiceTemplatesService) {
    constructor(injector: Injector, private contextOrganizationService: ContextOrganizationService) {
        super(injector);
        const createInvoiceTemplate = this.createInvoiceTemplate;
        this.createInvoiceTemplate = (p) =>
            this.getPartyId().pipe(
                switchMap((partyID) =>
                    createInvoiceTemplate({
                        ...p,
                        invoiceTemplateCreateParams: { ...p.invoiceTemplateCreateParams, partyID },
                    })
                )
            );
    }

    private getPartyId() {
        return this.contextOrganizationService.organization$.pipe(
            first(),
            map(({ party }) => party)
        );
    }
}
