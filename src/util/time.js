import * as moment from 'moment';

export function ms() {
    return moment().valueOf();
}

export function millisToMinutesAndSeconds(millis, defaultVal = '--:--') {
    if (millis === undefined || millis < 0) {
        return defaultVal;
    }

    const seconds = ~~((millis / 1000) % 60);
    const minutes = ~~((millis / (1000 * 60)) % 60);
    const hours = ~~((millis / (1000 * 60 * 60)) % 24);

    if (parseInt(hours, 10) === 0) {
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    return `${hours}:${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export function ms2Str(millis, defaultVal = '') {
    if (millis === undefined || millis < 0) {
        return defaultVal;
    }

    const seconds = ~~((millis / 1000) % 60);
    const minutes = ~~((millis / (1000 * 60)) % 60);
    const hours = ~~((millis / (1000 * 60 * 60)) % 24);

    if (!hours) {
        return `${minutes ? `${minutes} min${minutes > 1 ? 's' : ''}` : ''}  ${seconds} sec`;
    }
    return `${hours} hour ${minutes} min${minutes > 1 ? 's' : ''} ${seconds} sec`;
}

export function ms2Min(millis) {
    if (millis === undefined || millis < 0) {
        return 0;
    }
    const minutes = ~~(millis / (1000 * 60));
    return minutes;
}

export function ms2StrSeo(millis, defaultVal = '') {
    if (millis === undefined || millis < 0) {
        return defaultVal;
    }

    const seconds = ~~((millis / 1000) % 60);
    const minutes = ~~((millis / (1000 * 60)) % 60);
    const hours = ~~((millis / (1000 * 60 * 60)) % 24);

    return `PT${n2Dec(hours)}H${n2Dec(minutes)}M${n2Dec(seconds)}S`;
}

export function n2Dec(number) {
    if (number < 10) {
        return `0${number}`;
    }
    return number;
}

export function convertDateFormat(time, from = 'YYYY-MM-DD', to = 'MMM DD, YYYY') {
    if (!time) {
        return '';
    }
    if (!moment(time, from).isValid()) {
        return time;
    }
    return moment(time, from).format(to);
}

export function millisToFormat(millis, format = 'MMM DD, YYYY') {
    if (!millis) {
        return '';
    }
    return moment(Number(millis)).format(format);
}

export function millisToFormatYear(millis, format = 'YYYY') {
    if (!millis) {
        return '';
    }
    return moment(Number(millis)).format(format);
}

export function startOfWeek() {
    return moment()
        .startOf('isoweek')
        .valueOf();
}

export function currentDateTime() {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    return `${month} ${day}, ${year}`;
}
