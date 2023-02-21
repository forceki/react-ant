import { FileOutlined, PieChartOutlined, UserOutlined, DesktopOutlined, TeamOutlined } from '@ant-design/icons';

import Dashboard from '../../views/dashboard/Dashboard';

const items = [
    {
        key: '1',
        label: 'Dashboard',
        icon: <PieChartOutlined />,
        routes: '/Dashboard',
    },
    {
        key: '2',
        label: 'Dashboard',
        icon: <PieChartOutlined />,
        routes: '/master',
        children: [{
            key: '1-a',
            label: 'Nganu',
            icon: <PieChartOutlined />,
            routes: '/master/brand',
        },{
            key: '1-b',
            label: 'Nganu',
            icon: <PieChartOutlined />,
            routes: '/dashboard',
            component: Dashboard,
        }]
    },



];

export default items