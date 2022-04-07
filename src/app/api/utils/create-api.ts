import { HttpResponse } from '@angular/common/http';
import { Injector, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequiredKeys } from 'utility-types';

import { IdGeneratorService } from '@dsh/app/shared';

import { DEFAULT_HEADERS } from './create-default-headers';

type ApiArgs = [Injector];

export function createApi<T extends Record<PropertyKey, any>>(apiClass: new (...args: any[]) => T) {
    @Injectable()
    class Api {
        constructor(injector: Injector) {
            const idGeneratorService = injector.get(IdGeneratorService);
            const api = injector.get(apiClass);
            if (api.defaultHeaders !== DEFAULT_HEADERS) {
                api.defaultHeaders = DEFAULT_HEADERS;
            }
            Object.assign(
                this,
                Object.fromEntries(
                    Object.getOwnPropertyNames(apiClass.prototype)
                        .filter((name) => typeof api[name] === 'function' && name !== 'constructor')
                        .map((name) => [
                            name,
                            (params) =>
                                api[name]({
                                    xRequestID: idGeneratorService.shortUuid(),
                                    ...params,
                                }),
                        ])
                )
            );
        }
    }
    return Api as unknown as new (...args: ApiArgs) => {
        [N in keyof T]: T[N] extends (...args: unknown[]) => Observable<HttpResponse<infer R>>
            ? (
                  params: RequiredKeys<Omit<Parameters<T[N]>[0], 'xRequestID'>> extends never
                      ? void
                      : Omit<Parameters<T[N]>[0], 'xRequestID'> & { xRequestID?: string }
              ) => Observable<R>
            : never;
    };
}
