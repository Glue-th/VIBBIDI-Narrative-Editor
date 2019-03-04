import React from 'react';
import { Input, Icon } from 'antd';

const map = {
    UserName: {
        component: Input,
        props: {
            size: 'large',
            prefix: <Icon type="user" />,
            placeholder: 'Username',
        },
        rules: [
            {
                required: true,
                message: 'Please enter username!',
            },
        ],
    },
    Password: {
        component: Input,
        props: {
            size: 'large',
            prefix: <Icon type="lock" />,
            type: 'password',
            placeholder: 'Password',
        },
        rules: [
            {
                required: true,
                message: 'Please enter password!',
            },
        ],
    },
    Mobile: {
        component: Input,
        props: {
            size: 'large',
            prefix: <Icon type="mobile" />,
            placeholder: 'mobile number',
        },
        rules: [
            {
                required: true,
                message: 'Please enter mobile number!',
            },
            {
                pattern: /^1\d{10}$/,
                message: 'Wrong mobile number format!',
            },
        ],
    },
    Captcha: {
        component: Input,
        props: {
            size: 'large',
            prefix: <Icon type="mail" />,
            placeholder: 'captcha',
        },
        rules: [
            {
                required: true,
                message: 'Please enter Captcha!',
            },
        ],
    },
    Email: {
        component: Input,
        props: {
            size: 'large',
            prefix: <Icon type="mail" theme="outlined" />,
            placeholder: 'Username',
        },
        rules: [
            {
                required: true,
                message: 'Please enter email!',
            },
            {
                type: 'email',
                message: 'The input is not valid E-mail!',
            },
        ],
    },
};

export default map;
