import { Component, Injector } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { SearchPaymentsRequestParams } from '@vality/swag-anapi-v2';

import { AnapiDictionaryService } from '@dsh/api/anapi';
import { TokenProvider } from '@dsh/api/payments';

@Component({
    selector: 'dsh-token-provider-filter',
    templateUrl: './token-provider-filter.component.html',
    styleUrls: ['./token-provider-filter.component.scss'],
    providers: [provideValueAccessor(TokenProviderFilterComponent)],
})
export class TokenProviderFilterComponent extends WrappedFormControlSuperclass<
    SearchPaymentsRequestParams['bankCardTokenProvider']
> {
    providers: TokenProvider[] = Object.values(TokenProvider);
    bankCardTokenProviderDict$ = this.anapiDictionaryService.bankCardTokenProvider$;

    constructor(injector: Injector, private anapiDictionaryService: AnapiDictionaryService) {
        super(injector);
    }
}
