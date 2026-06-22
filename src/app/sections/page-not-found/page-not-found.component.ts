import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-page-not-found',
    templateUrl: 'page-not-found.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class PageNotFoundComponent {
    constructor(private location: Location) {}

    back() {
        this.location.back();
    }
}
