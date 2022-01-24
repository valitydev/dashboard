import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { KeycloakService } from 'keycloak-angular';
import { from, Observable, defer } from 'rxjs';
import { map, pluck, shareReplay } from 'rxjs/operators';

@UntilDestroy()
@Injectable()
export class KeycloakTokenInfoService {
    // Party ID & User ID
    partyID$: Observable<string> = defer(() => this.decoded$).pipe(pluck('sub'));

    private decoded$ = from(this.keycloakService.getToken()).pipe(
        map((token) => jwt_decode<JwtPayload>(token)),
        untilDestroyed(this),
        shareReplay(1)
    );

    constructor(private keycloakService: KeycloakService) {}
}
