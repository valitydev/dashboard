import { Component, HostBinding } from '@angular/core';

@Component({
    template: '{{text}}',
    styleUrls: ['text.component.scss'],
    standalone: false
})
export class TextComponent {
    @HostBinding('class.dsh-headline') dshHeadlineClass = true;

    text: string;
}
