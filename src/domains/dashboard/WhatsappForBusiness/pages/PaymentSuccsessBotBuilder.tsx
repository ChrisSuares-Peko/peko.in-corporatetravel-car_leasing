import React, { useEffect, useState } from 'react';

import { Button, Col, Flex, Row, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';

import paymentSuccess from '@assets/animation/paymentSuccess2.json';
import useUserInfo from '@src/hooks/useUserInfo';
import { paths } from '@src/routes/paths';

const { Text } = Typography;

const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: paymentSuccess,
};

const PaymentSuccessBotBuilder = () => {
    useUserInfo();
    // const { branding } = useAppSelector(state => state.reducer.auth);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [redirectUrl, setRedirectUrl] = useState(`${paths.dashboard.home}`);

    useEffect(() => {
        const storedUrl = sessionStorage.getItem('PurchaseUrl');
        if (storedUrl) {
            const { url } = JSON.parse(storedUrl);
            setRedirectUrl(url);
        }
        return () => {
            sessionStorage.removeItem('PurchaseUrl');
        };
    }, []);

    return (
        <Content className="flex justify-center items-center bg-white">
            <Col span={24} md={12} xxl={12}>
                <Flex vertical className="text-center">
                    <Flex className="mb-6">
                        <Lottie options={defaultOptions} height={100} />
                    </Flex>
                    <Text className="text-2xl font-medium">
                        You have successfully purchased WhatsApp for Business Add on
                    </Text>
                    <Text className="block mt-2 text-base text-gray-600">
                        You will receive a confirmation email shortly. Thank you for choosing Peko.
                    </Text>
                    <Row gutter={[10, 10]} justify="center" className="mt-8 gap-3">
                        <Link to={paths.dashboard.whatsappForBusiness}>
                            <Button type="primary" danger>
                                Go to WhatsApp for Business
                            </Button>
                        </Link>
                    </Row>
                </Flex>
            </Col>
        </Content>
    );
};

export default PaymentSuccessBotBuilder;
