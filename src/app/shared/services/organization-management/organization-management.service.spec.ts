import { Subject, firstValueFrom, of, throwError } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MembersService } from '@dsh/app/api/organizations';
import { RoleId } from '@dsh/app/auth/types/role-id';
import { KeycloakTokenInfoService } from '@dsh/app/shared/services/keycloak-token-info';

import { Member, Organization } from '@vality/swag-organizations';

import { OrganizationManagementService } from './organization-management.service';

describe('Organization administration access', () => {
    let service: OrganizationManagementService;
    let getOrgMember: ReturnType<typeof vi.fn>;

    function organization(id = 'org-id', owner = 'another-user'): Organization {
        return { id, name: 'Organization', owner, createdAt: '' };
    }

    function member(roleId: RoleId): Member {
        return {
            id: 'current-user',
            userEmail: '',
            roles: [{ id: 'role-id', roleId }],
        };
    }

    beforeEach(() => {
        getOrgMember = vi.fn().mockReturnValue(of(member(RoleId.Manager)));
        TestBed.configureTestingModule({
            providers: [
                OrganizationManagementService,
                {
                    provide: MembersService,
                    useValue: { getOrgMember },
                },
                { provide: KeycloakTokenInfoService, useValue: { userID$: of('current-user') } },
            ],
        });
        service = TestBed.inject(OrganizationManagementService);
    });

    it('denies access without an organization and does not request membership', async () => {
        expect(await firstValueFrom(service.hasAdminAccess(null))).toBe(false);
        expect(getOrgMember).not.toHaveBeenCalled();
    });

    it('does not grant administration access to a missing member', async () => {
        getOrgMember.mockReturnValue(throwError(() => new HttpErrorResponse({ status: 404 })));
        expect(await firstValueFrom(service.hasAdminAccess(organization()))).toBe(false);
    });

    it('does not grant administration access to a member without administrator roles', async () => {
        expect(await firstValueFrom(service.hasAdminAccess(organization()))).toBe(false);
    });

    it('does not grant administration access to a member without roles', async () => {
        getOrgMember.mockReturnValue(of({ id: 'current-user', userEmail: '' }));
        expect(await firstValueFrom(service.hasAdminAccess(organization()))).toBe(false);
    });

    it('grants administration access to administrators', async () => {
        getOrgMember.mockReturnValue(of(member(RoleId.Administrator)));
        expect(await firstValueFrom(service.hasAdminAccess(organization()))).toBe(true);
        expect(getOrgMember).toHaveBeenCalledExactlyOnceWith({
            orgId: 'org-id',
            userId: 'current-user',
        });
    });

    it('grants administration access to the owner without requiring a member entry', async () => {
        expect(
            await firstValueFrom(service.hasAdminAccess(organization('org-id', 'current-user'))),
        ).toBe(true);
        expect(getOrgMember).not.toHaveBeenCalled();
    });

    it('denies access on a failed check and permits a subsequent check', async () => {
        getOrgMember.mockReturnValueOnce(throwError(() => new Error('Request failed')));
        expect(await firstValueFrom(service.hasAdminAccess(organization()))).toBe(false);
        getOrgMember.mockReturnValueOnce(of(member(RoleId.Administrator)));
        expect(await firstValueFrom(service.hasAdminAccess(organization()))).toBe(true);
    });

    it('keeps concurrent checks for different organizations independent', async () => {
        const first = new Subject<Member>();
        const second = new Subject<Member>();
        getOrgMember.mockReturnValueOnce(first).mockReturnValueOnce(second);
        const firstAccess = firstValueFrom(service.hasAdminAccess(organization('first-org')));
        const secondAccess = firstValueFrom(service.hasAdminAccess(organization('second-org')));
        second.next(member(RoleId.Manager));
        first.next(member(RoleId.Administrator));
        expect(await firstAccess).toBe(true);
        expect(await secondAccess).toBe(false);
        expect(getOrgMember.mock.calls.map(([params]) => params.orgId)).toEqual([
            'first-org',
            'second-org',
        ]);
    });

    it('checks ownership for the supplied organization', async () => {
        expect(await firstValueFrom(service.isOrganizationOwner(organization()))).toBe(false);
        expect(
            await firstValueFrom(
                service.isOrganizationOwner(organization('org-id', 'current-user')),
            ),
        ).toBe(true);
        expect(getOrgMember).not.toHaveBeenCalled();
    });
});
