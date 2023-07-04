import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import './nav.css';

const { SubMenu } = Menu;

const items = [
    {
        label: 'Navigation One',
        key: 'sub1',
        icon: <MailOutlined />,
        children: [
            { label: 'Option 1', key: '1' },
            { label: 'Option 2', key: '2' },
            { label: 'Option 3', key: '3' },
            { label: 'Option 4', key: '4' },
        ],
    },
    {
        label: 'Navigation Two',
        key: 'sub2',
        icon: <AppstoreOutlined />,
        children: [
            { label: 'Option 5', key: '5' },
            { label: 'Option 6', key: '6' },
            {
                label: 'Submenu',
                key: 'sub3',
                children: [
                    { label: 'Option 7', key: '7' },
                    { label: 'Option 8', key: '8' },
                ],
            },
        ],
    },
    {
        label: 'Navigation Three',
        key: 'sub4',
        icon: <SettingOutlined />,
        children: [
            { label: 'Option 9', key: '9' },
            { label: 'Option 10', key: '10' },
            { label: 'Option 11', key: '11' },
            { label: 'Option 12', key: '12' },
        ],
    },
];

const Nav = ({ menuCollapsed }) => {
    const [current, setCurrent] = useState('1');

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <>
            <div className={'nav-menu'}>
                <div>
                    
                </div>
                    <Menu
                        theme='light'
                        onClick={onClick}
                        defaultOpenKeys={['sub1']}
                        selectedKeys={[current]}
                        mode="inline"
                        inlineCollapsed={menuCollapsed}
                        style={{minWidth: 0, flex: 'auto', border: 'none'}}
                    >
                        {items.map((item) => {
                            if (item.children) {
                                return (
                                    <SubMenu key={item.key} icon={item.icon} title={item.label}>
                                        {item.children.map((subItem) => (
                                            <Menu.Item key={subItem.key}>{subItem.label}</Menu.Item>
                                        ))}
                                    </SubMenu>
                                );
                            }
                            return <Menu.Item key={item.key} icon={item.icon}>{item.label}</Menu.Item>;
                        })}
                    </Menu>
            </div>
        </>
    );
};

export default Nav;
