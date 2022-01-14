import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'dsh-no-shops-alert',
    templateUrl: 'no-shops-alert.component.html',
    styleUrls: ['no-shops-alert.component.scss'],
})
export class NoShopsComponent {
    @Output() action: EventEmitter<void> = new EventEmitter<void>();
}
