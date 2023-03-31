import { generateMockShopItem } from './generate-shop-item';
import { makeEmptyList } from './make-empty-list';
import { ShopItem } from '../types/shop-item';

export function generateMockShopsItemList(length: number): ShopItem[] {
    return makeEmptyList(length).map((_: null, index: number) => {
        const order = index + 1;
        return generateMockShopItem(order);
    });
}
