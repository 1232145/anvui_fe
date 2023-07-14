import React from 'react';
import { Menu, Avatar } from 'antd';
import { navRoutes } from '../../routes';
import { useNavigate, useLocation  } from 'react-router-dom';
import logo from '../../img/logo_b.png';

//key == path
const getItem = (label, key, icon, children) => {
    return { key, icon, children, label };
}

const items = navRoutes.map(item => {
    return getItem(item.name, item.path, item.icon, item.children?.map(item => {
        return getItem(item.name, item.path);
    }));
});

const logoStyle = {
    margin: 7.5,
    background: `url(${logo}) center center / cover`,
    width: 120,
    height: 50,
    transition: 'all 0.3s'
}

const Nav = ({ menuCollapsed }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
            <Avatar style={menuCollapsed ? { ...logoStyle, width: 50, height: 30 } : logoStyle} shape='square' />
            <Menu
                onClick={({ key }) => navigate(key)}
                defaultSelectedKeys={['/']}
                selectedKeys={[location.pathname]}
                mode="inline"
                theme="dark"
                items={items}
            />
        </div>
    );
};

export default Nav;
