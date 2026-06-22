import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-sections',
    template: `<router-outlet></router-outlet>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class SectionsComponent {}
