const crypto = require('crypto');

export const replaceAll = (txt, search, replacement) => txt.replace(new RegExp(search, 'g'), replacement);

export const subStr = (txt, maxLength = 100) => {
    if (!txt) {
        return '';
    }
    if (txt.length < maxLength) {
        return txt;
    }
    return `${txt.substring(0, maxLength)}...`;
};

export const copyToClipboard = (txt) => {
    const el = document.createElement('textarea');
    el.style.opacity = '0';
    el.style.zIndex = '-1';
    el.style.right = '0px';
    el.style.height = '1px';
    el.style.width = '1px';
    el.style.pointerEvents = 'none';
    document.body.appendChild(el);
    el.value = txt;
    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
        el.contentEditable = true;
        el.readOnly = false;
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        el.setSelectionRange(0, 999999);
    } else {
        el.setAttribute('readonly', '');
        el.select();
    }

    document.execCommand('copy');
    document.body.removeChild(el);
};

export function createConstants(...constants) {
    return constants.reduce((acc, constant) => {
        acc[constant] = constant;
        return acc;
    }, {});
}

export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type];

        return reducer ? reducer(state, action.payload) : state;
    };
}

export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

export const encrypt = text => crypto.pbkdf2Sync(text, 'nosalt', 2000, 256, 'sha256').toString('base64');

export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function convertAuthor(user) {
    if (user.username === 'camjameson') {
        return {
            ...user,
            blogTitle: 'Extraneous Routes',
            blogUri: 'https://camjameson.tumblr.com',
        };
    }
    return user;
}
