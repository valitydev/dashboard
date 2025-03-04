import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { SectionLink, SectionsLinksService } from '@dsh/app/shared/services/sections-links';

@Component({
    selector: 'dsh-mobile-menu',
    templateUrl: './mobile-menu.component.html',
    styleUrls: ['./mobile-menu.component.scss'],
    standalone: false,
})
export class MobileMenuComponent {
    @Output() menuItemSelected: EventEmitter<void> = new EventEmitter<void>();

    sectionLinks$: Observable<SectionLink[]> = this.sectionsLinksService.sectionLinks$;

    constructor(private sectionsLinksService: SectionsLinksService) {}
}
