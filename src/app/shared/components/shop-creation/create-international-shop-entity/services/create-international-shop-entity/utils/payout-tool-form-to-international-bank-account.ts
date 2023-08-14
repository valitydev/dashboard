import { InternationalBankAccount } from '@vality/swag-claim-management';

import { PayoutToolForm } from '../../../components/payout-tool-form/types/payout-tool-form';

export function payoutToolFormToInternationalBankAccount(
    form: PayoutToolForm,
): Required<Pick<InternationalBankAccount, 'iban' | 'number' | 'bank'>> {
    return {
        iban: form.iban,
        number: form.number,
        bank: {
            abaRtn: form.abaRtn,
            address: form.address,
            bic: form.bic,
            name: form.name,
            country: form.country,
        },
    };
}
