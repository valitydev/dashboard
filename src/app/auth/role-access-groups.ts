import { RoleAccessGroup } from './types/role-access';
import { RoleAccessName } from './types/role-access-name';
import { RoleId } from './types/role-id';

export const ROLE_ACCESS_GROUPS: RoleAccessGroup[] = [
    {
        name: RoleAccessName.Payments,
        children: [
            {
                name: RoleAccessName.ViewAnalytics,
                availableRoles: [RoleId.Administrator, RoleId.Manager],
            },
            {
                name: RoleAccessName.ViewInvoices,
                availableRoles: [
                    RoleId.Administrator,
                    RoleId.Manager,
                    RoleId.Accountant,
                    RoleId.Integrator,
                ],
            },
            {
                name: RoleAccessName.ViewPayments,
                availableRoles: [
                    RoleId.Administrator,
                    RoleId.Manager,
                    RoleId.Accountant,
                    RoleId.Integrator,
                ],
            },
            {
                name: RoleAccessName.ViewRefunds,
                availableRoles: [
                    RoleId.Administrator,
                    RoleId.Manager,
                    RoleId.Accountant,
                    RoleId.Integrator,
                ],
            },
            {
                name: RoleAccessName.ViewPayouts,
                availableRoles: [RoleId.Administrator, RoleId.Manager, RoleId.Accountant],
            },
            {
                name: RoleAccessName.ApiKeys,
                availableRoles: [RoleId.Administrator, RoleId.Integrator],
            },
            {
                name: RoleAccessName.Reports,
                availableRoles: [RoleId.Administrator, RoleId.Accountant],
            },
            {
                name: RoleAccessName.Webhooks,
                availableRoles: [RoleId.Administrator, RoleId.Integrator],
            },
            {
                name: RoleAccessName.CreateInvoice,
                availableRoles: [RoleId.Administrator, RoleId.Manager],
            },
            {
                name: RoleAccessName.PaymentLinks,
                availableRoles: [RoleId.Administrator, RoleId.Manager],
            },
            {
                name: RoleAccessName.CreateRefund,
                availableRoles: [RoleId.Administrator, RoleId.Accountant],
            },
        ],
    },
    {
        name: RoleAccessName.Wallets,
        availableRoles: [RoleId.WalletManager],
    },
    {
        name: RoleAccessName.Claims,
        availableRoles: [RoleId.Administrator],
    },
    {
        name: RoleAccessName.ManageOrganizations,
        availableRoles: [RoleId.Administrator],
    },
];
