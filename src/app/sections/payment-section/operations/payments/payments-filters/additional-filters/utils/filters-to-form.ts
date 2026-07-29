import { AdditionalFilters, AdditionalFiltersForm } from '../types';

export const filtersToForm = ({
    payerEmail = null,
    payerIP = null,
    customerID = null,
    rrn = null,
    externalID = null,
    paymentStatus = null,
    paymentAmountFrom = null,
    paymentAmountTo = null,
    tokenProvider = null,
    paymentSystem = null,
    invoiceIDs = null,
    shopIDs = null,
    binPan = null,
}: AdditionalFilters): AdditionalFiltersForm => ({
    main: {
        payerEmail,
        payerIP,
        customerID,
        rrn,
        externalID,
    },
    paymentStatus,
    paymentSum: {
        paymentAmountFrom,
        paymentAmountTo,
    },
    tokenProvider,
    paymentSystem,
    invoices: { invoiceIDs },
    shops: { shopIDs },
    binPan,
});
