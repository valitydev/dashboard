import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { KeycloakService } from 'keycloak-angular';
import { Observable, defer, from } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@UntilDestroy()
@Injectable({
    providedIn: 'root',
})
export class KeycloakTokenInfoService {
    userID$: Observable<string> = defer(() => this.decoded$).pipe(map(({ sub }) => sub));

    private decoded$ = from(this.keycloakService.getToken()).pipe(
        map((token) => jwt_decode<JwtPayload>(token)),
        untilDestroyed(this),
        shareReplay(1)
    );

    constructor(private keycloakService: KeycloakService) {}
}
