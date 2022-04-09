import { Injectable } from '@angular/core';
import { ApiExtension } from './api-extension';
import { KeycloakTokenInfoService } from '@dsh/app/shared';
import { first, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PartyIdExtension implements ApiExtension {
    constructor(private keycloakTokenInfoService: KeycloakTokenInfoService) {}

    selector() {
        return this.keycloakTokenInfoService.partyID$.pipe(
            first(),
            map((partyID) => ({ partyID }))
        );
    }
}
