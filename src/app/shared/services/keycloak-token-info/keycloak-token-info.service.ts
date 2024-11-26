import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { KeycloakService } from 'keycloak-angular';
import { Observable, defer, from } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class KeycloakTokenInfoService {
    userID$: Observable<string> = defer(() => this.decoded$).pipe(map(({ sub }) => sub));

    private decoded$ = from(this.keycloakService.getToken()).pipe(
        map((token) => jwtDecode<JwtPayload>(token)),
        takeUntilDestroyed(this.dr),
        shareReplay(1),
    );

    constructor(
        private keycloakService: KeycloakService,
        private dr: DestroyRef,
    ) {}
}
