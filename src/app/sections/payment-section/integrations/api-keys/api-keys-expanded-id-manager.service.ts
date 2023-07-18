import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiKey } from '@vality/swag-api-keys-v2';
import { Observable } from 'rxjs';

import { ExpandedIdManager, Fragment } from '@dsh/app/shared/services';

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

    protected toFragment(apiKey: ApiKey): Fragment {
        return apiKey.id;
    }

    protected fragmentNotFound(): void {
        this.fetchApiKeysService.more();
    }

    protected get dataSet$(): Observable<ApiKey[]> {
        return this.fetchApiKeysService.result$;
    }
}
