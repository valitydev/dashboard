import { Shop } from '@vality/swag-payments';

export const getShopName = (s: Shop | null): string | null => (s ? s.details.name : null);
