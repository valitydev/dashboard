import { Shop } from '@vality/swag-payments';

import { Option } from '@dsh/components/form-controls/select-search-field';

export const shopToOption = (shop: Shop): Option<Shop> => ({
    label: shop?.details?.name,
    value: shop,
});
