import { Injectable } from '@angular/core';
import cloneDeep from 'lodash-es/cloneDeep';
import { Observable, switchMap } from 'rxjs';
import { DeepPartial } from 'utility-types';

import { PartyIdExtension } from './party-id-extension';

@Injectable({
    providedIn: 'root',
})
export class PartyIdPatchMethodService extends PartyIdExtension {
    patch<P extends object, R, E extends DeepPartial<P> | void>(
        method: (params: P) => Observable<R>,
        patch: (params: P, partyId: string) => unknown
    ): (params: E) => Observable<R> {
        return (params) =>
            this.selector().pipe(
                switchMap(({ partyID }) => {
                    const newParams = cloneDeep(params);
                    patch(newParams as P, partyID);
                    return method(newParams as P);
                })
            );
    }
}
