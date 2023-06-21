import { Card, Input } from 'antd';
import { layoutGenerator } from 'react-break';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { InputSignIn, PostSignIn } from '../../../redux/actions/login/SignInAction';

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { username, password } = useSelector((state) => state.SignInReducer)

    const layout = layoutGenerator({
        mobile: 0,
        phablet: 550,
        tablet: 768,
        desktop: 1280,
    });

    const OnAtLeastDesktop = layout.isAtMost('desktop');

    const login = async () => {
        // let data = await dispatch(PostSignIn(username, password))
       
        navigate('/')
       
    }

    return (

        // <OnAtLeastDesktop>
        <div className='md:flex w-full h-full'>
            <div className='container md:py-[190px] basis-1/2 flex h-full w-full justify-center items-center'>
                <div className='my-auto aspect-auto'>
                    <img src='/assets/img/loggin.png'
                        className="w-[400px] y-[400px]"
                        alt="Revota" />
                </div>
            </div>
            <div className='flex items-center h-full w-full basis-1/2'>
                <div className='container md:py-[130px] md:px-[130px]'>
                    <Card
                        bordered={true}
                        className="w-full container"
                    >
                        <h1>Welcome Back</h1>
                        <span className='text-gray-400'>Please enter your username/email and password</span>
                        <div className='flex pt-10 pb-3 flex-col gap-5'>
                            <Input placeholder="Username" size='large' allowClear onChange={(e) => dispatch(InputSignIn(e.target.value, 'username'))} />
                            <Input.Password placeholder="Password" size='large' onKeyUp={(e) => {
                                if(e.key === 'Enter'){
                                    login()
                                }
                            }} onChange={(e) => dispatch(InputSignIn(e.target.value, 'password'))} />
                        </div>
                        {/* <div className='grid'>
                            <span className='justify-self-end cursor-pointer text-[#6D9886]'>Forgot Password?</span>
                        </div> */}

                        <button className='btn-lg btn-primary w-full mt-10 mb-5' onClick={login
                        }>Login</button>
                        {/* <div className='grid'>
                            <div className='justify-self-center'>
                                <span className='text-gray-400'>Don’t have an account? </span>
                                <span className='text-[#6D9886] font-semibold cursor-pointer' onClick={() => navigate('/register')}>Register</span>
                            </div>
                        </div> */}
                    </Card>
                </div>

            </div>
        </div>

        // </OnAtLeastDesktop>

    );
};
export default SignIn;