import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
    InlineObject,
    Member,
    MemberOrgListResult,
    MemberRole,
    MembersService,
    Organization,
    OrganizationJoinRequest,
    OrganizationMembership,
    OrganizationSearchResult,
    OrgsService,
    RolesService,
} from '@dsh/api-codegen/organizations';
import { IdGeneratorService } from '@dsh/app/shared';
import { PickMutable } from '@dsh/type-utils';

@Injectable()
export class OrganizationsService {
    constructor(
        private orgsService: OrgsService,
        private rolesService: RolesService,
        private membersService: MembersService,
        private idGeneratorService: IdGeneratorService
    ) {}

    listOrgMembership(limit?: number, continuationToken?: string): Observable<OrganizationSearchResult> {
        return this.orgsService.listOrgMembership(this.idGeneratorService.shortUuid(), limit, continuationToken);
    }

    getOrg(orgId: Organization['id']): Observable<Organization> {
        return this.orgsService.getOrg(this.idGeneratorService.shortUuid(), orgId);
    }

    // TODO: Organization.owner should be readonly (maybe fix swag)
    createOrg(org: Omit<PickMutable<Organization>, 'owner'>): Observable<Organization> {
        return this.orgsService.createOrg(this.idGeneratorService.shortUuid(), org as Organization);
    }

    patchOrg(orgId: Organization['id'], org: InlineObject): Observable<Organization> {
        return this.orgsService.patchOrg(this.idGeneratorService.shortUuid(), orgId, org);
    }

    joinOrg(request: OrganizationJoinRequest): Observable<OrganizationMembership> {
        return this.orgsService.joinOrg(this.idGeneratorService.shortUuid(), request);
    }

    getOrgMember(orgId: Organization['id'], userId: string): Observable<Member> {
        return this.membersService.getOrgMember(this.idGeneratorService.shortUuid(), orgId, userId);
    }

    assignMemberRole(orgId: string, userId: string, memberRole: PickMutable<MemberRole>): Observable<MemberRole> {
        return this.membersService.assignMemberRole(
            this.idGeneratorService.shortUuid(),
            orgId,
            userId,
            memberRole as MemberRole
        );
    }

    removeMemberRole(orgId: string, userId: string, memberRoleId: MemberRole['id']): Observable<void> {
        return this.membersService.removeMemberRole(this.idGeneratorService.shortUuid(), orgId, userId, memberRoleId);
    }

    listOrgMembers(orgId: Organization['id']): Observable<MemberOrgListResult> {
        return this.membersService.listOrgMembers(this.idGeneratorService.shortUuid(), orgId);
    }

    expelOrgMember(orgId: Organization['id'], userId: string): Observable<void> {
        return this.membersService.expelOrgMember(this.idGeneratorService.shortUuid(), orgId, userId);
    }

    cancelOrgMembership(orgId: Organization['id']): Observable<void> {
        return this.orgsService.cancelOrgMembership(this.idGeneratorService.shortUuid(), orgId);
    }
}
