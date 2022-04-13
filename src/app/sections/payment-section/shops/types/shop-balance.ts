import { AmountResult } from '@vality/swag-anapi-v2';

export interface ShopBalance {
    id: string;
    data: AmountResult | null;
}
