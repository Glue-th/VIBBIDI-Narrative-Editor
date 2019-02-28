// [styled-components] createGlobalStyle
// https://www.styled-components.com/docs/api#createglobalstyle
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    /* font-family */
    --ff-primary: ${props => props.theme.fontFamily.PRIMARY};
    --ff-secondary: ${props => props.theme.fontFamily.SECONDARY};
    --ff-tertiary: ${props => props.theme.fontFamily.TERTIARY};

    /* background */
    --bg-primary: ${props => props.theme.color.BG_PRIMARY};
    --bg-primary-transparent: ${props => props.theme.color.BG_PRIMARY_TRANSPARENT};

    --debug: rgba(100, 50, 200, .5);
    --debug-transparent: rgba(100, 50, 200, 0);

    --bg-900: #171419;
    --bg-800: #1A181E;
    --bg-700: #212027;
    --bg-600: #24242C;
    --bg-500: #282A31;
    --bg-400: #4A4E52;
    --bg-300: #6D7173;
    --bg-200: #8F9494;
    --bg-100: #B1B5B5;
    --bg-50: #D4D6D5;
    --bg-empty: rgba(27, 25, 31, 1);

    /* foregrand */
    --fg-primary: ${props => props.theme.color.FG_PRIMARY};

    --fg-50: rgba(255,255,255,1);
    --fg-100: rgba(255,255,255,.7);
    --fg-200: rgba(255,255,255,.5);
    --fg-300: rgba(255,255,255,.38);
    --fg-400: rgba(255,255,255,.19);

    /* header */
    --header-height: 56px;
    --header-bg: #2f3135;

    /* lnav */
    --lnav-height: 56px;
    --lnav-bg: var(--bg-primary);

    /* controlbar */
    --bg-ctrlbar: rgba(27, 25, 31, 1);
    --bg-ctrlbar-transparent: rgba(27, 25, 31, 0);
    --ctrlbar-height: 64px;
    --ctrlbar-btn-size: 40px;
    --ctrlbar-btn-bg-color: transparent;
    --ctrlbar-btn-bg-color-hover: transparent;

    /* primary */
    --grid-primary-width: 244px;
    --grid-secondary-width: 1024px;
    --grid-gap: 32px;

    --st-margin-bottom: 3em;

    --outside-margin: 18px;
    @media (min-width: 720px) {
      --outside-margin: 24px;
    }

    @media (min-width: 1280px) {
      --outside-margin: 40px;
      --grid-gap: 48px;
    }

    @media (min-width: 1440px) {
      --grid-primary-width: 260px;
      --grid-tertiary-width: 260px;
    }

    @media (min-width: 1600px) {
      --grid-primary-width: 274px;
      --grid-tertiary-width: 274px;
    }

    @media (min-width: 1920px) {
      --grid-primary-width: 324px;
      --grid-tertiary-width: 324px;
    }

    @media (min-width: 600px) {
      --header-height: 64px;
      --lnav-height: 64px;
      --ctrlbar-height: 72px;
    }

    /* z-index */
    --z-header: 2000;
    --z-ctrlbar: 2000;

    --z-lnav-alpha: 1000;
    --z-lnav-beta: 1001;

    --z-vplyr-alpha: 50;
    --z-vplyr-beta: 51;

    /* easing */
    --easeInSine:     cubic-bezier(0.47,  0,     0.745, 0.715);
    --easeOutSine:    cubic-bezier(0.39,  0.575, 0.565, 1    );
    --easeInOutSine:  cubic-bezier(0.445, 0.05,  0.55,  0.95 );
    --easeInQuad:     cubic-bezier(0.55,  0.085, 0.68,  0.53 );
    --easeOutQuad:    cubic-bezier(0.25,  0.46,  0.45,  0.94 );
    --easeInOutQuad:  cubic-bezier(0.455, 0.03,  0.515, 0.955);

    --easeInCubic:    cubic-bezier(0.55,  0.055, 0.675, 0.19 );
    --easeOutCubic:   cubic-bezier(0.215, 0.61,  0.355, 1    );
    --easeInOutCubic: cubic-bezier(0.645, 0.045, 0.355, 1    );
    --easeInQuart:    cubic-bezier(0.895, 0.03,  0.685, 0.22 );
    --easeOutQuart:   cubic-bezier(0.165, 0.84,  0.44,  1    );
    --easeInOutQuart: cubic-bezier(0.77,  0,     0.175, 1    );

    --easeInQuint:    cubic-bezier(0.755, 0.05,  0.855, 0.06 );
    --easeOutQuint:   cubic-bezier(0.23,  1,     0.32,  1    );
    --easeInOutQuint: cubic-bezier(0.86,  0,     0.07,  1    );
    --easeInExpo:     cubic-bezier(0.95,  0.05,  0.795, 0.035);
    --easeOutExpo:    cubic-bezier(0.19,  1,     0.22,  1    );
    --easeInOutExpo:  cubic-bezier(1,     0,     0,     1    );

    --easeInCirc:     cubic-bezier(0.6,   0.04,  0.98,  0.335);
    --easeOutCirc:    cubic-bezier(0.075, 0.82,  0.165, 1    );
    --easeInOutCirc:  cubic-bezier(0.785, 0.135, 0.15,  0.86 );
    --easeInBack:     cubic-bezier(0.6,  -0.28,  0.735, 0.045);
    --easeOutBack:    cubic-bezier(0.175, 0.885, 0.32,  1.275);
    --easeInOutBack:  cubic-bezier(0.68, -0.55,  0.265, 1.55 );

    /* css smooth scroll */
    --scroll-margin-top: calc(((var(--header-height) + var(--lnav-height)) * -1) - var(--st-margin-bottom));
    --scroll-padding-top: calc((var(--scroll-margin-top) * -1) + (var(--st-margin-bottom) * 1));
  }

  html {
    box-sizing: border-box;
    font-size: 100%;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    list-style: none;
    margin: 0;
    font-family: var(--ff-primary);
    background: var(--bg-primary);
    color: var(--fg-primary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }

  /* 1. Add the correct box sizing in Firefox. */
  /* 2. Show the overflow in Edge and IE. */
  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }

  pre {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  code,
  kbd,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  /* Remove the gray background on active links in IE 10. */
  a {
    background-color: transparent;
  }

  /* Add the correct font weight in Chrome, Edge, and Safari. */
  b,
  strong {
    font-weight: bolder;
  }

  /* Add the correct font size in all browsers. */
  small {
    font-size: 80%;
  }

  /* Remove the border on images inside links in IE 10. */
  img {
    border-style: none;
  }

  /* 1. Change the font styles in all browsers. */
  /* 2. Remove the margin in Firefox and Safari. */
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }

  /* Show the overflow in IE. */
  /* 1. Show the overflow in Edge. */
  button,
  input {
    overflow: visible;
  }

  /* Remove the inheritance of text transform in Edge, Firefox, and IE. */
  /* 1. Remove the inheritance of text transform in Firefox. */
  button,
  select {
    text-transform: none;
  }

  /* Correct the inability to style clickable types in iOS and Safari. */
  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }

  /* Remove the inner border and padding in Firefox. */
  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  /* Restore the focus styles unset by the previous rule. */
  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  /* Remove the default vertical scrollbar in IE 10+. */
  textarea {
    overflow: auto;
  }

  /* 1. Add the correct box sizing in IE 10. */
  /* 2. Remove the padding in IE 10. */
  [type="checkbox"],
  [type="radio"] {
    box-sizing: border-box;
    padding: 0;
  }

  /* 1. Correct the odd appearance in Chrome and Safari. */
  /* 2. Correct the outline style in Safari. */
  [type="search"] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }

  /* Remove the inner padding in Chrome and Safari on macOS. */
  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  /* Add the correct display in IE 10+. */
  template {
    display: none;
  }

  /* Add the correct display in IE 10. */
  [hidden] {
    display: none;
  }

  /* ::-moz-selection {
    background: #8F9494;
    text-shadow: none;
  } */

  /* ::selection {
    background: #8F9494;
    text-shadow: none;
  } */

  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #000;
    margin: 2em 0;
    padding: 0;
  }

  audio,
  canvas,
  iframe,
  img,
  svg,
  video {
    vertical-align: middle;
  }

  img,
  video {
    width: 100%;
  }

  button {
    padding: 0;
    border: none;
    font: inherit;
    color: inherit;
    background-color: transparent;
  }

  /* Hide visually and from screen readers */
  .hidden {
    display: none !important;
  }

  /* Hide only visually, but have it available for screen readers: */
  .visuallyhidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap;
  }

  /* Extends the .visuallyhidden class to allow the element to be focusable when navigated to via the keyboard: */
  .visuallyhidden.focusable:active,
  .visuallyhidden.focusable:focus {
    clip: auto;
    height: auto;
    margin: 0;
    overflow: visible;
    position: static;
    width: auto;
    white-space: inherit;
  }

  /* Hide visually and from screen readers, but maintain layout */
  .invisible {
    visibility: hidden;
  }

  /* Clearfix: contain floats */
  .clearfix:before,
  .clearfix:after {
    content: " ";
    display: table;
  }
  .clearfix:after {
    clear: both;
  }

  .text-lg {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.5;
    letter-spacing: 0.25px;
  }
  .text-md {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.25px;
  }
  .text-sm {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }

`;
