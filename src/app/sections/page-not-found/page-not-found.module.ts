import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { FlexModule } from 'ng-flex-layout';

import { ButtonModule } from '@dsh/components/buttons';

import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
    declarations: [PageNotFoundComponent],
    imports: [RouterModule, PageNotFoundRoutingModule, TranslocoModule, FlexModule, ButtonModule],
    exports: [PageNotFoundComponent],
})
export class PageNotFoundModule {}
