import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dsh-actionbar',
    templateUrl: 'actionbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ActionbarComponent {}
