import { Component } from '@angular/core';

import { InvoicesService } from './invoices.service';
import { InvoiceSearchFormValue } from './search-form';
import { SpinnerType } from '../../../../spinner';

@Component({
    selector: 'dsh-invoices',
    templateUrl: 'invoices.component.html',
    providers: [InvoicesService]
})
export class InvoicesComponent {
    tableData$ = this.invoicesService.invoicesTableData$;
    hasMoreInvoices$ = this.invoicesService.hasMore$;
    lastUpdated$ = this.invoicesService.lastUpdated$;
    isLoading$ = this.invoicesService.isLoading$;

    spinnerType = SpinnerType.FulfillingBouncingCircle;

    constructor(private invoicesService: InvoicesService) {}

    search(val: InvoiceSearchFormValue) {
        this.invoicesService.search(val);
    }

    fetchMore() {
        this.invoicesService.fetchMore();
    }

    refresh() {
        this.invoicesService.refresh();
    }
}