import React from 'react';
import { AppstoreOutlined, MailOutlined, PieChartOutlined, DesktopOutlined, ContainerOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { publicRoutes } from '../../routes';
import { useNavigate } from 'react-router-dom';
import './nav.css';

//key == path
const getItem = (label, key, icon, children) => {
    return {key, icon, children, label};
}
const items = [
    getItem('Trang chủ', '/', <PieChartOutlined />),
    getItem('Page', '/page', <DesktopOutlined />),
    getItem('Option 3', '3', <ContainerOutlined />),
    getItem('Tin tức', 'sub1', <MailOutlined />, [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Option 7', '7'),
        getItem('Option 8', '8'),
    ]),
    getItem('Cài đặt', 'sub2', <AppstoreOutlined />, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
    ]),
];

const Nav = () => {
    const navigate = useNavigate();

    return (
        <Menu
            onClick={({key}) => navigate(key)}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            items={items}
        />
    );
};

export default Nav;
