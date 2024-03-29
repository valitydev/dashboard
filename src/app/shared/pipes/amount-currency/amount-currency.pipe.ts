import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { Pipe, PipeTransform, Inject, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { toMajor } from '@vality/ng-core';

@Pipe({
    name: 'amountCurrency',
})
export class AmountCurrencyPipe implements PipeTransform {
    constructor(
        @Inject(LOCALE_ID) private _locale: string,
        @Inject(DEFAULT_CURRENCY_CODE) private _defaultCurrencyCode: string = 'USD',
    ) {}

    transform(
        amount: number,
        currencyCode: string = this._defaultCurrencyCode,
        format: 'short' | 'long' = 'long',
    ): string {
        const locale = this._locale;
        return formatCurrency(
            toMajor(amount, currencyCode),
            locale,
            getCurrencySymbol(currencyCode, 'narrow', locale),
            currencyCode,
            format === 'short' ? '0.0-2' : undefined,
        );
    }
}
