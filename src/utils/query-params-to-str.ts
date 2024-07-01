import { Params } from '@angular/router';
import isEmpty from 'lodash-es/isEmpty';
import isNil from 'lodash-es/isNil';

export function queryParamsToStr(params: Params): string {
    return Object.entries(params)
        .reduce((acc, [key, value]) => {
            if (isNil(value) || isEmpty(value)) {
                return acc;
            }
            return [...acc, `${key}=${encodeURIComponent(String(value))}`];
        }, [])
        .join('&');
}
