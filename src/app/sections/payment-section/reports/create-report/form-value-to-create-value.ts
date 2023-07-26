import { CreateReportRequestParams } from '@vality/swag-anapi-v2';
import moment from 'moment';

export const formValueToCreateValue = ({
    fromDate,
    fromTime,
    toDate,
    toTime,
    shopID,
}): Omit<CreateReportRequestParams, 'xRequestID' | 'partyID'> => ({
    fromTime: getDateWithTime(fromDate, fromTime),
    toTime: getDateWithTime(toDate, toTime),
    shopID: shopID || undefined,
    reportType: 'paymentRegistry',
});

export const getDateWithTime = (date: string, time: string): string =>
    moment(`${moment(date).format('YYYY-MM-DD')}, ${time}`, 'YYYY-MM-DD, HH:mm:ss')
        .utc()
        .format();
