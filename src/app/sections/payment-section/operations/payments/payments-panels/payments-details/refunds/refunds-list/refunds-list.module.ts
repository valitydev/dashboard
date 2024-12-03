import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { RefundDetailsModule } from '@dsh/app/shared/components';
import { SpinnerModule } from '@dsh/components/indicators';

import { RefundsListComponent } from './refunds-list.component';

@NgModule({
    imports: [
        CommonModule,
        RefundDetailsModule,
        MatDividerModule,
        FlexLayoutModule,
        TranslocoModule,
        MatButtonModule,
        SpinnerModule,
        RouterModule,
        MatIconModule,
    ],
    declarations: [RefundsListComponent],
    exports: [RefundsListComponent],
})
export class RefundsListModule {}
