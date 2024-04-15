import * as moment from 'moment-timezone';

export default class DateUtils {

    // ex) 2023-05-17 15:40:08
    static momentNow(): string {
        return moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
    }

    // ex) 2023-05-17 15:40:08
    static momentDate(): string {
        return moment().tz('Asia/Seoul').format('YYYY-MM-DD');
    }
}