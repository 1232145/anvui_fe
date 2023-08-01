import React from 'react';
import { Layout, Button, Dropdown, Menu } from 'antd';
import './header.css';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;
const userImage = 'https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png';

const MyHeader = ({ menuCollapsed, setMenuCollapsed }) => {

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.reload();
  }

  const items = [
    {
      label: <a onClick={handleLogout}>Log out</a>,
      key: '0',
    }
  ]

  return (
    <div>
      <Header className='header'>
        <div className={`nav-button ${menuCollapsed && 'collapsed'}`}>
          <div>
          <Button type="default" onClick={() => setMenuCollapsed(!menuCollapsed)} icon={<MenuOutlined />} />
          </div>
          <div>
          <Dropdown menu={{ items }} trigger={['click']}>
            <Button type="default" shape="square" icon={<UserOutlined />}>username</Button>
          </Dropdown>
          </div>
        </div>
      </Header>
    </div>
  );
};

export default MyHeader;