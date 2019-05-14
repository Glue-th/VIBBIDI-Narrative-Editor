import { Spin } from 'antd';
import dynamic from 'dva/dynamic';
import { HashRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import BasicLayout from './BasicLayout';
import UserLayout from './UserLayout';

dynamic.setDefaultLoadingComponent(() => <Spin size="large" />);

class Routes extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/user" component={UserLayout} />
                    <Route
                        path="/"
                        render={props => <BasicLayout {...props} />}
                        authority={false}
                        redirectPath="/user/login"
                    />
                </Switch>
            </HashRouter>
        );
    }
}

export default Routes;
