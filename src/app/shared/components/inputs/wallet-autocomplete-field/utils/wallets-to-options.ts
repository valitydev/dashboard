import { Option } from '@vality/ng-core';
import { Wallet } from '@vality/swag-wallet';

const walletToOption = (wallet: Wallet): Option<string> => ({
    label: `${wallet?.id} - ${wallet?.name}`,
    value: wallet?.id,
});

export const walletsToOptions = (wallets: Wallet[]): Option<string>[] => wallets.map(walletToOption);
