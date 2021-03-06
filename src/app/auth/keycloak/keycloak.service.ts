import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakEvent, KeycloakOptions } from 'keycloak-angular';
import { KeycloakInstance, KeycloakLoginOptions, KeycloakProfile } from 'keycloak-js';
import { Observable, Observer, Subject } from 'rxjs';

import { STUB_USER } from './stub-user';

/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-console */
@Injectable()
export class KeycloakService {
    async init(_options: KeycloakOptions = {}): Promise<boolean> {
        return true;
    }

    async login(_options: KeycloakLoginOptions = {}): Promise<void> {
        console.log('login');
    }

    async logout(_redirectUri?: string): Promise<void> {
        console.log('logout');
    }

    async register(_options: KeycloakLoginOptions = { action: 'register' }): Promise<void> {}

    isUserInRole(_role: string): boolean {
        return true;
    }

    getUserRoles(_allRoles: boolean = true): string[] {
        return [];
    }

    async isLoggedIn(): Promise<boolean> {
        return true;
    }

    isTokenExpired(_minValidity: number = 0): boolean {
        return false;
    }

    async updateToken(_minValidity: number = 5): Promise<boolean> {
        return true;
    }

    async loadUserProfile(_forceReload: boolean = false): Promise<KeycloakProfile> {
        return STUB_USER;
    }

    async getToken(): Promise<string> {
        return Math.random().toString();
    }

    getUsername(): string {
        return STUB_USER.username;
    }

    clearToken(): void {}

    addTokenToHeader(headersArg?: HttpHeaders): Observable<HttpHeaders> {
        return Observable.create(async (observer: Observer<any>) => {
            let headers = headersArg;
            if (!headers) {
                headers = new HttpHeaders();
            }
            try {
                const token: string = await this.getToken();
                headers = headers.set('Authorization', 'Bearer ' + token);
                observer.next(headers);
                observer.complete();
            } catch (error) {
                observer.error(error);
            }
        });
    }

    getKeycloakInstance(): KeycloakInstance {
        return {} as KeycloakInstance;
    }

    get bearerExcludedUrls(): string[] {
        return [];
    }

    get enableBearerInterceptor(): boolean {
        return true;
    }

    get keycloakEvents$(): Subject<KeycloakEvent> {
        return new Subject();
    }
}
