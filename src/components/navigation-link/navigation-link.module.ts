import { FlexModule } from 'ng-flex-layout';

import { NgModule } from '@angular/core';

import { NavigationLinkComponent } from './navigation-link.component';

@NgModule({
    declarations: [NavigationLinkComponent],
    imports: [FlexModule],
    exports: [NavigationLinkComponent],
})
export class NavigationLinkModule {}
