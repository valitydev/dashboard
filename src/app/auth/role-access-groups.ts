import { RoleId } from '@vality/swag-organizations';

import { RoleAccessGroup } from './types/role-access';
import { RoleAccessName } from './types/role-access-name';

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
                availableRoles: [RoleId.Administrator, RoleId.Manager, RoleId.Accountant, RoleId.Integrator],
            },
            {
                name: RoleAccessName.ViewPayments,
                availableRoles: [RoleId.Administrator, RoleId.Manager, RoleId.Accountant, RoleId.Integrator],
            },
            {
                name: RoleAccessName.ViewRefunds,
                availableRoles: [RoleId.Administrator, RoleId.Manager, RoleId.Accountant, RoleId.Integrator],
            },
            {
                name: RoleAccessName.ViewPayouts,
                availableRoles: [RoleId.Administrator, RoleId.Manager, RoleId.Accountant],
            },
            {
                name: RoleAccessName.ViewApiKey,
                availableRoles: [RoleId.Administrator, RoleId.Integrator],
            },
            {
                name: RoleAccessName.ManageReports,
                availableRoles: [RoleId.Administrator, RoleId.Accountant],
            },
            {
                name: RoleAccessName.ManageWebhooks,
                availableRoles: [RoleId.Administrator, RoleId.Integrator],
            },
            {
                name: RoleAccessName.CreateInvoice,
                availableRoles: [RoleId.Administrator, RoleId.Manager],
            },
            {
                name: RoleAccessName.CreatePaymentLink,
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
        availableRoles: [RoleId.Administrator, RoleId.Accountant, RoleId.Integrator],
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
