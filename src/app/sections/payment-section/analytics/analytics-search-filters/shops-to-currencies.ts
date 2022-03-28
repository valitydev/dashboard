import { Shop } from '@dsh/api-codegen/capi';

export const shopsToCurrencies = (shops: Shop[]): string[] => [
    ...new Set(shops.map((shop) => shop.currency).filter((c) => !!c)),
];
