import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyOptionModule as MatOptionModule } from '@angular/material/legacy-core';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { TranslocoModule } from '@ngneat/transloco';

import { ClaimsService } from '@dsh/api/claim-management';
import { ShopCreationModule } from '@dsh/app/shared/components/shop-creation';
import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule, SectionHeaderModule } from '@dsh/components/layout';
import { StateNavModule } from '@dsh/components/navigation';

import { ClaimsListModule } from './claims-list';
import { ClaimsRoutingModule } from './claims-routing.module';
import { ClaimsSearchFiltersModule } from './claims-search-filters';
import { ClaimsComponent } from './claims.component';

@NgModule({
    imports: [
        ClaimsRoutingModule,
        LayoutModule,
        FlexModule,
        MatOptionModule,
        TranslocoModule,
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        IndicatorsModule,
        MatIconModule,
        StateNavModule,
        ButtonModule,
        ClaimsListModule,
        ClaimsSearchFiltersModule,
        ShopCreationModule,
        SectionHeaderModule,
    ],
    declarations: [ClaimsComponent],
    exports: [ClaimsComponent],
    providers: [ClaimsService],
})
export class ClaimsModule {}
