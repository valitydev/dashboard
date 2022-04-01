import { PayoutToolInfo, RussianBankAccount } from '@vality/swag-claim-management';

export function createRussianBankAccountModification(
    params: Omit<RussianBankAccount, 'payoutToolType'>
): RussianBankAccount {
    return {
        payoutToolType: PayoutToolInfo.PayoutToolTypeEnum.RussianBankAccount,
        ...params,
    };
}
