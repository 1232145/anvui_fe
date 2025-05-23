import Home from "../pages/Home";
import { FileOutlined, HomeOutlined, FilePptOutlined, MenuOutlined, LaptopOutlined, SettingOutlined } from '@ant-design/icons';
import Page from '../pages/Page';
import CreateNews from '../pages/News/CreateNews';
import NewsList from '../pages/News/NewsList';
import NewsCategory from '../pages/News/NewsCategory';
import CreateNewsCategory from '../pages/News/CreateNewsCategory';
import MenuList from '../pages/Menu/MenuList';
import Slide from '../pages/Template/Slide';
import CustomCSS from '../pages/Template/CustomCSS';
import Theme from '../pages/Template/Theme';
import Payment from '../pages/Setting/Payment';
import Domain from '../pages/Setting/Domain';
import NotFoundPage from "../pages/Error/NotFoundPage";
import ErrorPage from '../pages/Error/ErrorPage';
import CreatePage from "../pages/Page/CreatePage";

export const publicRoutes = [
    { path: '/home', name: "Trang chủ", icon: <HomeOutlined />, component: Home },
    { path: '/news/create-news', name: "Thêm tin tức", component: CreateNews },
    { path: '/news/news-list', name: "Danh sách tin tức", component: NewsList },
    { path: '/news/create-news-category', name: "Thêm danh mục tin tức", component: CreateNewsCategory },
    { path: '/news/news-category', name: "Danh mục tin tức", component: NewsCategory },
    { path: '/page', name: "Page", icon: <FilePptOutlined />, component: Page },
    { path: 'page/create-page', name: "Thêm trang", component: CreatePage},
    { path: '/menu/menu-list', name: "Danh sách menu", component: MenuList },
    { path: '/template/slide-banner', name: "Slide ảnh và Banner", component: Slide },
    { path: '/template/custom-css', name: "Thay đổi CSS", component: CustomCSS },
    { path: '/template/change-theme', name: "Thay đổi Theme", component: Theme },
    { path: '/setting/payment', name: "Thông tin thanh toán", component: Payment },
    { path: '/setting/domain', name: "Tên miền", component: Domain },
    { path: '*', name: "NotFound", component: NotFoundPage},
    { path: '/error', name: "Error", component: ErrorPage}
]

export const navRoutes = [
    { path: '/home', component: Home, name: "Trang chủ", icon: <HomeOutlined /> },
    {
        path: null, name: "Tin Tức", icon: <FileOutlined />, children: [
            { path: '/news/create-news', name: "Thêm tin tức", component: CreateNews },
            { path: '/news/news-list', name: "Danh sách tin tức", component: NewsList },
            { path: '/news/create-news-category', name: "Thêm danh mục tin tức", component: CreateNewsCategory },
            { path: '/news/news-category', name: "Danh mục tin tức", component: NewsCategory },
        ]
    },
    { path: '/page', component: Page, name: "Page", icon: <FilePptOutlined /> },
    {
        path: 'null', name: "Menu", icon: <MenuOutlined />, children: [
            { path: '/menu/menu-list', name: "Danh sách menu", component: MenuList },
        ]
    },
    {
        path: null, name: "Giao diện", icon: <LaptopOutlined />, children: [
            { path: '/template/slide-banner', name: "Slide ảnh và Banner", component: Slide },
            { path: '/template/custom-css', name: "Thay đổi CSS", component: CustomCSS },
            { path: '/template/change-theme', name: "Thay đổi Theme", component: Theme },
        ]
    },
    {
        path: '/setting', name: "Setting", icon: <SettingOutlined/>, children: [
            { path: '/setting/payment', name: "Thông tin thanh toán", component: Payment },
            { path: '/setting/domain', name: "Tên miền", component: Domain },
        ]
    },
]