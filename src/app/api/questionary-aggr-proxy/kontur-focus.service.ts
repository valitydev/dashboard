import { Injectable } from '@angular/core';
import {
    KonturFocusService as ApiKonturFocusService,
    BeneficialOwnerQuery,
    BeneficialOwnerResponses,
    EgrDetailsQuery,
    EgrDetailsResponses,
    KonturFocusRequest,
    KonturFocusResponse,
    LicencesQuery,
    LicencesResponses,
    ReqQuery,
    ReqResponses,
} from '@vality/swag-questionary-aggr-proxy';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { Mapping } from '../../../type-utils';
import { createApi } from '../utils';

type RequestType = KonturFocusRequest.KonturFocusRequestTypeEnum;

type ParamsByRequestType = Mapping<
    RequestType,
    KonturFocusRequest,
    {
        /* eslint-disable @typescript-eslint/naming-convention */
        ReqQuery: ReqQuery;
        EgrDetailsQuery: EgrDetailsQuery;
        LicencesQuery: LicencesQuery;
        BeneficialOwnerQuery: BeneficialOwnerQuery;
        /* eslint-enable @typescript-eslint/naming-convention */
    }
>;

export type ResponsesByRequestType = Mapping<
    RequestType,
    KonturFocusResponse,
    {
        /* eslint-disable @typescript-eslint/naming-convention */
        ReqQuery: ReqResponses;
        EgrDetailsQuery: EgrDetailsResponses;
        LicencesQuery: LicencesResponses;
        BeneficialOwnerQuery: BeneficialOwnerResponses;
        /* eslint-enable @typescript-eslint/naming-convention */
    }
>;

@Injectable({
    providedIn: 'root',
})
export class KonturFocusService extends createApi(ApiKonturFocusService) {
    request<T extends RequestType>(
        konturFocusRequestType: T,
        requestParams: Partial<Omit<ParamsByRequestType[T], 'konturFocusRequestType'>>
    ): Observable<ResponsesByRequestType[T]['responses']> {
        return this.requestKonturFocus({
            konturFocusParams: { request: { konturFocusRequestType, ...requestParams } },
        }).pipe(pluck<ResponsesByRequestType[T], 'responses'>('responses'));
    }
}
