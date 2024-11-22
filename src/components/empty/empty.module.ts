import { NgModule } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

import { TextComponent } from './components/text/text.component';
import { EmptyDirective } from './empty.directive';

@NgModule({
    imports: [TranslocoModule],
    declarations: [EmptyDirective, TextComponent],
    exports: [EmptyDirective],
})
export class EmptyModule {}
