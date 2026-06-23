import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { getCurrencySymbol } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { FilterSuperclass } from '@dsh/components/filter';
import { TranslocoService } from '@jsverse/transloco';

import { createControlProviders } from '@vality/matez';

@Component({
    selector: 'dsh-currency-filter',
    templateUrl: 'currency-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => CurrencyFilterComponent),
    standalone: false,
})
export class CurrencyFilterComponent extends FilterSuperclass<string> {
    @Input() currencies: string[] = [];

    activeLabel$ = combineLatest([
        this.savedValue$,
        this.transloco.selectTranslate<string>('currencyFilter.label', null, 'components'),
    ]).pipe(map(([v, label]) => `${label} · ${getCurrencySymbol(v, 'narrow')}`));

    constructor(
        injector: Injector,
        private transloco: TranslocoService,
    ) {
        super(injector);
    }
}
