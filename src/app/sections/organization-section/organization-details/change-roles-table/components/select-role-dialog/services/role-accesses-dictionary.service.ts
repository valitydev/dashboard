import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { map } from 'rxjs/operators';

import { RoleAccessName } from '@dsh/app/auth';

@Injectable({
    providedIn: 'root',
})
export class RoleAccessesDictionaryService {
    roleAccessDict$ = this.t.selectTranslation('organization-section').pipe(
        map(
            (): Record<RoleAccessName, string> => ({
                [RoleAccessName.Claims]: this.t.translate(
                    'roleAccessesDictionary.claims',
                    null,
                    'organization-section',
                ),
                [RoleAccessName.CreateInvoice]: this.t.translate(
                    'roleAccessesDictionary.createInvoice',
                    null,
                    'organization-section',
                ),
                [RoleAccessName.PaymentLinks]: this.t.translate(
                    'roleAccessesDictionary.createPaymentLink',
                    null,
                    'organization-section',
                ),
                [RoleAccessName.CreateRefund]: this.t.translate(
                    'roleAccessesDictionary.createRefund',
                    null,
                    'organization-section',
                ),
                [RoleAccessName.ManageOrganizations]: this.t.translate(
                    'roleAccessesDictionary.manageOrganizations',
                    null,
                    'organization-section',
                ),
                [RoleAccessName.Reports]: this.t.translate(
                    'roleAccessesDictionary.manageReports',
                    null,
                    'organization-section',
                ),
                [RoleAccessName.Webhooks]: this.t.translate(
                    'roleAccessesDictionary.manageWebhooks',
                    null,
                    'organization-section',
                ),
                [RoleAccessName.Payments]: this.t.translate(
                    'roleAccessesDictionary.payments',
                    null,
                    'organization-section',
                ),
                [RoleAccessName.ViewAnalytics]: this.t.translate(
                    'roleAccessesDictionary.viewAnalytics',
                    null,
                    'organization-section',
                ),
                [RoleAccessName.ApiKeys]: this.t.translate(
                    'roleAccessesDictionary.viewApiKey',
                    null,
                    'organization-section',
                ),
                [RoleAccessName.ViewInvoices]: this.t.translate(
                    'roleAccessesDictionary.viewInvoices',
                    null,
                    'organization-section',
                ),
                [RoleAccessName.ViewPayments]: this.t.translate(
                    'roleAccessesDictionary.viewPayments',
                    null,
                    'organization-section',
                ),
                [RoleAccessName.ViewPayouts]: this.t.translate(
                    'roleAccessesDictionary.viewPayouts',
                    null,
                    'organization-section',
                ),
                [RoleAccessName.ViewRefunds]: this.t.translate(
                    'roleAccessesDictionary.viewRefunds',
                    null,
                    'organization-section',
                ),
                [RoleAccessName.Wallets]: this.t.translate(
                    'roleAccessesDictionary.wallets',
                    null,
                    'organization-section',
                ),
            }),
        ),
    );

    constructor(private t: TranslocoService) {}
}
