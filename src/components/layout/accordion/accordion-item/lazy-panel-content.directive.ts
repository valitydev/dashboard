import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: 'ng-template[dshLazyPanelContent]',
    standalone: false
})
export class LazyPanelContentDirective {
    constructor(public _template: TemplateRef<unknown>) {}
}
