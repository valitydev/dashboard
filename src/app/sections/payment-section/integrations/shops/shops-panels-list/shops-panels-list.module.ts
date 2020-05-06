import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { SpinnerModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';
import { ConfirmActionDialogModule } from '@dsh/components/popups';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { CategoriesModule } from '../../../../../api';
import { CategoryPipe } from './category.pipe';
import { ShopsPanelsListComponent } from './shops-panels-list.component';

@NgModule({
    imports: [
        LayoutModule,
        MatIconModule,
        FlexLayoutModule,
        CommonModule,
        MatDividerModule,
        ButtonModule,
        TranslocoModule,
        SpinnerModule,
        RouterModule,
        MatDialogModule,
        MatSnackBarModule,
        ClipboardModule,
        ConfirmActionDialogModule,
        CategoriesModule,
        ShowMorePanelModule
    ],
    declarations: [ShopsPanelsListComponent, CategoryPipe],
    exports: [ShopsPanelsListComponent]
})
export class ShopsPanelsListModule {}