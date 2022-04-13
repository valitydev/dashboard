import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '@vality/swag-anapi-v2';
import { Observable } from 'rxjs';

import { ExpandedIdManager } from '@dsh/app/shared/services';

import { FetchInvoicesService } from '../fetch-invoices/fetch-invoices.service';

@Injectable()
export class InvoicesExpandedIdManager extends ExpandedIdManager<Invoice> {
    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        private fetchInvoicesService: FetchInvoicesService
    ) {
        super(route, router);
    }

    protected fragmentNotFound(): void {
        this.fetchInvoicesService.fetchMore();
    }

    protected get dataSet$(): Observable<Invoice[]> {
        return this.fetchInvoicesService.searchResult$;
    }
}
