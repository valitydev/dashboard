import { NgModule } from '@angular/core';

import { CurrencyFilterModule } from './currency-filter';
import { InvoicesFilterModule } from './invoices-filter';

const EXPORTED_MODULES = [CurrencyFilterModule, InvoicesFilterModule];

@NgModule({
    imports: EXPORTED_MODULES,
    exports: EXPORTED_MODULES,
})
export class FiltersModule {}
