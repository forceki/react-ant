import { AuditOutlined, PieChartOutlined, AreaChartOutlined, SettingOutlined, ShopOutlined } from '@ant-design/icons';



export const side = (roles) => {
    let items = []

    //admin

    if (roles == 'ad93e908-b9cb-42a4-af99-8655755bea5f') {
        items = [
            {
                key: '1',
                label: 'Dashboard',
                icon: <PieChartOutlined />,
                routes: '/dashboard',
            },
            {
                key: '2',
                label: 'Product',
                icon: <AuditOutlined />,
                routes: '/master',
                children: [{
                    key: '2-a',
                    label: 'Product Add',
                    routes: '/product/add',
                }, {
                    key: '2-b',
                    label: 'Product List',
                    routes: '/product',
                }, {
                    key: '2-c',
                    label: 'Inbound Management',
                    routes: '/product/inbound',
                }]
            },
            {
                key: '3',
                label: 'Warehouse',
                icon: <ShopOutlined />,
                routes: '/warehouse',
                children: [{
                    key: '3-a',
                    label: 'List Warehouse',
                    routes: '/warehouse/list',
                },
                {
                    key: '3-b',
                    label: 'Shelf Management',
                    routes: '/warehouse/rack',
                }

                ]
            },
            {
                key: '4',
                label: 'Master',
                icon: <SettingOutlined />,
                routes: '/master',
                children: [{
                    key: '4-a',
                    label: 'Brand',
                    routes: '/master/brand',
                }, {
                    key: '4-b',
                    label: 'Customer',
                    routes: '/master/customer',
                }, {
                    key: '4-c',
                    label: 'Supplier',
                    routes: '/master/supplier',
                }, {
                    key: '4-d',
                    label: 'User',
                    routes: '/master/user',
                }]
            },
            {
                key: '5',
                label: 'Report',
                icon: <AreaChartOutlined />,
                routes: '/report',
            },
        ];
    }
    // Warehouse manager
    else if (roles == '821a1d66-6edd-4f54-b9c0-054d24d9e49e') {
        items = [
            {
                key: '1',
                label: 'Product',
                icon: <AuditOutlined />,
                routes: '/master',
                children: [{
                    key: '1-a',
                    label: 'Product Add',
                    routes: '/product/add',
                }, {
                    key: '1-b',
                    label: 'Product List',
                    routes: '/product',
                }, {
                    key: '1-c',
                    label: 'Inbound Management',
                    routes: '/product/inbound',
                }]
            },
            {
                key: '2',
                label: 'Report',
                icon: <AreaChartOutlined />,
                routes: '/report',
            },
        ];
    }
    // cashier
    else if (roles == '48a4ba50-fcd0-4771-9c97-e338cc9b53c4') {
        items = [
            {
                key: '1',
                label: 'Report',
                icon: <AreaChartOutlined />,
                routes: '/report',
            },
        ];
    }
    // shopkeeper
    else if (roles == '1cf41cf9-7e7f-4b27-b58f-fb664d734d46') {
        items = [
            {
                key: '1',
                label: 'Product',
                icon: <AuditOutlined />,
                routes: '/master',
                children: [{
                    key: '1-a',
                    label: 'Product List',
                    routes: '/product',
                }]
            },
        ];
    }

    return items
}



