import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { createControlProviders } from '@vality/ng-core';
import { Report } from '@vality/swag-anapi-v2';
import { combineLatest } from 'rxjs';
import { share, switchMap } from 'rxjs/operators';

import { ReportTypesLabelPipe } from '@dsh/app/shared/components/inputs/report-types-field';
import { FilterSuperclass } from '@dsh/components/filter';

@Component({
    selector: 'dsh-report-types-filter',
    templateUrl: 'report-types-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [...createControlProviders(() => ReportTypesFilterComponent), ReportTypesLabelPipe],
})
export class ReportTypesFilterComponent extends FilterSuperclass<Report.ReportTypeEnum[]> {
    labels$ = this.savedValue$.pipe(
        switchMap((types) => combineLatest((types || []).map((type) => this.reportTypesLabelPipe.transform(type)))),
        share()
    );

    constructor(injector: Injector, private reportTypesLabelPipe: ReportTypesLabelPipe) {
        super(injector);
    }

    protected isEmpty(value: Report.ReportTypeEnum[]): boolean {
        return super.isEmpty(value) || value?.length === Object.keys(Report.ReportTypeEnum).length;
    }
}
