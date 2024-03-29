import { Component, Input } from '@angular/core';
import { FormGroupByValue } from '@vality/ng-core';

import { DepositSumFilter } from './types/deposit-sum-filter';

@Component({
    selector: 'dsh-deposit-sum-filter',
    templateUrl: './deposit-sum-filter.component.html',
    styleUrls: ['./deposit-sum-filter.component.scss'],
})
export class DepositSumFilterComponent {
    @Input() form: FormGroupByValue<DepositSumFilter>;
}
