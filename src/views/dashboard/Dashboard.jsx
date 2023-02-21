import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
// import items from './side';

const { Header, Content, Sider } = Layout;


const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className='card bg-gray-400 w-full h-full'>
            <img
                src="./src/assets/logo.svg"
                className="mx-auto w-[40px] my-2"
                alt="Revota"
            />
        </div>


    )
};
export default Dashboard;