import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { map } from 'rxjs/operators';

import { RoleAccessName } from '../types/role-access-name';

@Injectable({
    providedIn: 'root',
})
export class RoleAccessesDictionaryService {
    roleAccessDict$ = this.t.selectTranslation('organization-section').pipe(
        map(
            (): Record<RoleAccessName, string> => ({
                claims: this.t.translate('roleAccessesDictionary.claims', null, 'organization-section'),
                createInvoice: this.t.translate('roleAccessesDictionary.createInvoice', null, 'organization-section'),
                createPaymentLink: this.t.translate(
                    'roleAccessesDictionary.createPaymentLink',
                    null,
                    'organization-section'
                ),
                createRefund: this.t.translate('roleAccessesDictionary.createRefund', null, 'organization-section'),
                manageOrganizations: this.t.translate(
                    'roleAccessesDictionary.manageOrganizations',
                    null,
                    'organization-section'
                ),
                manageReports: this.t.translate('roleAccessesDictionary.manageReports', null, 'organization-section'),
                manageWebhooks: this.t.translate('roleAccessesDictionary.manageWebhooks', null, 'organization-section'),
                payments: this.t.translate('roleAccessesDictionary.payments', null, 'organization-section'),
                viewAnalytics: this.t.translate('roleAccessesDictionary.viewAnalytics', null, 'organization-section'),
                viewApiKey: this.t.translate('roleAccessesDictionary.viewApiKey', null, 'organization-section'),
                viewInvoices: this.t.translate('roleAccessesDictionary.viewInvoices', null, 'organization-section'),
                viewPayments: this.t.translate('roleAccessesDictionary.viewPayments', null, 'organization-section'),
                viewPayouts: this.t.translate('roleAccessesDictionary.viewPayouts', null, 'organization-section'),
                viewRefunds: this.t.translate('roleAccessesDictionary.viewRefunds', null, 'organization-section'),
                wallets: this.t.translate('roleAccessesDictionary.wallets', null, 'organization-section'),
            })
        )
    );

    constructor(private t: TranslocoService) {}
}
