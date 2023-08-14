import { NgModule } from '@angular/core';

import { FormatInputModule } from './format-input';

@NgModule({
    imports: [FormatInputModule],
    exports: [FormatInputModule],
})
export class FormControlsModule {}
