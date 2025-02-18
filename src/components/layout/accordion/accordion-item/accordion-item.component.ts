import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EventEmitter,
    Input,
    Output,
    OnChanges,
} from '@angular/core';
import { ComponentChanges } from '@vality/ng-core';

import { AccordionItemContentComponent } from '../accordion-item-content';

import { EXPAND_ANIMATION } from './expand-animation';
import { LazyPanelContentDirective } from './lazy-panel-content.directive';

@Component({
    selector: 'dsh-accordion-item',
    templateUrl: 'accordion-item.component.html',
    styleUrls: ['accordion-item.component.scss'],
    animations: [EXPAND_ANIMATION],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AccordionItemComponent implements OnChanges {
    @Output() expandedChange = new EventEmitter<boolean>();

    @Input()
    get expanded(): boolean {
        return this._expanded;
    }
    set expanded(expanded: unknown) {
        this._expanded = Boolean(expanded);
        this.expandedChange.emit(this.expanded);
    }

    @ContentChild(AccordionItemContentComponent)
    accordionItemContent: AccordionItemContentComponent;

    @ContentChild(LazyPanelContentDirective)
    lazyContent: LazyPanelContentDirective;

    private _expanded = false;

    ngOnChanges(changes: ComponentChanges<AccordionItemComponent>) {
        if (changes.expanded) {
            this.expandedChange.emit(this.expanded);
        }
    }

    expand(): void {
        if (!this.expanded) {
            this.expanded = true;
        }
    }

    collapse(e?: MouseEvent): void {
        if (this.expanded) {
            this.expanded = false;
            if (e) {
                e.stopPropagation();
            }
        }
    }
}
