import { Component } from '@angular/core';
import { WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { SearchPaymentsRequestParams } from '@vality/swag-anapi-v2';

import { AnapiDictionaryService } from '@dsh/app/api/anapi';
import { TokenProvider } from '@dsh/app/api/payments';
import { provideValueAccessor } from '@dsh/utils';

@Component({
    selector: 'dsh-token-provider-filter',
    templateUrl: './token-provider-filter.component.html',
    styleUrls: ['./token-provider-filter.component.scss'],
    providers: [provideValueAccessor(() => TokenProviderFilterComponent)],
})
export class TokenProviderFilterComponent extends WrappedFormControlSuperclass<
    SearchPaymentsRequestParams['bankCardTokenProvider']
> {
    providers: TokenProvider[] = Object.values(TokenProvider);
    bankCardTokenProviderDict$ = this.anapiDictionaryService.bankCardTokenProvider$;

    constructor(private anapiDictionaryService: AnapiDictionaryService) {
        super();
    }
}
