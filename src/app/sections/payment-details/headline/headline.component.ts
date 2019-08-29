import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-headline',
    templateUrl: 'headline.component.html',
    styleUrls: ['headline.component.scss']
})
export class HeadlineComponent {
    @Input() paymentID: string;
}