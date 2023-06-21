import { Card, Input, InputNumber, Tag } from 'antd';
import { useState } from 'react';
import { layoutGenerator } from 'react-break';
import PhoneInput from 'react-phone-input-2';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { InputRegister, PostRegister } from '../../../redux/actions/login/RegisterAction';
import 'react-phone-input-2/lib/style.css'

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const register = useSelector((state) => state.RegisterReducer)
    const [loading, setLoading] = useState(false);

    const layout = layoutGenerator({
        mobile: 0,
        phablet: 550,
        tablet: 768,
        desktop: 1280,
    });

    const OnAtLeastTablet = layout.isAtMost('tablet');
    const OnAtLeastDesktop = layout.isAtMost('desktop');

    const registrasi = async () => {
        setLoading(true)
        dispatch(PostRegister(register))
        setLoading(false)
        
    }

    return (
        <>
            {/* <OnAtLeastDesktop> */}
            <div className='md:flex w-full h-full'>
                <div className='container md:py-[190px] basis-1/2 flex h-full w-full justify-center items-center'>
                    <div className='my-auto aspect-auto'>
                        <img src='/assets/img/loggin.png'
                            className="w-[400px] y-[400px]"
                            alt="Revota" />
                    </div>
                </div>
                <div className='flex items-center h-full w-full basis-1/2'>
                    <div className='container md:py-[50px] md:px-[130px]'>
                        <Card
                            bordered={true}
                            className="w-full container"
                        >
                            <h1>Get Started</h1>
                            <span className='text-gray-400'>Please fill the form correctly</span>
                            <div className='flex pt-10 pb-3 flex-col gap-5'>
                                <Input placeholder="Username" size='large' onBlur={(e)=> dispatch(InputRegister(e.target.value, 'username'))}/>
                                <Input placeholder="Email" size='large' onBlur={(e)=> dispatch(InputRegister(e.target.value, 'email'))}/>
                                <Input placeholder='Phone' onBlur={(e)=> dispatch(InputRegister(e.target.value, 'phone'))} className="w-full" />
                                <Input.Password placeholder="Password" size='large' onBlur={(e)=> dispatch(InputRegister(e.target.value, 'password'))}/>
                                <Input.Password placeholder="Confirm Password" size='large' onBlur={(e)=> dispatch(InputRegister(e.target.value, 'confirm_password'))}/>
                            </div>
                            {
                                loading ?
                            <button className='btn-lg btn-primary w-full mt-10 mb-3' disabled>Loading...</button>

                                 :
                            <button className='btn-lg btn-primary w-full mt-10 mb-3' onClick={()=> registrasi()}>Register</button>
                            }
                            <div className='grid'>
                                <div className='justify-self-center'>
                                    <span className='text-gray-400'>Already have an account?</span>
                                    <span className='text-[#6D9886] font-semibold cursor-pointer' onClick={() => navigate('/signin')}> Login</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* </OnAtLeastDesktop> */}
        </>


    );
};
export default Register;