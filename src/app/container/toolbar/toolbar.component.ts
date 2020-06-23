import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { BrandType } from '../brand';

@Component({
    selector: 'dsh-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
    @Input() brandType: BrandType = BrandType.normal;
}
