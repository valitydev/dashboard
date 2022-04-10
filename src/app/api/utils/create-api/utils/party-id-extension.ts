import { Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators';

import { KeycloakTokenInfoService } from '@dsh/app/shared/services/keycloak-token-info';

import { ApiExtension } from './api-extension';

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
