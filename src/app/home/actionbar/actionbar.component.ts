import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';

import { DropdownTriggerDirective } from '@dsh/components/layout';

@Component({
    selector: 'dsh-actionbar',
    templateUrl: 'actionbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'component-actionbar' }],
})
export class ActionbarComponent {
    @ViewChild(DropdownTriggerDirective, { static: true }) trigger: DropdownTriggerDirective;

    closeDropdown(): void {
        this.trigger.close();
    }
}
