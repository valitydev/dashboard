import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexLayoutModule } from 'ng-flex-layout';

import { AuthModule } from '@dsh/app/auth';
import { LayoutModule } from '@dsh/components/layout';
import { ScrollUpModule } from '@dsh/components/navigation';

import { OperationsRoutingModule } from './operations-routing.module';
import { OperationsComponent } from './operations.component';

@NgModule({
    imports: [
        CommonModule,
        OperationsRoutingModule,
        LayoutModule,
        FlexLayoutModule,
        TranslocoModule,
        ScrollUpModule,
        MatTabsModule,
        AuthModule,
    ],
    declarations: [OperationsComponent],
})
export class OperationsModule {}
