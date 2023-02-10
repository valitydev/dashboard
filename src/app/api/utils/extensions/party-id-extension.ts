import { Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators';

import { ContextOrganizationService } from '@dsh/app/shared';

import { ApiExtension } from '../create-api';

@Injectable({
    providedIn: 'root',
})
export class PartyIdExtension implements ApiExtension {
    constructor(private contextOrganizationService: ContextOrganizationService) {}

    selector() {
        return this.contextOrganizationService.organization$.pipe(
            first(),
            map(({ party }) => ({ partyID: party }))
        );
    }
}
