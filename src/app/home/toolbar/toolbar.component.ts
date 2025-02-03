import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { BRAND_NAME } from '@dsh/app/sections/tokens';
import { SectionsLinksService } from '@dsh/app/shared/services/sections-links';

@Component({
    selector: 'dsh-toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
    sectionLinks$ = this.sectionsLinksService.sectionLinks$;

    constructor(
        private sectionsLinksService: SectionsLinksService,
        @Inject(BRAND_NAME) public brandName: string,
    ) {}
}
