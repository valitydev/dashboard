import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { createControlProviders } from '@vality/matez';

import { FilterSuperclass } from '@dsh/components/filter';
import { binValidator, panValidator } from '@dsh/components/form-controls';

import { CardBinPan } from './types/card-bin-pan';

@Component({
    selector: 'dsh-card-bin-pan-filter',
    templateUrl: './card-bin-pan-filter.component.html',
    styleUrls: ['./card-bin-pan-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: createControlProviders(() => CardBinPanFilterComponent),
    standalone: false,
})
export class CardBinPanFilterComponent extends FilterSuperclass<CardBinPan> {
    control = this.fb.group({
        bin: ['', binValidator],
        pan: ['', panValidator],
    });

    get empty(): CardBinPan {
        return { bin: '', pan: '' };
    }

    constructor(
        injector: Injector,
        private fb: FormBuilder,
    ) {
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
        if (inner.bin) {
            result.bin = inner.bin;
        }
        if (inner.pan) {
            result.pan = inner.pan;
        }
        return result;
    }
}
