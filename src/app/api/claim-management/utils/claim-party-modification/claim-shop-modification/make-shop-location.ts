import { ShopLocation } from '@vality/swag-claim-management';

export function makeShopLocation(params: Omit<ShopLocation, 'locationType'>): ShopLocation {
    return {
        locationType: ShopLocation.LocationTypeEnum.ShopLocationUrl,
        ...params,
    };
}
