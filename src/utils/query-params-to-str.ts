import { Params } from '@angular/router';

export function queryParamsToStr(params: Params): string {
    return Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
        .join('&');
}
