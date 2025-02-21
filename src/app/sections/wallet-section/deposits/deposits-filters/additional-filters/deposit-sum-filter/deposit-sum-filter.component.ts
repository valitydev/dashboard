import { Component, Input } from '@angular/core';
import { FormGroupByValue } from '@vality/matez';

import { DepositSumFilter } from './types/deposit-sum-filter';

@Component({
    selector: 'dsh-deposit-sum-filter',
    templateUrl: './deposit-sum-filter.component.html',
    styleUrls: ['./deposit-sum-filter.component.scss'],
    standalone: false,
})
export class DepositSumFilterComponent {
    @Input() form: FormGroupByValue<DepositSumFilter>;
}
