import {
    ChangeDetectorRef,
    DestroyRef,
    Directive,
    Input,
    OnChanges,
    OnInit,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@jsverse/transloco';
import { ComponentChanges } from '@vality/matez';

import { TextComponent } from './components/text/text.component';

@Directive({
    selector: '[dsh-empty],[dshEmpty]',
    standalone: false,
})
export class EmptyDirective implements OnChanges, OnInit {
    @Input() dshEmpty: boolean;
    @Input() dshEmptyText: string;

    private defaultEmptyText: string;

    constructor(
        private templateRef: TemplateRef<unknown>,
        private viewContainer: ViewContainerRef,
        private translocoService: TranslocoService,
        private cdr: ChangeDetectorRef,
        private dr: DestroyRef,
    ) {}

    ngOnInit() {
        this.translocoService
            .selectTranslate<string>('empty.emptyData', null, 'core-components')
            .pipe(takeUntilDestroyed(this.dr))
            .subscribe((text) => {
                this.defaultEmptyText = text;
                this.update();
            });
    }

    ngOnChanges({ dshEmpty }: ComponentChanges<EmptyDirective>) {
        if (
            this.defaultEmptyText &&
            dshEmpty &&
            (dshEmpty.currentValue !== dshEmpty.previousValue || dshEmpty.firstChange)
        ) {
            this.update();
        }
    }

    private update() {
        this.viewContainer.clear();
        if (this.dshEmpty) {
            const textComponent = this.viewContainer.createComponent(TextComponent);
            textComponent.instance.text = this.dshEmptyText;
        } else {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
        this.cdr.detectChanges();
    }
}
