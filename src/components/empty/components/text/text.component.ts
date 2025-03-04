import { Component, HostBinding } from '@angular/core';

@Component({
    template: '{{text}}',
    styleUrls: ['text.component.scss'],
    standalone: false,
})
export class TextComponent {
    @HostBinding('class.mat-headline-small') dshHeadlineClass = true;

    text: string;
}
