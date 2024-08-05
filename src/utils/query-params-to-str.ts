import { Params } from '@angular/router';
import isEmpty from 'lodash-es/isEmpty';
import isNil from 'lodash-es/isNil';

export function queryParamsToStr(params: Params): string {
    return Object.entries(params)
        .reduce((acc, [key, value]) => {
            if (isNil(value) || isEmpty(value)) {
                return acc;
            }
            if (typeof value === 'object' && !Array.isArray(value)) {
                const nestedObjectString = JSON.stringify(value);
                return [...acc, `${key}=${encodeURIComponent(nestedObjectString)}`];
            } else {
                return [...acc, `${key}=${encodeURIComponent(String(value))}`];
            }
        }, [])
        .join('&');
}
