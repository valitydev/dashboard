import { Inject, Injectable } from '@angular/core';
import { Report } from '@vality/swag-anapi-v2';
import isEmpty from 'lodash-es/isEmpty';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { ReportsService as ReportsApiService } from '@dsh/app/api/anapi';
import { mapToTimestamp } from '@dsh/app/custom-operators';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { PartialFetcher } from '@dsh/app/shared';

import { SearchFiltersParams } from './reports-search-filters';

@Injectable()
export class FetchReportsService extends PartialFetcher<Report, SearchFiltersParams> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(shareReplay(1));
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp, shareReplay(1));

    constructor(
        private reportsService: ReportsApiService,
        @Inject(SEARCH_LIMIT)
        protected searchLimit: number
    ) {
        super();
    }

    protected fetch({ realm, ...p }: SearchFiltersParams, continuationToken: string) {
        return this.reportsService.searchReports({
            ...p,
            reportTypes: isEmpty(p.reportTypes) ? Object.values(Report.ReportTypeEnum) : p.reportTypes,
            continuationToken,
            paymentInstitutionRealm: realm,
            limit: this.searchLimit,
        });
    }
}
