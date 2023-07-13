import Home from "../pages/Home";
import { FileOutlined, HomeOutlined, FilePptOutlined, MenuOutlined, LaptopOutlined, SettingOutlined } from '@ant-design/icons';
import Page from '../pages/Page';
import CreateNews from '../pages/News/CreateNews';
import NewsList from '../pages/News/NewsList';
import NewsCatagory from '../pages/News/NewsCatagory';
import CreateNewsCatagory from '../pages/News/CreateNewsCatagory';
import MenuList from '../pages/Menu/MenuList';
import Slide from '../pages/Template/Slide';
import CSSCustom from '../pages/Template/CSSCustom';
import Theme from '../pages/Template/Theme';
import Payment from '../pages/Setting/Payment';
import Domain from '../pages/Setting/Domain';
import NotFoundPage from "../pages/Error/NotFoundPage";
import ErrorPage from '../pages/Error/ErrorPage';
import CreatePage from "../pages/Page/CreatePage";

export const publicRoutes = [
    { path: '/', name: "Trang chủ", icon: <HomeOutlined />, component: Home },
    { path: '/news/create-news', name: "Thêm tin tức", component: CreateNews },
    { path: '/news/news-list', name: "Danh sách tin tức", component: NewsList },
    { path: '/news/create-news-catagory', name: "Thêm danh mục tin tức", component: CreateNewsCatagory },
    { path: '/news/news-catagory', name: "Danh mục tin tức", component: NewsCatagory },
    { path: '/page', name: "Page", icon: <FilePptOutlined />, component: Page },
    { path: 'page/create-page', name: "Thêm trang", component: CreatePage},
    { path: '/menu/menu-list', name: "Danh sách menu", component: MenuList },
    { path: '/template/slide-banner', name: "Slide ảnh và Banner", component: Slide },
    { path: '/template/css-custom', name: "Thay đổi CSS", component: CSSCustom },
    { path: '/template/change-theme', name: "Thay đổi Theme", component: Theme },
    { path: '/setting/payment', name: "Thông tin thanh toán", component: Payment },
    { path: '/setting/domain', name: "Tên miền", component: Domain },
    { path: '*', name: "NotFound", component: NotFoundPage},
    { path: '/error', name: "Error", component: ErrorPage}
]

export const navRoutes = [
    { path: '/', component: Home, name: "Trang chủ", icon: <HomeOutlined /> },
    {
        path: null, name: "Tin Tức", icon: <FileOutlined />, children: [
            { path: '/news/create-news', name: "Thêm tin tức", component: null },
            { path: '/news/news-list', name: "Danh sách tin tức", component: null },
            { path: '/news/create-news-catagory', name: "Thêm danh mục tin tức", component: null },
            { path: '/news/news-catagory', name: "Danh mục tin tức", component: null },
        ]
    },
    { path: '/page', component: Page, name: "Page", icon: <FilePptOutlined /> },
    {
        path: 'null', name: "Menu", icon: <MenuOutlined />, children: [
            { path: '/menu/menu-list', name: "Danh sách menu", component: null },
        ]
    },
    {
        path: null, name: "Giao diện", icon: <LaptopOutlined />, children: [
            { path: '/template/slide-banner', name: "Slide ảnh và Banner", component: null },
            { path: '/template/css-custom', name: "Thay đổi CSS", component: null },
            { path: '/template/change-theme', name: "Thay đổi Theme", component: null },
        ]
    },
    {
        path: '/setting', name: "Setting", icon: <SettingOutlined/>, children: [
            { path: '/setting/payment', name: "Thông tin thanh toán", component: null },
            { path: '/setting/domain', name: "Tên miền", component: null },
        ]
    },
]