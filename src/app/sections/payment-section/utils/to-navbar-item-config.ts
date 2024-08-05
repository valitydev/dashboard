import { RoleAccessName } from '@dsh/app/auth';
import { BootstrapIconName } from '@dsh/components/indicators';

export enum NavbarRouterLink {
    Shops = 'shops',
    Analytics = 'analytics',
    Operations = 'operations',
    Reports = 'reports',
    Integrations = 'integrations',
}

export interface NavbarItemConfig {
    routerLink: NavbarRouterLink;
    icon: BootstrapIconName;
    label: string;
    roles: RoleAccessName[];
}

export const toNavbarItemConfig = ({
    shops,
    analytics,
    integrations,
    operations,
    reports,
}: Record<
    'shops' | 'analytics' | 'integrations' | 'operations' | 'reports',
    string
>): NavbarItemConfig[] => [
    {
        routerLink: NavbarRouterLink.Shops,
        icon: BootstrapIconName.Shop,
        label: shops,
        roles: [],
    },
    {
        routerLink: NavbarRouterLink.Analytics,
        icon: BootstrapIconName.PieChart,
        label: analytics,
        roles: [RoleAccessName.ViewAnalytics],
    },
    {
        routerLink: NavbarRouterLink.Operations,
        icon: BootstrapIconName.LayoutTextSidebarReverse,
        label: operations,
        roles: [
            RoleAccessName.ViewPayments,
            RoleAccessName.ViewInvoices,
            RoleAccessName.ViewRefunds,
        ],
    },
    {
        routerLink: NavbarRouterLink.Reports,
        icon: BootstrapIconName.FileText,
        label: reports,
        roles: [RoleAccessName.Reports],
    },
    {
        routerLink: NavbarRouterLink.Integrations,
        icon: BootstrapIconName.Plug,
        label: integrations,
        roles: [RoleAccessName.PaymentLinks, RoleAccessName.ApiKeys, RoleAccessName.Webhooks],
    },
];
