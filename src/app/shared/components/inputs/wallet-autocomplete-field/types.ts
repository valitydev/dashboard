import { Wallet } from '@vality/swag-wallets';

export type WalletId = Wallet['id'];
export type WalletName = Wallet['name'];
export type DisplayWithFn = (value: WalletId) => string;
