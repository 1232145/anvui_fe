import React from 'react';
import { AppstoreOutlined, MailOutlined, PieChartOutlined, DesktopOutlined, ContainerOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { navRoutes } from '../../routes';
import { useNavigate } from 'react-router-dom';
import './nav.css';

//key == path
const getItem = (label, key, icon, children) => {
    return { key, icon, children, label };
}

const items = navRoutes.map(item => {
    return getItem(item.name, item.path, item.icon, item.children?.map(item => {
        return getItem(item.name, item.path);
    }));
});

const Nav = () => {
    const navigate = useNavigate();

    return (
        <Menu
            onClick={({ key }) => navigate(key)}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            items={items}
        />
    );
};

export default Nav;
