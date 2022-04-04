import { Injectable } from '@angular/core';
import { PartiesService as ApiPartiesService } from '@vality/swag-payments';

import { IdGeneratorService } from '@dsh/app/shared';

import { createDefaultHeaders } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class PartiesService {
    constructor(private partiesService: ApiPartiesService, private idGenerator: IdGeneratorService) {
        this.partiesService.defaultHeaders = createDefaultHeaders();
    }

    /**
     * Create if not exist and return party
     */
    getMyParty() {
        return this.partiesService.getMyParty({ xRequestID: this.idGenerator.shortUuid() });
    }
}
