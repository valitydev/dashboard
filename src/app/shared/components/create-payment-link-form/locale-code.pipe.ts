import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, map } from 'rxjs';

@Pipe({
    name: 'localeCode',
})
export class LocaleCode implements PipeTransform {
    constructor(private t: TranslocoService) {}

    transform(localeCode: string): Observable<string> {
        return this.t
            .selectTranslation('components')
            .pipe(
                map(
                    (keys) => keys[`createPaymentLinkForm.localeCodes.${localeCode}`] || localeCode,
                ),
            );
    }
}
