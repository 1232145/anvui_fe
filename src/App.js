import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { publicRoutes } from './routes';
import Nav from './components/Navbar';
import React, { useState } from 'react';
import MyHeader from './components/Header';
import MyFooter from './components/Footer';
import { Layout, theme } from 'antd';
import Login from './components/Login';

const { Header, Footer, Sider, Content } = Layout;

const App = () => {
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const [login, setLogin] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      {
        !login ?
          (<Login setLogin={setLogin}/>)
          :
          (
            <Router>
              <Layout style={{ minHeight: '100vh' }} hasSider>
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
                  style={menuCollapsed ? { marginLeft: 80, transition: 'all 0.3s' } : { marginLeft: 200, transition: 'all 0.2s' }}
                >
                  <Header
                    style={{
                      padding: 0,
                      background: colorBgContainer,
                      zIndex: 1,
                      position: 'sticky'
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
            </Router>
          )
      }
    </>
  );
};

export default App;
