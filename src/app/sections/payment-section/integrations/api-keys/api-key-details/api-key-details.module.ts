import { FlexLayoutModule } from 'ng-flex-layout';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';
import { TranslocoModule } from '@jsverse/transloco';

import { DialogModule } from '@vality/matez';

import { ApiKeyDetailsComponent } from './api-key-details.component';
import { ApiKeyDeleteDialogComponent } from './components/api-key-delete-dialog/api-key-delete-dialog.component';

@NgModule({
    imports: [
        TranslocoModule,
        MatSnackBarModule,
        LayoutModule,
        FlexLayoutModule,
        CommonModule,
        IndicatorsModule,
        MatDividerModule,
        MatButtonModule,
        ApiKeyDeleteDialogComponent,
        DialogModule,
    ],
    declarations: [ApiKeyDetailsComponent],
    exports: [ApiKeyDetailsComponent],
})
export class ApiKeyDetailsModule {}
