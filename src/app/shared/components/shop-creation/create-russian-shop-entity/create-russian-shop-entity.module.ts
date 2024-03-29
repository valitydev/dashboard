import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { ContractorDetailsModule } from '@dsh/app/shared';
import { PayoutToolDetailsModule } from '@dsh/app/shared/components';
import { BaseDialogModule } from '@dsh/app/shared/components/dialog/base-dialog';
import { PaymentInstitutionFieldModule } from '@dsh/app/shared/components/inputs/payment-institution-field';
import { ShopFieldModule } from '@dsh/app/shared/components/inputs/shop-field';
import { CreatedExistingSwitchModule } from '@dsh/app/shared/components/shop-creation/created-existing-switch/created-existing-switch.module';
import { ExistingBankAccountModule } from '@dsh/app/shared/components/shop-creation/existing-bank-account/existing-bank-account.module';
import { ExistingContractFormModule } from '@dsh/app/shared/components/shop-creation/existing-contract-form/existing-contract-form.module';
import { ShopDetailsFormModule } from '@dsh/app/shared/components/shop-creation/shop-details-form/shop-details-form.module';
import { ButtonModule } from '@dsh/components/buttons';
import { FormatInputModule } from '@dsh/components/form-controls';
import { DetailsItemModule } from '@dsh/components/layout';

import { ShopPayoutToolDetailsService } from '../../../../sections/payment-section/shops/services/shop-payout-tool-details/shop-payout-tool-details.service';
import { CurrencyAutocompleteFieldModule } from '../../inputs/currency-autocomplete-field';

import { NewContractorFormComponent } from './components/new-contractor-form/new-contractor-form.component';
import { OrgDetailsFormComponent } from './components/org-details-form/org-details-form.component';
import { RussianBankAccountFormComponent } from './components/russian-bank-account-form/russian-bank-account-form.component';
import { ShopFormComponent } from './components/shop-form/shop-form.component';
import { CreateRussianShopEntityComponent } from './create-russian-shop-entity.component';
import { CreateRussianShopEntityService } from './services/create-russian-shop-entity/create-russian-shop-entity.service';

@NgModule({
    imports: [
        CommonModule,
        TranslocoModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatRadioModule,
        FormatInputModule,
        MatSelectModule,
        PayoutToolDetailsModule,
        ButtonModule,
        DetailsItemModule,
        BaseDialogModule,
        ShopFieldModule,
        ShopDetailsFormModule,
        ContractorDetailsModule,
        PaymentInstitutionFieldModule,
        CreatedExistingSwitchModule,
        ExistingContractFormModule,
        ExistingBankAccountModule,
        CurrencyAutocompleteFieldModule,
    ],
    declarations: [
        CreateRussianShopEntityComponent,
        OrgDetailsFormComponent,
        ShopFormComponent,
        RussianBankAccountFormComponent,
        NewContractorFormComponent,
    ],
    exports: [CreateRussianShopEntityComponent],
    providers: [CreateRussianShopEntityService, ShopPayoutToolDetailsService],
})
export class CreateRussianShopEntityModule {}
