import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Form, Button, Row, Col,
} from 'antd';
import omit from 'omit.js';
import styled from 'styled-components';
import map from './map';

const FormItem = Form.Item;

function generator({ defaultProps, defaultRules, type }) {
    return WrappedComponent => class BasicComponent extends Component {
            static contextTypes = {
                form: PropTypes.object,
                updateActive: PropTypes.func,
            };

            constructor(props) {
                super(props);
                this.state = {
                    count: 0,
                };
            }

            componentDidMount() {
                if (this.context.updateActive) {
                    this.context.updateActive(this.props.name);
                }
            }

            componentWillUnmount() {
                clearInterval(this.interval);
            }

            onGetCaptcha = () => {
                let count = 59;
                this.setState({ count });
                if (this.props.onGetCaptcha) {
                    this.props.onGetCaptcha();
                }
                this.interval = setInterval(() => {
                    count -= 1;
                    this.setState({ count });
                    if (count === 0) {
                        clearInterval(this.interval);
                    }
                }, 1000);
            };

            render() {
                const { getFieldDecorator } = this.context.form;
                const options = {};
                let otherProps = {};
                const {
                    onChange, defaultValue, rules, name, ...restProps
                } = this.props;
                const { count } = this.state;
                options.rules = rules || defaultRules;
                if (onChange) {
                    options.onChange = onChange;
                }
                if (defaultValue) {
                    options.initialValue = defaultValue;
                }
                otherProps = restProps || otherProps;
                if (type === 'Captcha') {
                    const inputProps = omit(otherProps, ['onGetCaptcha']);
                    return (
                        <Wrapper>
                            <FormItem>
                                <Row gutter={8}>
                                    <Col span={16}>
                                        {getFieldDecorator(name, options)(
                                            <WrappedComponent {...defaultProps} {...inputProps} />,
                                        )}
                                    </Col>
                                    <Col span={8}>
                                        <Button
                                            disabled={count}
                                            className="getCaptcha"
                                            size="large"
                                            onClick={this.onGetCaptcha}
                                        >
                                            {count ? `${count} s` : 'Get verification code'}
                                        </Button>
                                    </Col>
                                </Row>
                            </FormItem>
                        </Wrapper>
                    );
                }
                return (
                    <FormItem>
                        {getFieldDecorator(name, options)(
                            <WrappedComponent {...defaultProps} {...otherProps} />,
                        )}
                    </FormItem>
                );
            }
    };
}
const Wrapper = styled.div`
    .tabs {
        padding: 0 2px;
        margin: 0 -2px;
        :global {
            .ant-tabs-tab {
                font-size: 16px;
                line-height: 24px;
            }
            .ant-input-affix-wrapper .ant-input:not(:first-child) {
                padding-left: 34px;
            }
        }
    }
    h2 {
        width: 100%;
        text-align: center;
        height: 29px;
        font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
        font-size: 24px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: 0.2px;
        color: #1a2c3f;
    }
    h4 {
        width: 100%;
        height: 16px;
        opacity: 0.37;
        font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
        font-size: 13px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.15;
        letter-spacing: 0.1px;
        text-align: center;
        color: #1a2c3f;
    }
    :global {
        .ant-tabs .ant-tabs-bar {
            border-bottom: 0;
            margin-bottom: 24px;
            text-align: center;
        }
        .ant-form-item {
            margin-bottom: 24px;
        }
    }
    .prefixIcon {
        /* font-size: @font-size-base; */
        /* color: @disabled-color; */
    }
    .getCaptcha {
        display: block;
        width: 100%;
    }
    .submit {
        width: 100%;
        margin-top: 12px;
    }
`;
const LoginItem = {};
Object.keys(map).forEach((item) => {
    LoginItem[item] = generator({
        defaultProps: map[item].props,
        defaultRules: map[item].rules,
        type: item,
    })(map[item].component);
});

export default LoginItem;
