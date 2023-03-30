import { Injectable } from '@angular/core';
import { DaDataService as ApiDaDataService, DaDataRequest } from '@vality/swag-questionary-aggr-proxy';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ParamsByRequestType, ResponseByRequestType, SuggestionsByRequestType } from './utils';
import { createApi } from '../utils';

type RequestType = DaDataRequest.DaDataRequestTypeEnum;

@Injectable({
    providedIn: 'root',
})
export class DaDataService extends createApi(ApiDaDataService) {
    suggest<T extends RequestType>(
        daDataRequestType: T,
        params: ParamsByRequestType[T]
    ): Observable<SuggestionsByRequestType[T]> {
        const requestParams = { request: { daDataRequestType, ...params } };
        const request = this.requestDaData({ daDataParams: requestParams }) as Observable<ResponseByRequestType[T]>;
        return request.pipe(pluck('suggestions')) as Observable<any>;
    }
}
