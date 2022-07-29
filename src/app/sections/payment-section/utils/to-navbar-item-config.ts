import { BootstrapIconName } from '@dsh/components/indicators';

export enum NavbarRouterLink {
    Shops = 'shops',
    Analytics = 'analytics',
    Operations = 'operations',
    Payouts = 'payouts',
    Reports = 'reports',
    Integrations = 'integrations',
}

export interface NavbarItemConfig {
    routerLink: NavbarRouterLink;
    icon: BootstrapIconName;
    label: string;
}

export const toNavbarItemConfig = ({
    shops,
    analytics,
    integrations,
    operations,
    payouts,
    reports,
}: Record<
    'shops' | 'analytics' | 'integrations' | 'operations' | 'payouts' | 'reports',
    string
>): NavbarItemConfig[] => [
    {
        routerLink: NavbarRouterLink.Shops,
        icon: BootstrapIconName.Shop,
        label: shops,
    },
    {
        routerLink: NavbarRouterLink.Analytics,
        icon: BootstrapIconName.PieChart,
        label: analytics,
    },
    {
        routerLink: NavbarRouterLink.Operations,
        icon: BootstrapIconName.LayoutTextSidebarReverse,
        label: operations,
    },
    {
        routerLink: NavbarRouterLink.Payouts,
        icon: BootstrapIconName.ArrowRightCircle,
        label: payouts,
    },
    {
        routerLink: NavbarRouterLink.Reports,
        icon: BootstrapIconName.FileText,
        label: reports,
    },
    {
        routerLink: NavbarRouterLink.Integrations,
        icon: BootstrapIconName.Plug,
        label: integrations,
    },
];
