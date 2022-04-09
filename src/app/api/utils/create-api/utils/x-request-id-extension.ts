import { Injectable } from '@angular/core';

import { IdGeneratorService } from '@dsh/app/shared';

import { ApiExtension } from './api-extension';

@Injectable({
    providedIn: 'root',
})
export class XrequestIdExtension implements ApiExtension {
    constructor(private idGeneratorService: IdGeneratorService) {}

    selector() {
        return { xRequestID: this.idGeneratorService.shortUuid() };
    }
}
