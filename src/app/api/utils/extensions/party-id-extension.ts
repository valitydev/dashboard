import { Injectable } from '@angular/core';
import cloneDeep from 'lodash-es/cloneDeep';
import { Observable, switchMap } from 'rxjs';
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

@Injectable({
    providedIn: 'root',
})
export class PartyIdPatchMethodService extends PartyIdExtension {
    patch<P extends object, R, E extends P = P>(
        method: (params: P) => Observable<R>,
        patch: (params: E, partyId: string) => unknown
    ): (params: E) => Observable<R> {
        return (params) =>
            this.selector().pipe(
                switchMap(({ partyID }) => {
                    const newParams = cloneDeep(params);
                    patch(newParams, partyID);
                    return method(newParams);
                })
            );
    }
}
