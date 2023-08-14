import isNil from 'lodash-es/isNil';

import { generateMockShopId } from './generate-mock-shop-id';
import { ShopBalance } from '../types/shop-balance';

export function generateMockBalance(
    order: number,
    amount: number | null = null,
    currency: string = 'USD',
): ShopBalance {
    return {
        id: generateMockShopId(order),
        data: isNil(amount)
            ? null
            : {
                  amount,
                  currency,
              },
    };
}
