import {
    ChangeDetectionStrategy,
    Component,
    Directive,
    HostBinding,
    ViewEncapsulation,
} from '@angular/core';

@Component({
    selector: 'dsh-card',
    styleUrls: ['card.component.scss'],
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class CardComponent {
    @HostBinding('class.dsh-card') class = true;
}

@Component({
    selector: 'dsh-card-header',
    template: `
        <ng-content select="dsh-card-title, [dsh-card-title], [dshCardTitle]"></ng-content>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class CardHeaderComponent {
    @HostBinding('class.dsh-card-header') class = true;
}

@Component({
    selector: 'dsh-card-content',
    template: `<ng-content></ng-content>`,
    standalone: false,
})
export class CardContentComponent {
    @HostBinding('class.dsh-card-content') class = true;
}

@Component({
    selector: 'dsh-card-actions',
    exportAs: 'dshCardActions',
    template: `<ng-content></ng-content>`,
    standalone: false,
})
export class CardActionsComponent {
    @HostBinding('class.dsh-card-actions') class = true;
}

@Directive({
    selector: `dsh-card-title, [dsh-card-title], [dshCardTitle]`,
    standalone: false,
})
export class CardTitleDirective {
    @HostBinding('class.dsh-card-title') class = true;
}
