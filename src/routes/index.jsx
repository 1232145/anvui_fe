import Home from "../pages/Home";
import { UserOutlined } from '@ant-design/icons';
import Page from '../pages/Page'

export const publicRoutes = [
    { path: '/', name: "Trang chủ", icon: <UserOutlined />, component: Home },
    { path: '/news/create-news', name: "Thêm tin tức", component: null },
    { path: '/news/news-list', name: "Danh sách tin tức", component: null },
    { path: '/news/create-news-catagory', name: "Thêm danh mục tin tức", component: null },
    { path: '/news/news-catagory', name: "Danh mục tin tức", component: null },
    { path: '/page', name: "Page", icon: null, component: Page },
    { path: '/menu/menu-list', name: "Danh sách menu", component: null },
    { path: '/template/slide-banner', name: "Slide ảnh và Banner", component: null },
    { path: '/template/css-custom', name: "Thay đổi CSS", component: null },
    { path: '/template/change-theme', name: "Thay đổi Theme", component: null },
    { path: '/setting/payment', name: "Thông tin thanh toán", component: null },
    { path: '/setting/domain', name: "Tên miền", component: null },
]

export const navRoutes = [
    { path: '/', component: Home, name: "Trang chủ", icon: <UserOutlined /> },
    {
        path: null, name: "Tin Tức", icon: null, children: [
            { path: '/news/create-news', name: "Thêm tin tức", component: null },
            { path: '/news/news-list', name: "Danh sách tin tức", component: null },
            { path: '/news/create-news-catagory', name: "Thêm danh mục tin tức", component: null },
            { path: '/news/news-catagory', name: "Danh mục tin tức", component: null },
        ]
    },
    { path: '/page', component: Page, name: "Page", icon: null },
    {
        path: 'null', name: "Menu", icon: null, children: [
            { path: '/menu/menu-list', name: "Danh sách menu", component: null },
        ]
    },
    {
        path: null, name: "Giao diện", icon: null, children: [
            { path: '/template/slide-banner', name: "Slide ảnh và Banner", component: null },
            { path: '/template/css-custom', name: "Thay đổi CSS", component: null },
            { path: '/template/change-theme', name: "Thay đổi Theme", component: null },
        ]
    },
    {
        path: '/setting', name: "Seting", icon: null, children: [
            { path: '/setting/payment', name: "Thông tin thanh toán", component: null },
            { path: '/setting/domain', name: "Tên miền", component: null },
        ]
    },
]