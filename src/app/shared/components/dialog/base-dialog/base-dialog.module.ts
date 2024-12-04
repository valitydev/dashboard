import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { ActionsModule } from '@dsh/app/shared/components/actions';
import { NoContentModule } from '@dsh/app/shared/directives';
import { BootstrapIconModule } from '@dsh/components/indicators';

import { BaseDialogComponent } from './base-dialog.component';
import { BaseDialogActionsDirective } from './directives/base-dialog-actions/base-dialog-actions.directive';
import { BaseDialogTitleDirective } from './directives/base-dialog-title/base-dialog-title.directive';

const SHARED_DECLARATIONS = [
    BaseDialogComponent,
    BaseDialogActionsDirective,
    BaseDialogTitleDirective,
];

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        NoContentModule,
        TranslocoModule,
        MatDividerModule,
        BootstrapIconModule,
        ActionsModule,
    ],
    declarations: SHARED_DECLARATIONS,
    exports: SHARED_DECLARATIONS,
})
export class BaseDialogModule {}
