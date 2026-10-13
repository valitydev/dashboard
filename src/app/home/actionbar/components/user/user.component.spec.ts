import { BehaviorSubject, Subject, of } from 'rxjs';

import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MembersService } from '@dsh/app/api/organizations';
import { KeycloakService } from '@dsh/app/auth';
import { RoleId } from '@dsh/app/auth/types/role-id';
import { ConfigService } from '@dsh/app/config';
import { DIALOG_CONFIG } from '@dsh/app/sections/tokens';
import { ContextOrganizationService } from '@dsh/app/shared/services/context-organization';
import { KeycloakTokenInfoService } from '@dsh/app/shared/services/keycloak-token-info';
import { TranslocoService } from '@jsverse/transloco';

import { Member, Organization } from '@vality/swag-organizations';

import { UserComponent } from './user.component';

describe('User menu organization access', () => {
    let fixture: ComponentFixture<UserComponent>;
    let organizations: BehaviorSubject<Organization | null>;
    let getOrgMember: ReturnType<typeof vi.fn>;

    function organization(id: string): Organization {
        return { id, name: id, owner: 'another-user', createdAt: '' };
    }

    function administrator(): Member {
        return {
            id: 'current-user',
            userEmail: '',
            roles: [{ id: 'admin-role', roleId: RoleId.Administrator }],
        };
    }

    function displayedAccess() {
        fixture.detectChanges();
        return fixture.nativeElement.textContent.trim();
    }

    beforeEach(() => {
        organizations = new BehaviorSubject<Organization | null>(null);
        getOrgMember = vi.fn();
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [UserComponent],
            providers: [
                { provide: ContextOrganizationService, useValue: { organization$: organizations } },
                { provide: MembersService, useValue: { getOrgMember } },
                { provide: KeycloakTokenInfoService, useValue: { userID$: of('current-user') } },
                { provide: KeycloakService, useValue: { getUsername: () => 'User' } },
                { provide: ConfigService, useValue: { keycloakEndpoint: '' } },
                { provide: Router, useValue: {} },
                { provide: MatDialog, useValue: {} },
                {
                    provide: TranslocoService,
                    useValue: { selectTranslation: () => of({}), translate: () => '' },
                },
                { provide: DIALOG_CONFIG, useValue: {} },
            ],
        }).overrideComponent(UserComponent, { set: { template: '{{ hasAdminAccess$ | async }}' } });
        fixture = TestBed.createComponent(UserComponent);
        fixture.detectChanges();
    });

    it('resets access on switching organizations and ignores the previous request', () => {
        const first = new Subject<Member>();
        const second = new Subject<Member>();
        getOrgMember.mockReturnValueOnce(first).mockReturnValueOnce(second);
        organizations.next(organization('first-org'));
        first.next(administrator());
        expect(displayedAccess()).toBe('true');

        organizations.next(organization('second-org'));
        expect(displayedAccess()).toBe('false');
        expect(first.observed).toBe(false);
        first.next(administrator());
        expect(displayedAccess()).toBe('false');

        second.next(administrator());
        expect(displayedAccess()).toBe('true');
    });

    it('recovers from a failed check and revokes access when the active organization is cleared', () => {
        const failed = new Subject<Member>();
        getOrgMember.mockReturnValueOnce(failed).mockReturnValueOnce(of(administrator()));
        organizations.next(organization('first-org'));
        failed.error(new Error('Request failed'));
        expect(displayedAccess()).toBe('false');

        organizations.next(organization('second-org'));
        expect(displayedAccess()).toBe('true');
        organizations.next(null);
        expect(displayedAccess()).toBe('false');
        expect(getOrgMember).toHaveBeenCalledTimes(2);
    });
});
