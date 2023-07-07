import React from 'react';
import { Menu, Avatar } from 'antd';
import { navRoutes } from '../../routes';
import { useNavigate } from 'react-router-dom';

//key == path
const getItem = (label, key, icon, children) => {
    return { key, icon, children, label };
}

const items = navRoutes.map(item => {
    return getItem(item.name, item.path, item.icon, item.children?.map(item => {
        return getItem(item.name, item.path);
    }));
});

const logo = "https://anvui.vn/imgs/logo_b.png";

const logoStyle = {
    margin: 7.5,
    background: `url(${logo}) center center / cover`,
    width: 120,
    height: 50,
    transition: 'all 0.3s'
}

const Nav = ({menuCollapsed}) => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar style={menuCollapsed ? {...logoStyle, width: 50, height: 30} : logoStyle} shape='square'/>
            <Menu
                onClick={({ key }) => navigate(key)}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                items={items}
            />
        </div>
    );
};

export default Nav;
