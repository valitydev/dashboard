import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { FlexModule } from 'ng-flex-layout';

import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
    declarations: [PageNotFoundComponent],
    imports: [
        RouterModule,
        PageNotFoundRoutingModule,
        TranslocoModule,
        FlexModule,
        MatButtonModule,
    ],
    exports: [PageNotFoundComponent],
})
export class PageNotFoundModule {}
