import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexModule } from 'ng-flex-layout';

import { ClaimsService } from '@dsh/app/api/claim-management';
import { ShopCreationModule } from '@dsh/app/shared/components/shop-creation';
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
        MatButtonModule,
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
