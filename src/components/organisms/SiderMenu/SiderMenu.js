import { Layout, Menu, Divider } from 'antd';
import styled from 'styled-components';
import replace from 'lodash/replace';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import iconMapper from '../../../util/iconMapper';

const { Sider } = Layout;
const { SubMenu } = Menu;
const getIcon = (icon) => {
    if (typeof icon === 'string' && iconMapper[icon]) {
        return <Icon src={`${iconMapper[icon]}`} alt={icon} className="sider-menu-item-img" />;
    }
    return icon;
};
export default class SiderMenu extends PureComponent {
    getNavMenuItems = (menusData) => {
        if (!menusData) {
            return [];
        }
        return menusData
            .filter(item => item.name && !item.hide_in_menu)
            .map(item => this.getSubMenuOrItem(item))
            .filter(item => item);
    };

    conversionPath = (path) => {
        if (path && path.indexOf('http') === 0) {
            return path;
        }
        return `/${path || ''}`.replace(/\/+/g, '/');
    };

    getMenuItemPath = (item) => {
        const itemPath = this.conversionPath(item.path);
        const icon = getIcon(item.icon);
        const { target, name } = item;
        // Is it a http link
        if (/^https?:\/\//.test(itemPath)) {
            return (
                <a href={itemPath} target={target}>
                    {icon}
                    <span>{name}</span>
                </a>
            );
        }
        const xpath = replace(item.path, new RegExp('/', 'g'), '');
        return (
            <Link
                id={`${xpath}`}
                to={itemPath}
                target={target}
                onClick={
                    this.props.isMobile
                        ? () => {
                            this.props.onCollapse(true);
                        }
                        : undefined
                }
            >
                {icon}
                <span>{name}</span>
            </Link>
        );
    };

    getSubMenuOrItem = (item) => {
        const xpath = replace(item.path, new RegExp('/', 'g'), '');
        if (item.children && item.children.some(child => child.name && !child.hide_in_menu)) {
            const childrenItems = this.getNavMenuItems(item.children);
            // Hide menu if there's no child
            if (childrenItems && childrenItems.length > 0) {
                return (
                    <SubMenu
                        id={`${xpath}`}
                        title={
                            item.icon ? (
                                <span>
                                    {getIcon(item.icon)}
                                    <span>{item.name}</span>
                                </span>
                            ) : (
                                <span>{item.name}</span>
                            )
                        }
                        key={item.path}
                    >
                        {childrenItems}
                    </SubMenu>
                );
            }
            return null;
        }
        return (
            <Menu.Item id={`${xpath}`} key={item.path}>
                {this.getMenuItemPath(item)}
            </Menu.Item>
        );
    };

    render() {
        const {
            logo, collapsed, onCollapse, menuData,
        } = this.props;
        return (
            <Wrapper>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    breakpoint="lg"
                    onCollapse={onCollapse}
                    width={300}
                    className="sider"
                >
                    <div className="logo" key="logo">
                        <Link to="/">
                            {!collapsed && (
                                <img
                                    src={logo}
                                    alt="logo"
                                    style={{ marginLeft: 6 }}
                                    className="textLogo"
                                />
                            )}
                            {!collapsed && (
                                <Divider
                                    type="vertical"
                                    style={{ borderColor: '#fff', opacity: 0.3 }}
                                />
                            )}
                        </Link>
                    </div>
                    <Menu
                        key="Menu"
                        theme="dark"
                        mode="inline"
                        onOpenChange={this.handleOpenChange}
                        style={{ padding: '8px 0', width: '100%' }}
                        inlineIndent={20}
                        id="sider_menu"
                    >
                        {this.getNavMenuItems(menuData)}
                    </Menu>
                </Sider>
            </Wrapper>
        );
    }
}
const Icon = styled.img`
    width: 14px;
    margin-right: 10px;
`;
const Wrapper = styled.div`
    .sider {
        min-height: 100vh;
        box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
        position: relative;
        z-index: 10;
        &.ligth {
            background-color: white;
            .logo {
                background: white;
                h1 {
                    color: #002140;
                }
            }
        }
    }
    .logo {
        height: 64px;
        position: relative;
        line-height: 64px;
        text-align: center;
        transition: all 0.3s;
        overflow: hidden;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.3);
        background: #fff;
        img {
            display: inline-block;
            vertical-align: middle;
            height: 32px;
        }
        h1 {
            color: white;
            display: inline-block;
            vertical-align: middle;
            font-size: 20px;
            margin: 0 0 0 12px;
            font-family: 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
        }
    }
    @keyframes optextbouncing {
        0% {
            transform: translateX(0);
        }
        10% {
            transform: translateX(0);
        }
        45% {
            transform: translateX(calc(-100% + 400px));
        }
        55% {
            transform: translateX(calc(-100% + 400px));
        }
        90% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(0);
        }
    }
    .drawer .drawer-content {
        background: #001529;
    }
    .ant-menu-inline-collapsed {
        & > .ant-menu-item .sider-menu-item-img + span,
        &
            > .ant-menu-item-group
            > .ant-menu-item-group-list
            > .ant-menu-item
            .sider-menu-item-img
            + span,
        & > .ant-menu-submenu > .ant-menu-submenu-title .sider-menu-item-img + span {
            max-width: 0;
            display: inline-block;
            opacity: 0;
        }
    }
    .ant-menu-item .sider-menu-item-img + span,
    .ant-menu-submenu-title .sider-menu-item-img + span {
        transition: opacity 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86),
            width 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
        opacity: 1;
    }
    .ant-menu-submenu {
        &.ant-menu-submenu-inline {
            &.ant-menu-submenu-selected {
                > div.ant-menu-submenu-title {
                    font-weight: 500;
                }
                &:not(.ant-menu-submenu-open) {
                    background-color: rgba(255, 255, 255, 0.1);
                }
            }
            &.ant-menu-submenu-active:not(.ant-menu-submenu-open) {
                > div.ant-menu-submenu-title,
                li.ant-menu-item {
                    background-color: rgba(0, 0, 0, 0.1);
                }
            }
        }
        &.ant-menu-submenu-open li.ant-menu-item.ant-menu-item-active {
            background-color: rgba(0, 0, 0, 0.1);
        }
    }
    .ant-menu.ant-menu-sub.ant-menu-inline {
        box-shadow: none;
        & > .ant-menu-item.ant-menu-item-selected {
            background-color: rgba(255, 255, 255, 0.1);
            font-weight: 500;
        }
    }
    .ant-menu-dark.ant-menu-inline {
        & .ant-menu-submenu-title,
        & .ant-menu-item {
            width: auto;
            margin: auto 8px;
            box-sizing: border-box;
        }
        & .ant-menu-submenu-title {
            overflow: hidden;
            box-sizing: border-box;
            span {
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display: inline-flex;
            }
        }
        & .ant-menu-submenu-title:hover span {
            animation: optextbouncing 12s linear infinite !important;
        }
    }
`;
