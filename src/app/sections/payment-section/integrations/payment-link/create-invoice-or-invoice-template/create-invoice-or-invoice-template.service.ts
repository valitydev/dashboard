import { Injectable } from '@angular/core';
import { UntypedFormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { pluck, shareReplay } from 'rxjs/operators';

import { SHARE_REPLAY_CONF } from '@dsh/app/custom-operators';
import { ShopsDataService } from '@dsh/app/shared';

import { filterShopsByRealm } from '../../../operations/operators';

@Injectable()
export class CreateInvoiceOrInvoiceTemplateService {
    form = this.fb.group({ type: null });
    createInvoiceFormControl = new FormControl();

    shops$ = this.route.params.pipe(
        pluck('realm'),
        filterShopsByRealm(this.shopsDataService.shops$),
        shareReplay(SHARE_REPLAY_CONF),
    );

    constructor(
        private fb: UntypedFormBuilder,
        private route: ActivatedRoute,
        private shopsDataService: ShopsDataService,
    ) {}
}
