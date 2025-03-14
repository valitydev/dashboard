import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { createControlProviders } from '@vality/matez';
import { combineLatest } from 'rxjs';
import { share, switchMap } from 'rxjs/operators';

import { ClaimStatusesLabelPipe } from '@dsh/app/shared/components/inputs/claim-statuses-field';
import { ClaimStatusesEnum } from '@dsh/app/shared/components/inputs/claim-statuses-field/types/claim-statuses-enum';
import { FilterSuperclass } from '@dsh/components/filter';

@Component({
    selector: 'dsh-claim-statuses-filter',
    templateUrl: 'claim-statuses-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        ...createControlProviders(() => ClaimStatusesFilterComponent),
        ClaimStatusesLabelPipe,
    ],
})
export class ClaimStatusesFilterComponent extends FilterSuperclass<ClaimStatusesEnum[]> {
    labels$ = this.savedValue$.pipe(
        switchMap((types) =>
            combineLatest((types || []).map((type) => this.claimStatusesLabelPipe.transform(type))),
        ),
        share(),
    );

    constructor(
        injector: Injector,
        private claimStatusesLabelPipe: ClaimStatusesLabelPipe,
    ) {
        super(injector);
    }

    protected isEmpty(value: ClaimStatusesEnum[]): boolean {
        return super.isEmpty(value) || value?.length === Object.keys(ClaimStatusesEnum).length;
    }
}
