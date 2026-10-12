import { Injectable } from '@angular/core';

import { OrgsService as ApiOrgsService, PatchOrgRequest } from '@vality/swag-organizations';

import { createApi } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class OrgsService extends createApi(ApiOrgsService) {
    patchAllowedIps(orgId: string, allowedIps: string[]) {
        // The published client does not include allowedIps in PatchOrgRequest yet.
        const patchOrgRequest: PatchOrgRequest & { allowedIps: string[] } = { allowedIps };
        return this.patchOrg({ orgId, patchOrgRequest });
    }
}
