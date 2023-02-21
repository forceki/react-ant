import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SwitchUserBar } from '../../redux/actions/layout/LayoutAction';
import { Avatar, Space } from 'antd';
import { useLocation } from 'react-router';
import { HomeIcon } from '@heroicons/react/24/solid'
const { Header } = Layout;


const AHead = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const { userBar } = useSelector((state) => state.LayoutReducer)
    let path = location.pathname
    const pathArray = path.split("/").filter(function (e) {
        return e != '';
    });
    return (
        <nav className="bg-white">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item className='fs-bold' href='/'>
                            Home</Breadcrumb.Item>
                        {
                            pathArray.map((e, i) =>
                                <Breadcrumb.Item key={i}>{e}</Breadcrumb.Item>
                            )
                        }

                    </Breadcrumb>
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                        <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                        <div className="relative ml-3">
                            <div>
                                <button type="button" className="flex rounded text-sm" id="user-menu-button" aria-expanded="false" aria-haspopup="true" onClick={(e) => dispatch(SwitchUserBar(userBar))}>
                                    <Space wrap size={16}>
                                        <Avatar shape="square" className='bg-[#6D9886]' size={40} >M</Avatar>
                                    </Space>
                                </button>
                            </div>
                            {
                                userBar ?
                                    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
                                    </div> : ''
                            }

                        </div>
                    </div>
                </div>
            </div>


            <div className="sm:hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Dashboard</a>

                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>

                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>

                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a>
                </div>
            </div>
        </nav>


    );
};
export default AHead;