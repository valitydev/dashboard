import { PartyModification, ShopCreationModification } from '@vality/swag-claim-management';

import { createBaseShopModification } from './create-base-shop-modification';

export function createShopCreationModification(
    id: string,
    params: Omit<ShopCreationModification, 'shopModificationType'>,
): PartyModification {
    return {
        ...createBaseShopModification({
            id,
            modification: {
                shopModificationType: 'ShopCreationModification',
                ...params,
            },
        }),
    };
}
