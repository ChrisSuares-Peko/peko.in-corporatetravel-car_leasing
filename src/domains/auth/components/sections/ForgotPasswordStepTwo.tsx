/* eslint-disable @typescript-eslint/no-unused-vars */
import { Typography, Flex, Image } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import logo from '@assets/mainLogo/standard';
import reset from '@assets/svg/reset.svg';
import { useAppDispatch, useAppSelector } from '@src/hooks/store';
import useScreenSize from '@src/hooks/useScreenSize';

import useForgotPasswordApi from '../../hooks/useForgotPasswordApi';
import { forgotpasswordReset, forgotpasswordpreviousStep } from '../../slices/forgotpasswordSlice';

const { Title, Text } = Typography;
const ForgotPasswordStepTwo = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { email } = useAppSelector(state => state.reducer.forgotpassword);
    const { handleForgotPassword, isLoading } = useForgotPasswordApi();
    const { sm } = useScreenSize();

    const handleBackToLogin = () => {
        dispatch(forgotpasswordReset());
        navigate('/auth/login');
    };

    return (
        <Flex className="absolute h-screen w-full">
            <Flex vertical align="center" justify="center" className="gap-4 items-center w-full">
                <Image
                    src={logo}
                    alt=""
                    preview={false}
                    className="hidden md:block left-10"
                    width={120}
                />
                <Image src={reset} alt="" preview={false} />
                <Text className="text-center text-2xl font-medium">
                    Check your email for reset link
                </Text>
                <Flex vertical className="text-center">
                    <Text className=" text-black  font-normal">
                        A verification link has been sent to your email ID.{' '}
                    </Text>
                    {sm ? (
                        <Text className=" text-black  font-normal">
                            Please click on the link to reset your password. It may take a few
                            minutes <br /> for the email to arrive (check your spam folder).
                        </Text>
                    ) : (
                        <Text className=" text-black  font-normal">
                            Please click on the link to reset your password. It may take a few
                            minutes for the email to arrive (check your spam folder).
                        </Text>
                    )}
                </Flex>
                <Flex vertical className="text-center">
                    <Text className="text-black  font-normal">
                        Didn’t get it?{' '}
                        <Link to="">
                            {isLoading ? (
                                <Text className="text-red-500 ">Sending...</Text>
                            ) : (
                                <Text
                                    className="text-red-500 "
                                    onClick={() => dispatch(forgotpasswordpreviousStep())}
                                >
                                    Resend Email.
                                </Text>
                            )}
                        </Link>
                    </Text>
                </Flex>
                <Flex
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleBackToLogin()}
                >
                    <Text className="text-red-500 border border-red-500 px-12  rounded-sm   text-base">
                        Login
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default ForgotPasswordStepTwo;
