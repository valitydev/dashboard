import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiKey } from '@vality/swag-api-keys';
import { Observable } from 'rxjs';

import { ExpandedIdManager } from '@dsh/app/shared/services';

import { FetchApiKeysService } from './fetch-api-keys.service';

@Injectable()
export class ApiKeysExpandedIdManager extends ExpandedIdManager<ApiKey> {
    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        private fetchApiKeysService: FetchApiKeysService
    ) {
        super(route, router);
    }

    protected get dataSet$(): Observable<ApiKey[]> {
        return this.fetchApiKeysService.apiKeys$;
    }
}
