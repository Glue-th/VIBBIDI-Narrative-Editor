import { Layout } from 'antd';
import { enquireScreen } from 'enquire-js';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import logo from '../images/VIBBIDI_logo.svg';
import GlobalHeader from './components/organisms/GlobalHeader';
import DashBoard from './components/templates/DashBoard';
import Login from './components/templates/Login';
import { GlobalStyle } from './styles/global.style';
import { theme } from './styles/global.theme';

const { Content, Footer, Header } = Layout;
let isMobile;
enquireScreen((b) => {
    isMobile = b;
});
class UserLayout extends React.Component {
    state = {
        collapsed: false,
        isMobile,
    };

    componentDidMount() {
        this.enquireHandler = enquireScreen((mobile) => {
            this.setState({
                isMobile: mobile,
            });
        });
    }

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    };

    render() {
        return (
            <HashRouter>
                <ThemeProvider theme={theme}>
                    <React.Fragment>
                        <GlobalStyle />
                        <Layout style={{ height: '100vh' }}>
                            <Layout>
                                <Header style={{ padding: 0 }}>
                                    <GlobalHeader
                                        logo={logo}
                                        collapsed={this.state.collapsed}
                                        isMobile={this.state.isMobile}
                                        onCollapse={this.onCollapse}
                                    />
                                </Header>
                                <Content style={{ margin: '0 16px' }}>
                                    <Switch>
                                        <Route path="/user/login" component={Login} />
                                    </Switch>
                                </Content>
                                <Footer style={{ textAlign: 'center' }}>
                                    Ant Design ©2018 Created by Ant UED
                                </Footer>
                            </Layout>
                        </Layout>
                    </React.Fragment>
                </ThemeProvider>
            </HashRouter>
        );
    }
}
export default UserLayout;
