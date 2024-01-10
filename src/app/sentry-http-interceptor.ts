import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as sentry from '@sentry/angular-ivy';
import isNil from 'lodash-es/isNil';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SentryHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(req).pipe(
            catchError((resp) => {
                const xRequestId = req.headers.get('x-request-id');
                if (!isNil(xRequestId)) {
                    sentry.setTag('x-request-id', xRequestId);
                }
                return throwError(resp);
            }),
        );
    }
}
