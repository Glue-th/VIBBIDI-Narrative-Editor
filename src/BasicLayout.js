import { Breadcrumb, Layout } from 'antd';
import { enquireScreen } from 'enquire-js';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import logo from '../images/VIBBIDI_logo.svg';
import GlobalHeader from './components/organisms/GlobalHeader';
import SiderMenu from './components/organisms/SiderMenu';
import DashBoard from './components/templates/DashBoard';
import Login from './components/templates/Login';
import NewNarrativesContainer from './containers/album/new-narratives';
import AlbumNarrativesContainer from './containers/album/album-narratives';
import SeoContainer from './containers/album/seo';
import MenuData from './menu';
import { GlobalStyle } from './styles/global.style';
import { theme } from './styles/global.theme';

const { Content, Footer, Header } = Layout;
let isMobile;
enquireScreen((b) => {
    isMobile = b;
});
class BasicLayout extends React.Component {
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
                            <SiderMenu
                                logo={logo}
                                menuData={MenuData}
                                collapsed={this.state.collapsed}
                                isMobile={this.state.isMobile}
                                onCollapse={this.onCollapse}
                            />
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
                                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                                        <Breadcrumb.Item>User</Breadcrumb.Item>
                                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                                    </Breadcrumb> */}
                                    <div
                                        style={{ padding: 24, background: '#fff', minHeight: 360 }}
                                    >
                                        <Switch>
                                            <Route path="/" exact component={DashBoard} />
                                            {/* <Route path="/login" exact component={Login} /> */}
                                            <Route
                                                path="/album-narratives"
                                                exact
                                                component={AlbumNarrativesContainer}
                                            />
                                            <Route
                                                path="/new-narratives"
                                                exact
                                                component={NewNarrativesContainer}
                                            />
                                            <Route path="/seo" exact component={SeoContainer} />
                                        </Switch>
                                    </div>
                                </Content>
                                {/* <Footer style={{ textAlign: 'center' }}>
                                    Ant Design ©2018 Created by Ant UED
                                </Footer> */}
                            </Layout>
                        </Layout>
                    </React.Fragment>
                </ThemeProvider>
            </HashRouter>
        );
    }
}
export default BasicLayout;
