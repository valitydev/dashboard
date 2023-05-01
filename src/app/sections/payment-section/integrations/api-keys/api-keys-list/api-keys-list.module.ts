import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { ApiKeysListComponent } from './api-keys-list.component';

@NgModule({
    imports: [
        TranslocoModule,
        MatSnackBarModule,
        LayoutModule,
        FlexLayoutModule,
        CommonModule,
        IndicatorsModule,
        MatDividerModule,
        ButtonModule,
    ],
    declarations: [ApiKeysListComponent],
    exports: [ApiKeysListComponent],
})
export class ApiKeysListModule {}
