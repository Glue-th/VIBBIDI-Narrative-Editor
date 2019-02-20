import moment from 'moment';

export const DEFAULT_DATE_FORMAT = 'DD/MM/YYYY';

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

export function guid() {
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`; // eslint-disable-line
}

export function formatDate(dateValue, formatStr) {
    return dateValue == null
        ? null
        : typeof dateValue.getMonth === 'function'
            ? moment(dateValue).format(formatStr)
            : null;
}

export function convertStringToDate(dateStr, formatStr) {
    return dateStr == null ? null : moment(dateStr, formatStr);
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}

export function formatTimestamp(timestampValue, formatStr) {
    if (timestampValue) {
        const d = new Date(timestampValue);
        return formatDate(d, formatStr);
    }
    return null;
}

export function convertTypeTimeFomart(timestampValue, formatFrom, formatTo) {
    if (timestampValue) {
        const d = moment(timestampValue).format(formatFrom);
        return formatTimestamp(d, formatTo);
    }
    return null;
}

export function formatDisplayedNumber(val) {
    return val === undefined ? val : val.toLocaleString('en');
}

export function capitalizeFirstLetter(str) {
    return str === undefined || str === null || str.length === 0
        ? str
        : str.charAt(0).toUpperCase() + str.slice(1);
}

const isIgnored = (ignoreKeys, key) => (ignoreKeys ? ignoreKeys.includes(key) : null);
const isExisted = value => value !== undefined && value !== null && value !== ' ';

export function convertFormToParameter(form, transformFunction, timestampKeys, ignoreKeys) {
    return Object.entries(form)
        .filter(([key, value]) => isExisted(value) && !isIgnored(ignoreKeys, key))
        .map(([key, value]) => [
            key,
            timestampKeys && timestampKeys.includes(key)
                ? formatTimestamp(value, DEFAULT_DATE_FORMAT)
                : value,
        ])
        .reduce(
            (acc, [key, value]) => ({
                ...acc,
                [key]: transformFunction ? transformFunction(key, value) : value,
            }),
            {},
        );
}

export function convertFormToParameterIfUndefined(form, transformFunc) {
    return Object.entries(form)
        .filter(item => item[1] !== '' && item[1] !== undefined && item[1] !== null)
        .reduce(
            (accu, curr) => ({
                ...trimObjValues(accu),
                [curr[0]]: transformFunc(curr[0], curr[1]),
            }),
            {},
        );
}

export function trimObjValues(obj) {
    return Object.keys(obj).reduce((acc, curr) => {
        acc[curr] = typeof obj[curr] === 'string' ? obj[curr].trim() : obj[curr];
        return acc;
    }, {});
}

export const getFormatNumber = decimalCount => `0,0${decimalCount === 0 ? '' : '.'.concat('0'.repeat(decimalCount))}`;

export const isNotNull = e => e !== undefined && e !== null;

export const isNotEmpty = e => isNotNull(e) && e.length > 0;

export const isArrayNotEmpty = e => isNotNull(e) && e instanceof Array && e.length > 0;

export function urlToList(url) {
    const urllist = url.split('/').filter(i => i);
    return urllist.map((urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`);
}
