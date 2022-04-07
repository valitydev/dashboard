import { Shop } from '@vality/swag-payments';

import { findShopById } from './find-shop-by-id';
import { getShopName } from './get-shop-name';

export const getShopNameById = (s: Shop[], shopID: string): string | null => getShopName(findShopById(s, shopID));
