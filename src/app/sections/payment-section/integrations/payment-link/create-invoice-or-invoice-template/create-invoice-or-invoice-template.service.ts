import { Injectable } from '@angular/core';
import { UntypedFormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { shareReplayRefCount } from '@dsh/app/custom-operators';
import { ShopsDataService } from '@dsh/app/shared';

import { filterShopsByRealm } from '../../../operations/operators';

@Injectable()
export class CreateInvoiceOrInvoiceTemplateService {
    form = this.fb.group({ type: null });
    createInvoiceFormControl = new FormControl();

    shops$ = this.route.params.pipe(
        map((params) => params?.realm),
        filterShopsByRealm(this.shopsDataService.shops$),
        shareReplayRefCount(),
    );

    constructor(
        private fb: UntypedFormBuilder,
        private route: ActivatedRoute,
        private shopsDataService: ShopsDataService,
    ) {}
}
