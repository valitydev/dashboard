import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { FormBuilder } from '@ngneat/reactive-forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { FilterSuperclass } from '@dsh/components/filter';
import { binValidator, lastDigitsValidator } from '@dsh/components/form-controls';
import { provideValueAccessor } from '@dsh/utils';

import { CardBinPan } from './types/card-bin-pan';

@UntilDestroy()
@Component({
    selector: 'dsh-card-bin-pan-filter',
    templateUrl: './card-bin-pan-filter.component.html',
    styleUrls: ['./card-bin-pan-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(() => CardBinPanFilterComponent)],
})
export class CardBinPanFilterComponent extends FilterSuperclass<CardBinPan> {
    control = this.fb.group<CardBinPan>({
        bin: ['', binValidator],
        pan: ['', lastDigitsValidator],
    });

    get empty(): CardBinPan {
        return { bin: '', pan: '' };
    }

    constructor(injector: Injector, private fb: FormBuilder) {
        super(injector);
    }

    save(): void {
        const { bin, pan } = this.control.controls;
        this.set({ bin: bin.valid ? bin.value : '', pan: pan.valid ? pan.value : '' });
    }

    protected isEmpty(value: CardBinPan): boolean {
        return super.isEmpty(value) || (!value.bin && !value.pan);
    }

    protected innerToOuterValue(inner: CardBinPan): CardBinPan {
        const result: CardBinPan = {};
        if (inner.bin) result.bin = inner.bin;
        if (inner.pan) result.pan = inner.pan;
        return result;
    }
}
