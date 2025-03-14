import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[dshExpandableRadioGroupItem]',
    standalone: false,
})
export class ExpandableRadioGroupItemDirective {
    @Input()
    dshExpandableRadioGroupItem: string | number;

    constructor(public readonly templateRef: TemplateRef<ExpandableRadioGroupItemDirective>) {}
}
