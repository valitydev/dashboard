import { Component } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

import { RoleAccessName } from '@dsh/app/auth';

@Component({
    templateUrl: 'operations.component.html',
    standalone: false,
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
            roles: [RoleAccessName.ViewPayments],
        },
        {
            path: 'invoices',
            label$: this.transloco.selectTranslate(
                'operations.tabs.invoices',
                null,
                'payment-section',
            ),
            roles: [RoleAccessName.ViewInvoices],
        },
        {
            path: 'refunds',
            label$: this.transloco.selectTranslate(
                'operations.tabs.refunds',
                null,
                'payment-section',
            ),
            roles: [RoleAccessName.ViewRefunds],
        },
    ];

    constructor(private transloco: TranslocoService) {}
}
