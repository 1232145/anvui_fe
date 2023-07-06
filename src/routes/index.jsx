import Home from "../pages/Home";
import { UserOutlined} from '@ant-design/icons';
import News from '../pages/News';
import Page from '../pages/Page'
import Setting from "../pages/Setting";

export const publicRoutes = [
    {path: '/', component: Home, name: "Home", icon: <UserOutlined />},
    {path: '/news', component: News, name: "News", icon: null, children: [],},
    {path: '/page', component: Page, name: "Page", icon: null},
    {path: '/setting', component: Setting, name: "Seting", icon: null},
]