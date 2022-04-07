import { Shop as ApiShop, ShopLocation, ShopLocationUrl } from '@vality/swag-payments';
import isNil from 'lodash-es/isNil';

import { AmountResult } from '@dsh/api-codegen/anapi';

export interface ShopItem extends ApiShop {
    balance: AmountResult;
    location: ShopLocationUrl | ShopLocation;
}

export function isShopLocationUrl(location: ShopItem['location']): location is ShopLocationUrl {
    return !isNil((location as ShopLocationUrl).url);
}
