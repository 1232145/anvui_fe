import React from 'react';
import { Layout, Button, Dropdown, Avatar } from 'antd';
import './header.css';
import { MenuOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth';

const { Header } = Layout;
const userImage = 'https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png';

const MyHeader = ({ menuCollapsed, setMenuCollapsed }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const displayName = auth.user ? auth.user : "Người dùng";

  const handleLogout = () => {
    auth.signOut(() => navigate('/login'));
  }

  const items = [
    {
      label: <a onClick={handleLogout}>
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <LogoutOutlined style={{ marginRight: '8px' }} />
          Log out
        </span>
      </a>,
      key: '0',
    }
  ]

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    cursor: 'pointer',
  }

  const avatarStyle = {
    marginRight: '8px',
  }

  const usernameStyle = {
    color: 'black'
  }

  return (
    <div>
      <Header className='header'>
        <div className={`nav-button ${menuCollapsed && 'collapsed'}`}>
          <div>
            <Button type="default" onClick={() => setMenuCollapsed(!menuCollapsed)} icon={<MenuOutlined />} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Dropdown menu={{ items }} trigger={['click']}>
              <div style={containerStyle}>
                <Avatar src={userImage} icon={<UserOutlined />} style={avatarStyle} />
                <span style={usernameStyle}>{displayName}</span>
              </div>
            </Dropdown>
          </div>
        </div>
      </Header>
    </div>
  );
};

export default MyHeader;