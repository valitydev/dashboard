import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[dshCreatedCase]',
    standalone: false,
})
export class CreatedCaseDirective {
    constructor(public templateRef: TemplateRef<unknown>) {}
}
