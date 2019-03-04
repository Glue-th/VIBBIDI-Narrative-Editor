import React, { Component } from 'react';
import { Alert } from 'antd';
import { Link } from 'dva/router';
import styled from 'styled-components';
import Login from '../organisms/Login';

const { UserName, Password, Submit } = Login;

export default class LoginPage extends Component {
    state = {
        type: 'account',
    };

    onTabChange = (type) => {
        this.setState({ type });
    };

    // handleSubmit = (err, values) => {
    //     const { type } = this.state;
    //     this.props.dispatch({
    //         type: 'login/resetMsg',
    //         payload: null,
    //     });
    //     const formData = new FormData();
    //     formData.append('username', values.userName);
    //     formData.append('password', values.password);
    //     formData.append('type', type);
    //     if (!err) {
    //         this.props.dispatch({
    //             type: 'login/login',
    //             payload: formData,
    //         });
    //         this.props.dispatch({
    //             type: 'global/saveLogin',
    //             payload: values,
    //         });
    //     }
    // };

    renderMessage = content => (
        <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );

    renderErrorMsg = msgLogin => (
        <div className="err-message">
            <span>{msgLogin}</span>
        </div>
    );

    render() {
        // const {
        //     login, submitting, msgLogin, dispatch,
        // } = this.props;
        const { type } = this.state;
        return (
            <Wrapper>
                <Login
                    defaultActiveKey={type}
                    onTabChange={this.onTabChange}
                    onSubmit={this.handleSubmit}
                    title="Login to your account"
                    subtitle="All fields are required"
                >
                    {/* {login.status === 'error'
                        && login.type === 'account'
                        && !submitting
                        && this.renderMessage('Invalid login information')} */}
                    <UserName
                        name="userName"
                        placeholder="Username"
                        // onFocus={() => dispatch({ type: 'login/resetMsg', payload: null })}
                    />
                    <Password
                        name="password"
                        placeholder="Password"
                        // onFocus={() => dispatch({ type: 'login/resetMsg', payload: null })}
                    />
                    {/* {msgLogin && this.renderErrorMsg(msgLogin)} */}
                    {/* <Submit loading={submitting}>
                        <strong>LOG IN</strong>
                    </Submit> */}
                </Login>
                <div style={{ textAlign: 'center' }} id="fgPw_forgotPasswordLink">
                    <Link to="/user/resetPassword">Forgot Your Password?</Link>
                </div>
            </Wrapper>
        );
    }
}
const Wrapper = styled.div`
    width: 400px;
    margin: 10% auto;
    background-color: white;
    padding: 24px 48px;
    /* border-radius: @border-radius-base; */
    box-shadow: 2px 2px 24px 12px rgba(0, 0, 0, 0.25);
    @media screen and (max-width: 320px) {
        width: 95%;
    }

    .icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        /* &:hover {
            color: @primary-color;
        } */
    }

    .other {
        text-align: left;
        margin-top: 24px;
        line-height: 22px;

        .register {
            float: right;
        }
    }
    .err-message {
        color: #f5222d;
        text-align: center;
        vertical-align: middle;
        line-height: 20px;
    }
    .hiddenFrame {
        width: 0;
        height: 0;
        display: none;
        z-index: -1000;
    }
`;
