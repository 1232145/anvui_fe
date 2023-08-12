import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import MyHeader from './components/Header';
import MyFooter from './components/Footer';
import Nav from './components/Navbar';
import { publicRoutes } from './routes';
import { Route, Routes } from 'react-router-dom';

const { Header, Sider, Content, Footer } = Layout;

const AppLayout = () => {
    const [menuCollapsed, setMenuCollapsed] = useState(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh', width: 'auto' }} hasSider>
            <Sider
                breakpoint="lg"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
                trigger={null} collapsible collapsed={menuCollapsed}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <Nav menuCollapsed={menuCollapsed} />
            </Sider>
            <Layout
                style={menuCollapsed ? { marginLeft: 80, transition: 'all 0.3s ease' } : { marginLeft: 200, transition: 'all 0.2s ease' }}
            >
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        zIndex: 1,
                        position: 'sticky',
                        width: '100%'
                    }}
                >
                    <MyHeader menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed} />
                </Header>

                <Content
                    style={{
                        margin: '48px 48px 0',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >
                        <Routes>
                            {
                                publicRoutes.map((item, index) => {
                                    const Page = item.component;
                                    return <Route key={index} path={item.path} element={<Page />} />
                                })
                            }
                        </Routes>
                    </div>
                </Content>

                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <MyFooter />
                </Footer>

            </Layout>
        </Layout>
    );
};

export default AppLayout;
