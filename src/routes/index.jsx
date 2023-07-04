import Home from "../pages/Home";
import { UserOutlined} from '@ant-design/icons';

export const publicRoutes = [
    {path: '/', component: Home, name: "Home", icon: <UserOutlined />},
]