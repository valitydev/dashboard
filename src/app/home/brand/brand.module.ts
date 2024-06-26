import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { BrandComponent } from './brand.component';

@NgModule({
    declarations: [BrandComponent],
    exports: [BrandComponent],
    imports: [RouterModule, MatIconModule],
    providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class BrandModule {}
