import isNil from 'lodash-es/isNil';

import { AmountResult } from '@vality/swag-anapi-v2';
import { Shop as ApiShop, ShopLocation, ShopLocationUrl } from '@vality/swag-payments';

export interface ShopItem extends ApiShop {
    balance: AmountResult;
    location: ShopLocationUrl | ShopLocation;
}

export function isShopLocationUrl(location: ShopItem['location']): location is ShopLocationUrl {
    return !isNil((location as ShopLocationUrl).url);
}
