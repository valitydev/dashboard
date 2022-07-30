import { BootstrapIconName } from '@dsh/components/indicators';

export enum NavbarRouterLink {
    Wallets = 'wallets',
    Deposits = 'deposits',
    Withdrawals = 'withdrawals',
    Integrations = 'integrations',
}

export interface NavbarItemConfig {
    routerLink: string;
    icon: BootstrapIconName;
    label: string;
}

export const toNavbarItemConfig = ({
    wallets,
    deposits,
    withdrawals,
    integrations,
}: Record<'wallets' | 'deposits' | 'withdrawals' | 'integrations', string>): NavbarItemConfig[] => [
    {
        routerLink: NavbarRouterLink.Wallets,
        icon: BootstrapIconName.Wallet2,
        label: wallets,
    },
    {
        routerLink: NavbarRouterLink.Deposits,
        icon: BootstrapIconName.ArrowDownRightCircle,
        label: deposits,
    },
    {
        routerLink: NavbarRouterLink.Withdrawals,
        icon: BootstrapIconName.ArrowUpRightCircle,
        label: withdrawals,
    },
    {
        routerLink: NavbarRouterLink.Integrations,
        icon: BootstrapIconName.Plug,
        label: integrations,
    },
];
