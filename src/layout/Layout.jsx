import { Layout, theme } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import AContent from '../components/acontent/AContent';
import AHead from '../components/ahead/AHead';
import Aside from '../components/aside/Aside';
import apiService from '../utils/apiService';

const { Content } = Layout;
const App = () => {
    const { fullScreen } = useSelector((state) => state.LayoutReducer)
    return (
        <div className='w-full h-full'>
            {fullScreen ?
                <Layout className='flex w-full h-full'>
                    <Content
                        style={{
                            margin: '20px 16px',
                        }}
                    >
                        <AContent className="w-full h-full" />
                    </Content>
                </Layout>
                : <Layout className="w-full h-full">
                    <Aside />
                    <Layout className="site-layout">
                        <AHead />
                        <Layout className='overflow-auto bg-[#F6F6F6]'>
                            <div
                                style={{
                                    margin:'20px 16px',
                                }}
                            >
                                <AContent className="w-full h-full" />
                            </div>
                        </Layout>
                    </Layout>
                </Layout>}

        </div>
    )

}

export default App;