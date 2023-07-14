import { getCurrencySymbol } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { createControlProviders } from '@vality/ng-core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { FilterSuperclass } from '@dsh/components/filter';

@Component({
    selector: 'dsh-currency-filter',
    templateUrl: 'currency-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => CurrencyFilterComponent),
})
export class CurrencyFilterComponent extends FilterSuperclass<string> {
    @Input() currencies: string[] = [];

    activeLabel$ = combineLatest([
        this.savedValue$,
        this.transloco.selectTranslate<string>('currencyFilter.label', null, 'components'),
    ]).pipe(map(([v, label]) => `${label} · ${getCurrencySymbol(v, 'narrow')}`));

    constructor(injector: Injector, private transloco: TranslocoService) {
        super(injector);
    }
}
