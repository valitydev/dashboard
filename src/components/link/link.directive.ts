import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: 'a[dshLink]',
    standalone: false
})
export class LinkDirective {
    @HostBinding(`class.dsh-link`) linkClass = true;
}
