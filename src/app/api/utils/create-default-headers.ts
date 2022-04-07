import { HttpHeaders } from '@angular/common/http';

export function createDefaultHeaders() {
    return new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
}

export const DEFAULT_HEADERS = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
