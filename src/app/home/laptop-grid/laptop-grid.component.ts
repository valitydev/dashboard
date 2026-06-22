import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-laptop-grid',
    templateUrl: './laptop-grid.component.html',
    styleUrls: ['./laptop-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
})
export class LaptopGridComponent {}
