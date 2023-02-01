import { Injectable, Injector } from '@angular/core';
import { InvoicesService as ApiInvoicesService } from '@vality/swag-payments';
import { switchMap } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { ContextService } from '@dsh/app/shared';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class InvoicesService extends createApi(ApiInvoicesService) {
    constructor(injector: Injector, private contextService: ContextService) {
        super(injector);
        const createInvoice = this.createInvoice;
        this.createInvoice = (p) => {
            return this.getPartyId().pipe(
                switchMap((partyID) => createInvoice({ ...p, invoiceParams: { ...p.invoiceParams, partyID } }))
            );
        };
    }

    private getPartyId() {
        return this.contextService.organization$.pipe(
            first(),
            map(({ party }) => party)
        );
    }
}
