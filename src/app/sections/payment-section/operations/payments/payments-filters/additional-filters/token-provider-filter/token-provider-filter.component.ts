import { Component } from '@angular/core';
import { FormControlSuperclass, createControlProviders } from '@vality/ng-core';
import { SearchPaymentsRequestParams } from '@vality/swag-anapi-v2';

import { AnapiDictionaryService } from '@dsh/app/api/anapi';
import { TokenProvider } from '@dsh/app/api/payments';

@Component({
    selector: 'dsh-token-provider-filter',
    templateUrl: './token-provider-filter.component.html',
    styleUrls: ['./token-provider-filter.component.scss'],
    providers: createControlProviders(() => TokenProviderFilterComponent),
    standalone: false
})
export class TokenProviderFilterComponent extends FormControlSuperclass<
    SearchPaymentsRequestParams['bankCardTokenProvider']
> {
    providers: TokenProvider[] = Object.values(TokenProvider);
    bankCardTokenProviderDict$ = this.anapiDictionaryService.bankCardTokenProvider$;

    constructor(private anapiDictionaryService: AnapiDictionaryService) {
        super();
    }
}
