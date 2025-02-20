import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, combineLatest, isObservable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Overwrite, ReadonlyKeys, RequiredKeys, UnionToIntersection } from 'utility-types';

import { ApiExtension } from './utils/api-extension';
import { getMethods } from './utils/get-methods';
import { ObservableValue } from './utils/observable-value';
import { XrequestIdExtension } from './utils/x-request-id-extension';

const DEFAULT_HEADERS = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

// Exclude readonly keys
type DeepOnlyMutable<T> = T extends object
    ? {
          [P in keyof T]: T[P] extends object ? Omit<T[P], ReadonlyKeys<T[P]>> : T[P];
      }
    : T;
type ApiArgs = [Injector];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MethodParams<P extends Record<PropertyKey, any>, K extends PropertyKey> =
    RequiredKeys<Omit<P, K>> extends never
        ? void | Overwrite<P, { [N in K]?: P[N] }>
        : Overwrite<P, { [N in K]?: P[N] }>;
type Method<M, P extends PropertyKey> = M extends (
    ...args: unknown[]
) => Observable<HttpResponse<infer R>>
    ? (params: DeepOnlyMutable<MethodParams<Parameters<M>[0], P>>) => Observable<R>
    : never;

/**
 * Don't use super with Api class methods because they were added with the object assign
 */
export function createApi<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends Record<PropertyKey, any> & { defaultHeaders: HttpHeaders },
    E extends (new (...args: unknown[]) => ApiExtension)[] = [],
>(apiClass: new (...args: unknown[]) => T, extensions: E = [] as E) {
    @Injectable()
    class Api {
        private api = this.injector.get<T>(apiClass);
        private extensions = [XrequestIdExtension, ...extensions].map((e) =>
            this.injector.get<ApiExtension>(e),
        );

        constructor(private injector: Injector) {
            if (this.api.defaultHeaders !== DEFAULT_HEADERS) {
                this.api.defaultHeaders = DEFAULT_HEADERS;
            }
            const methodNames = getMethods(apiClass, this.api);
            Object.assign(
                this,
                Object.fromEntries(
                    methodNames.map((name) => [name, (params) => this.call(name, params)]),
                ),
            );
        }

        private call(name: keyof T, params: Record<PropertyKey, unknown>) {
            return this.createExtendedParams().pipe(
                switchMap((extendParams) =>
                    this.api[name](Object.assign({}, ...extendParams, params)),
                ),
            );
        }

        private createExtendedParams() {
            return combineLatest(
                this.extensions
                    .map((extension) => extension.selector())
                    .map((p) => (isObservable(p) ? p : of(p))),
            );
        }
    }

    return Api as unknown as new (...args: ApiArgs) => {
        [N in keyof T]: Method<
            T[N],
            | keyof UnionToIntersection<
                  ObservableValue<ReturnType<InstanceType<E[number]>['selector']>>
              >
            | keyof UnionToIntersection<
                  ObservableValue<ReturnType<XrequestIdExtension['selector']>>
              >
        >;
    };
}
