import { Pipe, PipeTransform } from '@angular/core';

import { splitCardNumber } from '@dsh/app/shared/utils/split-card-number';

import { CardBinPan } from '../types/card-bin-pan';

@Pipe({
    name: 'cardBinPanLabel',
    standalone: false,
})
export class CardBinPanLabelPipe implements PipeTransform {
    transform(value: CardBinPan): string {
        const { bin = '', pan = '' } = value || {};
        return bin || pan ? splitCardNumber(`${bin.padEnd(12, '*')}${pan.padEnd(4, '*')}`) : '';
    }
}
