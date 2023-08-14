import { Invoice, Shop } from '@vality/swag-anapi-v2';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { getShopNameById } from '@dsh/app/api/shop/utils';

import { InvoicesTableData } from './table';

const toInvoiceTableData = (
    { amount, status, createdAt, shopID, id, currency, product }: Invoice,
    s: Shop[],
): InvoicesTableData | null => ({
    amount,
    currency,
    status,
    createdAt,
    invoiceID: id,
    shopName: getShopNameById(s, shopID),
    product,
});

const invoicesToTableData = (searchResult: Invoice[], s: Shop[]) =>
    searchResult.map((r) => toInvoiceTableData(r, s));

export const mapToInvoicesTableData = (s: Observable<[Invoice[], Shop[]]>) =>
    s.pipe(map(([searchResult, shops]) => invoicesToTableData(searchResult, shops)));
