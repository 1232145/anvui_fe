import React from 'react';
import { Layout, Button } from 'antd';
import './header.css';
import { MenuOutlined } from '@ant-design/icons';

const { Header } = Layout;

const MyHeader = ({menuCollapsed, setMenuCollapsed}) => {

  return (
    <div>
      <Header className='header'>
        <div className='nav-button'>
          <Button type="default" onClick={() => setMenuCollapsed(!menuCollapsed)} icon={<MenuOutlined />}/>
        </div>
      </Header>
    </div>
  );
};

export default MyHeader;