import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DebouncePipe } from './debounce.pipe';

@NgModule({
    declarations: [DebouncePipe],
    exports: [DebouncePipe],
    imports: [CommonModule],
})
export class DebounceModule {}
