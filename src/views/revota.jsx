import { Card } from 'antd';
import React from 'react';

const Dashboard = () => {
    return (
        <div className=' gap-3 w-full h-full'>
            <Card className='bg-[#92A79E] w-full min-h-full'>                
                {/* <div className='justify-content-center'> */}
                    <div onClick={()=> window.location.href = 'http://vecteezy.com/'}>

                    <img
                        src="/assets/img/revota2.png"
                        className="w-[300px] my-2"
                        alt="http://vecteezy.com/"
                        
                    />
                    </div>

                    <div className='grid grid-cols-2 my-10'>
                        <h1 className='text-white' style={{ fontSize: '50px' }}>Warehouse
                            <br />
                            Management
                            <br />
                            System</h1>
                        <img
                            src="/assets/img/home.png"
                            className="w-[400px] my-2 mx-auto"
                            alt="Revota"
                        />
                    </div>
                {/* </div> */}
            </Card>

        </div>


    )
};
export default Dashboard;