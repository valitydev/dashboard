import { PartyModification, PartyModificationType, ShopModificationUnit } from '@vality/swag-claim-management';

import { PARTY_MODIFICATION } from '../consts';

import PartyModificationTypeEnum = PartyModificationType.PartyModificationTypeEnum;

export function createBaseShopModification(
    modification: Omit<ShopModificationUnit, 'partyModificationType'>
): PartyModification {
    return {
        ...PARTY_MODIFICATION,
        partyModificationType: {
            partyModificationType: PartyModificationTypeEnum.ShopModificationUnit,
            ...modification,
        },
    };
}
