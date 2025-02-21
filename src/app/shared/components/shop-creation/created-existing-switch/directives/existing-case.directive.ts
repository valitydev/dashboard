import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[dshExistingCase]',
    standalone: false,
})
export class ExistingCaseDirective {
    constructor(public templateRef: TemplateRef<unknown>) {}
}
