import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RoleAccessName } from '@dsh/app/auth';
import { TranslocoService } from '@jsverse/transloco';


@Component({
    templateUrl: 'operations.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
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
