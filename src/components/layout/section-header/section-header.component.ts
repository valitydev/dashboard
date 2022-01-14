import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-section-header',
    templateUrl: 'section-header.component.html',
    styleUrls: ['section-header.component.scss'],
})
export class SectionHeaderComponent {
    @Input() label: string;
}
