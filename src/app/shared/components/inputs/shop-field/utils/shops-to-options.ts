import { Option } from '@vality/matez';
import { Shop } from '@vality/swag-payments';

export const shopToOption = (shop: Shop): Option<Shop> => ({
    label: shop?.details?.name,
    value: shop,
});
