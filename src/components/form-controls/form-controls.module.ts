import { NgModule } from '@angular/core';

import { FormatInputModule } from './format-input';
import { SelectSearchFieldModule } from './select-search-field';

const EXPORTED_DECLARATIONS = [FormatInputModule, SelectSearchFieldModule];

@NgModule({
    imports: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class FormControlsModule {}
