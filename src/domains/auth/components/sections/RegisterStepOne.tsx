import React from 'react';

import { Typography, Flex, Image, Row, Col } from 'antd';
import { GoArrowUpRight } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom';

import logo from '@assets/mainLogo/Logo.png';
import back from '@assets/svg/back.svg';
import registerSteps from '@assets/svg/registerSteps.png';

import RegisterStepOneForm from '../forms/RegisterStepOneForm';

const { Text } = Typography;

const StepOne = () => {
    const navigate = useNavigate();

    return (
        <Row className="relative">
            <Row className="w-full" justify="center" align="middle">
                <Col
                    xs={{ span: 24, order: 2 }}
                    sm={{ span: 24, order: 2 }}
                    md={{ span: 24, order: 2 }}
                    lg={{ span: 12, order: 1 }}
                    xl={{ span: 12, order: 1 }}
                    className="flex items-center justify-center"
                >
                    <Flex
                        vertical
                        justify="center"
                        align="start"
                        className="w-full sm:w-[23.75rem] px-4 md:px-0 pt-2 md:pt-0"
                    >
                        <Image
                            src={logo}
                            alt="logo"
                            preview={false}
                            className="relative hidden md:flex -left-1"
                            width={130}
                        />
                        <Text className="mt-1 text-xl font-normal">Let’s get started for free</Text>
                        <RegisterStepOneForm />
                       
                        <Col className="mt-6 border-b-[.3px] w-full border-textInfoGrey" />
                        <Text className="flex items-center justify-center w-full mt-4 text-sm text-textBlack">
                            Already have an account?
                            <Text
                                className="inline-flex items-center text-sm font-semibold text-red-500 underline cursor-pointer ms-1"
                                onClick={() => navigate('/auth/login')}
                            >
                                <span>Sign in</span> <GoArrowUpRight />
                            </Text>
                        </Text>
                    </Flex>
                </Col>
                <Col
                    xs={{ span: 24, order: 1 }}
                    sm={{ span: 24, order: 1 }}
                    md={{ span: 24, order: 1 }}
                    lg={{ span: 12, order: 2 }}
                    xl={{ span: 12, order: 2 }}
                >
                    <Flex
                        className="h-[50vh] md:h-svh flex"
                        style={{
                            backgroundImage: `url(${registerSteps})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >
                        <div className="absolute inset-0 z-1 bg-gradient-to-b from-transparent via-transparent to-black/70 " />
                        <Link to="/auth/login" className="absolute sm:hidden top-2 left-2 h-max">
                            <Image
                                src={back}
                                alt="goback"
                                preview={false}
                                style={{ width: '2rem', height: '2rem' }}
                                className="z-50"
                            />
                        </Link>
                        <Text className=" text-sm md:text-3xl xxl:text-4xl text-white px-4 pb-5 font-light self-end p-0 md:p-10 max-w-[19rem] sm:max-w-4xl z-10 xxl:leading-[56px] md:leading-[40px]">
                            All-in-one platform for SMBs to manage all their payments, expenses,
                            travel, insurance, and automate operations
                        </Text>
                    </Flex>
                </Col>
            </Row>
        </Row>
    );
};
export default StepOne;
