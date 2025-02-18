import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ComponentChanges } from '@vality/matez';
import { Claim } from '@vality/swag-claim-management';

import { ClaimStatusesEnum } from '@dsh/app/shared/components/inputs/claim-statuses-field/types/claim-statuses-enum';
import { getFormValueChanges } from '@dsh/utils';

export interface Filters {
    claimID: Claim['id'];
    claimStatuses?: ClaimStatusesEnum[];
}

@Component({
    selector: 'dsh-claims-search-filters',
    templateUrl: 'claims-search-filters.component.html',
})
export class ClaimsSearchFiltersComponent implements OnInit, OnChanges {
    @Input() initParams: Filters;
    @Output() searchParamsChanges = new EventEmitter<Filters>();

    form = this.fb.group<Filters>({ claimStatuses: null, claimID: null });

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        getFormValueChanges(this.form)
            .pipe(takeUntilDestroyed(this.dr))
            .subscribe((filters) => this.searchParamsChanges.next(filters as unknown as Filters));
    }

    ngOnChanges({ initParams }: ComponentChanges<ClaimsSearchFiltersComponent>): void {
        if (initParams?.firstChange && initParams.currentValue) {
            this.form.patchValue(initParams.currentValue as unknown);
        }
    }
}
