import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '@vality/swag-organizations';
import { Observable } from 'rxjs';

import { ExpandedIdManager } from '@dsh/app/shared/services';

import { FetchMembersService } from '../fetch-members/fetch-members.service';

@Injectable()
export class MembersExpandedIdManager extends ExpandedIdManager<Member> {
    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        private fetchMembersService: FetchMembersService,
    ) {
        super(route, router);
    }

    protected get dataSet$(): Observable<Member[]> {
        return this.fetchMembersService.members$;
    }
}
