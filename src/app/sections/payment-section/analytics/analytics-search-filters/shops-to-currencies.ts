import { Shop } from '@vality/swag-payments';

export const shopsToCurrencies = (shops: Shop[]): string[] => [
    ...new Set(shops.map((shop) => shop.currency).filter((c) => !!c)),
];
