import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    ViewEncapsulation,
    booleanAttribute,
} from '@angular/core';

@Component({
    selector: 'dsh-menu-item',
    template: `<ng-content></ng-content>`,
    styleUrls: ['menu-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class MenuItemComponent {
    @Input({ transform: booleanAttribute }) @HostBinding('class.dsh-menu-item-header') header =
        false;
    @Input({ transform: booleanAttribute }) @HostBinding('class.dsh-menu-item-link') link = true;

    @HostBinding('class.dsh-menu-item') dshMenuItemClass = true;
}
