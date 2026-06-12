import React, { useEffect, useState } from 'react';

import { Result, Button, Flex, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Skeleton from 'react-loading-skeleton';
import Lottie from 'react-lottie';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import paymentSuccess from '@assets/animation/paymentSuccess2.json';
import useUserInfo from '@src/hooks/useUserInfo';
import { paths } from '@src/routes/paths';

const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: paymentSuccess,
};

const serviceTitles: { [key: string]: string } = {
    Payroll: 'Your payment for Payroll subscription was successful',
    Cloud: 'Your payment for Hub subscription was successful',
    Hub: 'Your payment for Hub subscription was successful',
    eSign: 'Your payment for eSign subscription was successful',
    Invoicing: 'Your payment for Invoicing subscription was successful',
    'WhatsApp For Business': 'Your payment for WhatsApp Business subscription was successful',
    Travel: 'Your payment for Corporate Travel subscription was successful',
    Cards: 'Your payment for Corporate Cards subscription was successful',
    Turbo: 'Your payment for Turbo subscription was successful',
    default: 'Payment Successful',
};


const PaymentSuccess = () => {
    useUserInfo();
    // const { branding } = useAppSelector(state => state.reducer.auth);
    const navigate = useNavigate();
    const location = useLocation();
    const [redirectUrl, setRedirectUrl] = useState(`${paths.dashboard.home}`);
    const [serviceName, setServiceName] = useState(`Dashboard`);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const lastVisited = sessionStorage.getItem('lastVisitedPath');
        const PlanDetails = sessionStorage.getItem('PlanDetails');
        if (PlanDetails) {
            setIsLoading(false);
            const { url, service, selectedType } = JSON.parse(PlanDetails);
            const urlObj = new URL(url);
            const path = urlObj.pathname;
            if (path === paths.dashboard.plans) {
                setRedirectUrl(paths.dashboard.home);
            } else {
                setRedirectUrl(url);
                sessionStorage.setItem('lastVisitedPath', path);
            }

            if (service) {
                if (service === "Peko+" && selectedType === "annually") {
                    setRedirectUrl(paths.dashboard.home);
                    setServiceName("Dashboard");
                } else {
                    setServiceName(service);
                }
            }
        } else {
            setIsLoading(true);
            if(lastVisited){
                navigate(lastVisited, {replace: true});
                sessionStorage.removeItem('lastVisitedPath');
            }else{
                navigate(paths.dashboard.home)
            }
        }
        return () => {
            sessionStorage.removeItem('PlanDetails');
        };
    }, [navigate]);
    const { packageName } = location.state || {};

    const serviceLabels: { [key: string]: string } = {
        payroll: 'Payroll',
        Cloud: 'Hub',
        eSign: 'eSign',
        Invoicing: 'Invoicing',
        'WhatsApp For Business': 'WhatsApp Business',
        default: serviceName,
    };

    const handleClick = () => {
        navigate(`/${paths.settings.index}`, { state: { activeTab: '3' } });
    };

    const buttonLabel = serviceLabels[serviceName] || serviceLabels.default;

    const title = packageName
        ? `Congratulations, your ${packageName.toLowerCase()} package is activated now`
        : serviceTitles[serviceName] || serviceTitles.default;

    const subTitle = packageName
        ? `Explore our range of subscription plans to unlock exclusive features and simplify your payments with Peko`
        : `You will receive a confirmation email shortly.Thank you for choosing Peko.`;

    return (
        <Content className="flex items-center justify-center min-h-[30rem]">
        <Flex
            vertical
            justify="center"
            align="center"
            gap={20}
            className="pgsuccess"
        >
            {isLoading ? (
                <Skeleton />
            ) :
                (
                    <Result
                        className="p-0"
                        icon={<Lottie options={defaultOptions} height={100} />}
                        status="success"
                        title={title}
                        subTitle={
                            <Flex justify="center">
                                <Typography.Text className="sm:text-nowrap">{subTitle}</Typography.Text>
                            </Flex>
                        }
                        extra={[
                            <Flex justify="center" gap={15} key="btn">
                                <Link to={`${redirectUrl}`}>
                                    <Button type="primary" danger>
                                        Go to {buttonLabel}
                                    </Button>
                                </Link>
                                <Button onClick={handleClick}>View Your Subscription</Button>
                            </Flex>,
                        ]}
                    />
                )}
        </Flex>
        </Content>
    );
};

export default PaymentSuccess;
