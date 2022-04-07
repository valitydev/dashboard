import { Shop } from '@vality/swag-payments';

export const findShopById = (s: Shop[], shopID: string): Shop | null => s.find(({ id }) => id === shopID);
