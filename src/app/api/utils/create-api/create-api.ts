import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, combineLatest, isObservable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RequiredKeys, UnionToIntersection, Overwrite } from 'utility-types';

import { ApiExtension } from './utils/api-extension';
import { getMethods } from './utils/get-methods';
import { ObservableValue } from './utils/observable-value';
import { XrequestIdExtension } from './utils/x-request-id-extension';

const DEFAULT_HEADERS = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

type ApiArgs = [Injector];

type MethodParams<P extends Record<PropertyKey, any>, K extends PropertyKey> = RequiredKeys<Omit<P, K>> extends never
    ? void | Overwrite<P, { [N in K]?: P[N] }>
    : Overwrite<P, { [N in K]?: P[N] }>;
type Method<M, P extends PropertyKey> = M extends (...args: unknown[]) => Observable<HttpResponse<infer R>>
    ? (params: MethodParams<Parameters<M>[0], P>) => Observable<R>
    : never;

export function createApi<
    T extends Record<PropertyKey, any> & { defaultHeaders: HttpHeaders },
    E extends (new (...args: any[]) => ApiExtension)[] = []
>(apiClass: new (...args: any[]) => T, extensions: E = [] as E) {
    @Injectable()
    class Api {
        private api = this.injector.get<T>(apiClass);
        private extensions = [XrequestIdExtension, ...extensions].map((e) => this.injector.get<ApiExtension>(e));

        constructor(private injector: Injector) {
            if (this.api.defaultHeaders !== DEFAULT_HEADERS) {
                this.api.defaultHeaders = DEFAULT_HEADERS;
            }
            const methodNames = getMethods(apiClass, this.api);
            Object.assign(
                this,
                Object.fromEntries(methodNames.map((name) => [name, (params) => this.call(name, params)]))
            );
        }

        private call(name: keyof T, params: Record<PropertyKey, unknown>) {
            return this.createExtendedParams().pipe(switchMap((p) => this.api[name](Object.assign({}, params, ...p))));
        }

        private createExtendedParams() {
            return combineLatest(
                this.extensions.map((extension) => extension.selector()).map((p) => (isObservable(p) ? p : of(p)))
            );
        }
    }

    return Api as unknown as new (...args: ApiArgs) => {
        [N in keyof T]: Method<
            T[N],
            | keyof UnionToIntersection<ObservableValue<ReturnType<InstanceType<E[number]>['selector']>>>
            | keyof UnionToIntersection<ObservableValue<ReturnType<XrequestIdExtension['selector']>>>
        >;
    };
}
