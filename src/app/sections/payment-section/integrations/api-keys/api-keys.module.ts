import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { SpinnerModule } from '@dsh/components/indicators';
import { CardModule } from '@dsh/components/layout';

import { ApiKeysRoutingModule } from './api-keys-routing.module';
import { ApiKeysComponent } from './api-keys.component';

@NgModule({
    declarations: [ApiKeysComponent],
    imports: [
        ApiKeysRoutingModule,
        FlexModule,
        TranslocoModule,
        CardModule,
        MatInputModule,
        CommonModule,
        ButtonModule,
        ClipboardModule,
        EmptySearchResultModule,
        SpinnerModule,
        MatSlideToggleModule,
    ],
})
export class ApiKeysModule {}
