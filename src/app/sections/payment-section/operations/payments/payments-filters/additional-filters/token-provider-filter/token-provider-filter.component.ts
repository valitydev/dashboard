import { Component, Injector } from '@angular/core';
import { provideValueAccessor, WrappedFormControlSuperclass } from '@s-libs/ng-core';
import { BankCardTokenProvider } from '@vality/swag-anapi-v2';

import { AnapiDictionaryService } from '@dsh/api/anapi';

@Component({
    selector: 'dsh-token-provider-filter',
    templateUrl: './token-provider-filter.component.html',
    styleUrls: ['./token-provider-filter.component.scss'],
    providers: [provideValueAccessor(TokenProviderFilterComponent)],
})
export class TokenProviderFilterComponent extends WrappedFormControlSuperclass<BankCardTokenProvider> {
    providers = Object.values(BankCardTokenProvider);
    bankCardTokenProviderDict$ = this.anapiDictionaryService.bankCardTokenProvider$;

    constructor(injector: Injector, private anapiDictionaryService: AnapiDictionaryService) {
        super(injector);
    }
}
