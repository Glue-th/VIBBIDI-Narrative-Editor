// [styled-components] ThemeProvider
// https://www.styled-components.com/docs/advanced#theming
// https://www.styled-components.com/docs/api#themeprovider

// font-family
const fontFamily = {
    PRIMARY: '"Barlow Condensed", sans-serif',
    SECONDARY: '"Barlow", sans-serif',
    TERTIARY: '"Nothing You Could Do", cursive',
};

// color
const color = {
    BG_PRIMARY: '#fff',
    BG_PRIMARY_TRANSPARENT: 'rgba(23, 20, 25, 0)',
    FG_PRIMARY: 'rgba(0, 0, 0, 0.65)',
};

// font-size
const fontSize = {
    XXS: 10,
    XS: 11,
    SM: 14,
    MD: 16,
    LG: 18,
    XLG: 24,
    XXLG: 34,
    XXXLG: 40,
};

// breakpoint for media query
const breakPoint = {
    PHONE_XS: 320,
    PHONE_SM: 360,
    PHONE_MD: 400,
    PHONE_LG: 480,
    TABLET_XS: 600,
    TABLET_SM: 720,
    TABLET_MD: 840,
    TABLET_LG: 960,
    LAPTOP_XS: 1152,
    LAPTOP_SM: 1280,
    LAPTOP_MD: 1440,
    LAPTOP_LG: 1600,
    DESKTOP_XS: 1920,
    DESKTOP_SM: 2048,
    DESKTOP_MD: 2560,
};

// control bar button styles
const ctrlBar = {
    btn: {
        size: {
            SMALL: '24',
            MEDIUM: '40',
        },
    },
};

const theme = {
    fontFamily,
    fontSize,
    color,
    breakPoint,
    ctrlBar,
};

export { theme };
