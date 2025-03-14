import { Option } from '@vality/matez';
import { Wallet } from '@vality/swag-wallets';

const walletToOption = (wallet: Wallet): Option<string> => ({
    label: `${wallet?.id} - ${wallet?.name}`,
    value: wallet?.id,
});

export const walletsToOptions = (wallets: Wallet[]): Option<string>[] =>
    wallets.map(walletToOption);
