import { firstValueFrom, of } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { MembersService } from '@dsh/app/api/organizations';
import { RoleId } from '@dsh/app/auth/types/role-id';
import { KeycloakTokenInfoService } from '@dsh/app/shared/services/keycloak-token-info';

import { Member } from '@vality/swag-organizations';

import { OrganizationManagementService } from './organization-management.service';

describe('Organization administration access', () => {
    function createService(members: Member[], owner = 'another-user') {
        TestBed.configureTestingModule({
            providers: [
                OrganizationManagementService,
                {
                    provide: MembersService,
                    useValue: { listOrgMembers: () => of({ result: members }) },
                },
                { provide: KeycloakTokenInfoService, useValue: { userID$: of('current-user') } },
            ],
        });
        const service = TestBed.inject(OrganizationManagementService);
        service.init({ id: 'org-id', name: 'Organization', owner, createdAt: '' });
        return service;
    }

    it('does not grant administration access to a missing member', async () => {
        const service = createService([]);
        expect(await firstValueFrom(service.hasAdminAccess$)).toBe(false);
    });

    it('does not grant administration access to a member without administrator roles', async () => {
        const service = createService([
            {
                id: 'current-user',
                userEmail: '',
                roles: [{ id: 'manager-role', roleId: RoleId.Manager }],
            },
        ]);
        expect(await firstValueFrom(service.hasAdminAccess$)).toBe(false);
    });

    it('grants administration access to administrators', async () => {
        const service = createService([
            {
                id: 'current-user',
                userEmail: '',
                roles: [{ id: 'admin-role', roleId: RoleId.Administrator }],
            },
        ]);
        expect(await firstValueFrom(service.hasAdminAccess$)).toBe(true);
    });

    it('grants administration access to the owner without requiring a member entry', async () => {
        const service = createService([], 'current-user');
        expect(await firstValueFrom(service.hasAdminAccess$)).toBe(true);
    });
});
