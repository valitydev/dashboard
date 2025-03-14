import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-details-item',
    templateUrl: 'details-item.component.html',
    styleUrls: ['details-item.component.scss'],
    standalone: false,
})
export class DetailsItemComponent {
    @Input() title: string;
}
