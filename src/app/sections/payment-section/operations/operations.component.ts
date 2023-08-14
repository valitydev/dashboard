import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
    templateUrl: 'operations.component.html',
})
export class OperationsComponent {
    links = [
        {
            path: 'payments',
            label$: this.transloco.selectTranslate(
                'operations.tabs.payments',
                null,
                'payment-section',
            ),
        },
        {
            path: 'invoices',
            label$: this.transloco.selectTranslate(
                'operations.tabs.invoices',
                null,
                'payment-section',
            ),
        },
        {
            path: 'refunds',
            label$: this.transloco.selectTranslate(
                'operations.tabs.refunds',
                null,
                'payment-section',
            ),
        },
    ];

    constructor(private transloco: TranslocoService) {}
}
