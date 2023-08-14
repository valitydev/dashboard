import {
    Modification,
    ShopModification,
    ShopAccountCreationModification,
    PayoutToolInfo,
    InternationalBankAccount,
} from '@vality/swag-claim-management';

import {
    createContractCreationModification,
    createShopCreationModification,
    makeShopLocation,
    createInternationalLegalEntityModification,
    createContractPayoutToolCreationModification,
} from './claim-party-modification';
import { createBaseShopModification } from './claim-party-modification/claim-shop-modification/create-base-shop-modification';

import ShopModificationTypeEnum = ShopModification.ShopModificationTypeEnum;

const CURRENCY = {
    symbolicCode: 'USD',
};

export const createTestShopClaimChangeset = (
    testShopID: string,
    testContractID: string,
    testPayoutToolID: string,
    testContractorID: string,
): Modification[] => {
    return [
        createInternationalLegalEntityModification(testContractorID, {
            legalName: 'Test legal name',
            actualAddress: 'Test actual address',
            registeredAddress: 'Test registered address',
            registeredNumber: '0000000000000',
            tradingName: 'Test trading name',
        }),
        createContractCreationModification(testContractID, {
            contractorID: testContractorID,
            paymentInstitution: { id: 1 },
        }),
        createContractPayoutToolCreationModification(testContractID, testPayoutToolID, {
            currency: CURRENCY,
            toolInfo: {
                payoutToolType: PayoutToolInfo.PayoutToolTypeEnum.InternationalBankAccount,
                iban: '00000000000000',
                bic: '00000000',
                number: '00000000000000',
            } as InternationalBankAccount,
        }),
        createShopCreationModification(testShopID, {
            category: { categoryID: 1 },
            location: makeShopLocation({ url: 'https://test-url.local' }),
            details: { name: 'Test shop' },
            contractID: testContractID,
            payoutToolID: testPayoutToolID,
        }),
        createBaseShopModification({
            id: testShopID,
            modification: {
                shopModificationType: ShopModificationTypeEnum.ShopAccountCreationModification,
                currency: CURRENCY,
            } as ShopAccountCreationModification,
        }),
    ];
};
