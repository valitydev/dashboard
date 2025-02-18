import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'dsh-accordion-item-content',
    templateUrl: 'accordion-item-content.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AccordionItemContentComponent {
    @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<unknown>;
}
