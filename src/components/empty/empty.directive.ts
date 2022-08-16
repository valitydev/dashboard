import { Directive, Input, OnChanges, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ComponentChanges } from '@dsh/type-utils';

import { TextComponent } from './components/text/text.component';

@UntilDestroy()
@Directive({
    selector: '[dsh-empty],[dshEmpty]',
})
export class EmptyDirective implements OnChanges, OnInit {
    @Input() dshEmpty: unknown;
    @Input() dshEmptyText: string;

    private defaultEmptyText: string;

    constructor(
        private templateRef: TemplateRef<unknown>,
        private viewContainer: ViewContainerRef,
        private translocoService: TranslocoService
    ) {}

    ngOnInit() {
        this.translocoService
            .selectTranslate<string>('empty.emptyData', null, 'core-components')
            .pipe(untilDestroyed(this))
            .subscribe((text) => {
                this.defaultEmptyText = text;
                this.update();
            });
    }

    ngOnChanges({ dshEmpty }: ComponentChanges<EmptyDirective>) {
        if (dshEmpty && (dshEmpty.currentValue !== dshEmpty.previousValue || dshEmpty.firstChange)) {
            this.update();
        }
    }

    private update() {
        if (this.dshEmpty) {
            this.viewContainer.clear();
            const textComponent = this.viewContainer.createComponent(TextComponent);
            textComponent.instance.text = this.dshEmptyText;
        } else {
            this.viewContainer.clear();
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
}
