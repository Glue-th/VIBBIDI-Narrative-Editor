import {
    Avatar, Divider, Dropdown, Icon, Menu, Spin,
} from 'antd';
import { Link } from 'dva/router';
import Debounce from 'lodash-decorators/debounce';
import React, { Component } from 'react';
import styled from 'styled-components';
import defaultAvatar from '../../../../images/defaultAvatar.svg';
import TimezoneBar from '../TimezoneBar';

export default class GlobalHeader extends Component {
    componentWillUnmount() {
        this.triggerResizeEvent.cancel();
    }

    toggle = () => {
        const { collapsed, onCollapse } = this.props;
        onCollapse(!collapsed);
        this.triggerResizeEvent();
    };

    // eslint-disable-next-line
    @Debounce(600)
    // eslint-disable-next-line
    triggerResizeEvent() {
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
    }

    render() {
        const {
            currentUser = {}, collapsed, isMobile, logo, onMenuClick,
        } = this.props;
        const menu = (
            // User dropdown
            <Menu selectedKeys={[]} onClick={onMenuClick}>
                <Menu.Item key="change_password">
                    <Icon type="changePassword" />
                    Change Password
                </Menu.Item>
                <Menu.Item key="logout">
                    <Icon type="logout" />
                    Logout
                </Menu.Item>
            </Menu>
        );
        const displayName = `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim()
            || currentUser.userName;
        return (
            <Wrapper>
                {(isMobile && [
                    <Link to="/" className="logo" key="logo">
                        <img src={logo} alt="logo" width="32" />
                    </Link>,
                ]) || (
                    <Icon
                        className="trigger"
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                    />
                )}
                <div className="right">
                    <TimezoneBar
                        className="action"
                        tzShowDatetime
                        tzShowTimezone
                        dateFormat="MMM dd, yyyy"
                        timeFormat="hh:mm:ss A"
                        timezone="Asia/Jakarta"
                        timezoneName="(UTC+07:00) Jakarta, Bangkok, Ho Chi Minh City"
                    />

                    <Divider type="vertical" style={{ height: '70%' }} />
                    {currentUser ? (
                        <Dropdown overlay={menu}>
                            <span className="action account">
                                <Avatar
                                    size="large"
                                    className="avatar"
                                    src={currentUser.avatar || defaultAvatar}
                                />
                                <span className="name">{displayName}</span>
                            </span>
                        </Dropdown>
                    ) : (
                        <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
                    )}
                </div>
            </Wrapper>
        );
    }
}
const Wrapper = styled.div`
    height: 64px;
    padding: 0;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    position: relative;
    .logo {
        height: 64px;
        line-height: 58px;
        vertical-align: top;
        display: inline-block;
        padding: 0 0 0 6px;
        cursor: pointer;
        font-size: 20px;
        img {
            width: 100px;
            display: inline-block;
            vertical-align: middle;
        }
    }
    i.trigger {
        font-size: 20px;
        line-height: 64px;
        cursor: pointer;
        transition: all 0.3s, padding 0s;
        padding: 0 24px;
        &:hover {
            background: '#fff';
        }
    }
    .right {
        float: right;
        height: 100%;
        .action {
            cursor: pointer;
            padding: 0 12px;
            display: inline-block;
            transition: all 0.3s;
            height: 100%;
            > i {
                font-size: 16px;
                vertical-align: middle;
                /* color: @text-color; */
            }
            &:hover,
            .ant-popover-open {
                /* background: @primary-1; */
            }
        }
        .search {
            padding: 0;
            margin: 0 12px;
            &:hover {
                background: transparent;
            }
        }
        .account {
            margin-right: 0;
            .avatar {
                margin: auto 12px auto 0;
                /* color: @primary-color; */
                background: rgba(255, 255, 255, 0.85);
                vertical-align: middle;
            }
        }
    }
    @media only screen and (max-width: 720px) {
        .header {
            padding: 0;
            .name {
                display: none;
            }
            i.trigger {
                padding: 0 12px;
            }
            .logo {
                position: relative;
            }
            .right {
                position: absolute;
                margin: 0;
                right: 0;
                top: 0;
                background: #fff;
                .search {
                    display: none;
                }
                .action {
                    margin: auto 2px;
                    padding: 0 6px;
                }
                .account {
                    margin: 0 8px 0 0;
                    .avatar {
                        margin: 0;
                        /* color: @primary-color; */
                        background: rgba(255, 255, 255, 0.85);
                        vertical-align: middle;
                    }
                }
            }
        }
    }
`;
