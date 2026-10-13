import { of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { MembersService } from '@dsh/app/api/organizations';
import { RoleId } from '@dsh/app/auth/types/role-id';
import { KeycloakTokenInfoService } from '@dsh/app/shared/services/keycloak-token-info';

import { Organization } from '@vality/swag-organizations';

@Injectable({ providedIn: 'root' })
export class OrganizationManagementService {
    constructor(
        private membersService: MembersService,
        private keycloakTokenInfoService: KeycloakTokenInfoService,
    ) {}

    isOrganizationOwner(organization: Organization) {
        return this.keycloakTokenInfoService.userID$.pipe(
            take(1),
            map((userId) => organization.owner === userId),
        );
    }

    hasAdminAccess(organization: Organization | null) {
        if (!organization) return of(false);

        return this.keycloakTokenInfoService.userID$.pipe(
            take(1),
            switchMap((userId) =>
                organization.owner === userId
                    ? of(true)
                    : this.membersService
                          .getOrgMember({ orgId: organization.id, userId })
                          .pipe(
                              map(
                                  (member) =>
                                      member.roles?.some(
                                          (role) => role.roleId === RoleId.Administrator,
                                      ) ?? false,
                              ),
                          ),
            ),
            catchError(() => of(false)),
        );
    }
}
