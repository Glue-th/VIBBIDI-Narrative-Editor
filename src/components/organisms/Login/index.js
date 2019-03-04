import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Tabs } from 'antd';
import { connect } from 'dva';
import classNames from 'classnames';
import LoginItem from './LoginItem';
import LoginTab from './LoginTab';
import LoginSubmit from './LoginSubmit';

@connect(({ global, user }) => ({ global, user }))
class Login extends Component {
    static propTypes = {
        className: PropTypes.string,
        defaultActiveKey: PropTypes.string,
        onTabChange: PropTypes.func,
        onSubmit: PropTypes.func,
    };

    static childContextTypes = {
        tabUtil: PropTypes.object,
        form: PropTypes.object,
        updateActive: PropTypes.func,
    };

    static defaultProps = {
        className: '',
        defaultActiveKey: '',
        onTabChange: () => {},
        onSubmit: () => {},
    };

    state = {
        type: this.props.defaultActiveKey,
        tabs: [],
        active: {},
    };

    getChildContext() {
        return {
            tabUtil: {
                addTab: (id) => {
                    this.setState({
                        tabs: [...this.state.tabs, id],
                    });
                },
                removeTab: (id) => {
                    this.setState({
                        tabs: this.state.tabs.filter(currentId => currentId !== id),
                    });
                },
            },
            form: this.props.form,
            updateActive: (activeItem) => {
                const { type, active } = this.state;
                if (active[type]) {
                    active[type].push(activeItem);
                } else {
                    active[type] = [activeItem];
                }
                this.setState({
                    active,
                });
            },
        };
    }

    componentDidMount() {
        if (!this.props.global || !this.props.global.embeddedUrls) {
            this.props.dispatch({
                type: 'global/getEmbeddedUrls',
            });
        }
    }

    onSwitch = (type) => {
        this.setState({
            type,
        });
        this.props.onTabChange(type);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { active, type } = this.state;
        const activeFileds = active[type];
        const { onSubmit, form } = this.props;
        form.validateFields(activeFileds, { force: true }, (err, values) => {
            onSubmit(err, values);
        });
    };

    render() {
        const {
            className, children, title, subtitle,
        } = this.props;
        const { type, tabs } = this.state;
        const TabChildren = [];
        const otherChildren = [];
        React.Children.forEach(children, (item) => {
            if (!item) {
                return;
            }
            // eslint-disable-next-line
            if (item.type.__ANT_PRO_LOGIN_TAB) {
                TabChildren.push(item);
            } else {
                otherChildren.push(item);
            }
        });
        return (
            <div className="login">
                <h2 className="login-title">{title}</h2>
                <h4 className="login-subtitle">{subtitle}</h4>
                <br />
                <Form autoComplete="off" onSubmit={this.handleSubmit}>
                    {tabs.length ? (
                        <div>
                            <Tabs
                                animated={false}
                                className="tabs"
                                activeKey={type}
                                onChange={this.onSwitch}
                            >
                                {TabChildren}
                            </Tabs>
                            {otherChildren}
                        </div>
                    ) : (
                        [...children]
                    )}
                </Form>
            </div>
        );
    }
}

Login.Tab = LoginTab;
Login.Submit = LoginSubmit;
Object.keys(LoginItem).forEach((item) => {
    Login[item] = LoginItem[item];
});

export default Form.create()(Login);
