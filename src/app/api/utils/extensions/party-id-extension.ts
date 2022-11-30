import { Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators';

import { ContextService } from '@dsh/app/shared';

import { ApiExtension } from '../create-api';

@Injectable({
    providedIn: 'root',
})
export class PartyIdExtension implements ApiExtension {
    constructor(private contextService: ContextService) {}

    selector() {
        return this.contextService.organization$.pipe(
            first(),
            map(({ party }) => ({ partyID: party }))
        );
    }
}
