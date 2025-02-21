import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@jsverse/transloco';
import { FormControlSuperclass, createControlProviders } from '@vality/matez';
import { Identity } from '@vality/swag-wallet';
import { FlexModule } from 'ng-flex-layout';

import { IdentitiesService } from '@dsh/app/api/wallet';

@Component({
    selector: 'dsh-identity-field',
    imports: [
        CommonModule,
        FlexModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        ReactiveFormsModule,
        TranslocoModule,
    ],
    templateUrl: './identity-field.component.html',
    providers: createControlProviders(() => IdentityFieldComponent),
})
export class IdentityFieldComponent extends FormControlSuperclass<Identity['id']> {
    @Input() required = false;

    identities$ = this.identitiesService.identities$;

    constructor(private identitiesService: IdentitiesService) {
        super();
    }
}
