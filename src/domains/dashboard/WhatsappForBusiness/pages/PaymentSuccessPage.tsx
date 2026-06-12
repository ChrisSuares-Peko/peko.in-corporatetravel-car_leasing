import React, { useEffect, useState } from 'react';

import { Button, Col, Flex, Row, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';

import paymentSuccess from '@assets/animation/paymentSuccess2.json';
import useUserInfo from '@src/hooks/useUserInfo';
import { paths } from '@src/routes/paths';

import { useGenerateEmbeddedSignupURL } from '../hooks/useGenerateEmbeddedSignupURL';
import GetAllProjects from '../hooks/useGetProjects';

const { Text } = Typography;

const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: paymentSuccess,
};

const PaymentSuccess = () => {
    useUserInfo();
    const [redirectUrl, setRedirectUrl] = useState(`${paths.dashboard.home}`);
    const { generateURL, isLoading: embeddedLoading } = useGenerateEmbeddedSignupURL();

    const { projectData, isLoading } = GetAllProjects();

    const handleApplyNowClick = async (projectId: string) => {
        // setAccountStatusLoading(projectId);
        try {
            const response = await generateURL(projectId);
            if (response && response.embeddedSignupURL) {
                window.open(response.embeddedSignupURL, '_blank');
            } else {
                console.error('Embedded signup URL is missing.');
            }
        } catch (error) {
            console.error('Error generating URL:', error);
        }
    };

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

    // const handleClick = () => {
    //     navigate(`/${paths.settings.index}`, { state: { activeTab: '2' } });
    // };

    return (
        <Content className="flex justify-center items-center bg-white">
            <Col span={24} md={12} xxl={12}>
                <Flex vertical className="text-center">
                    <Flex className="mb-6">
                        <Lottie options={defaultOptions} height={100} />
                    </Flex>
                    <Text className="text-2xl font-medium">
                        You have successfully purchased WhatsApp for Business plan
                    </Text>
                    <Text className="block mt-2 text-base text-gray-600">
                        You will receive a confirmation email shortly. Thank you for choosing Peko.
                    </Text>
                    <Row gutter={[10, 10]} justify="center" className="mt-8 gap-3">
                        {!projectData?.[0]?.is_whatsapp_verified && (
                            <Button
                                type="default"
                                onClick={() => handleApplyNowClick(projectData?.[0].id ?? '')}
                                danger
                            >
                                Verify your WhatsApp for Business Account
                            </Button>
                        )}
                        <Link to={paths.dashboard.whatsappForBusiness}>
                            <Button type="default" danger>
                                Go to WhatsApp for Business
                            </Button>
                        </Link>
                    </Row>
                </Flex>
            </Col>
        </Content>
    );
};

export default PaymentSuccess;
