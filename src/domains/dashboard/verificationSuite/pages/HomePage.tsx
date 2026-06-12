import React from 'react';

import { Col, Row, Skeleton, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@src/hooks/store';
import { paths } from '@src/routes/paths';

import HeaderBanner from '../components/HeaderBanner';
import HomePageHeader from '../components/HomePageHeader';
import VerificationCard from '../components/VerificationCard';
import useGetAllPrice from '../hooks/useGetPriceApi';
import { IdentityVerificationItem } from '../types';
import { businessVerification, identityVerification } from '../utils/data';

const HomePage = () => {
    const navigate = useNavigate();
    const { services } = useAppSelector(state => state.reducer.subscriptions);
    const identityServices = services?.userAccessibleServices || [];

    const filteredIdentityVerification = identityVerification.filter(item =>
        identityServices.includes(item.accessKey)
    );

    const filteredBusinessVerification = businessVerification.filter(item =>
        identityServices.includes(item.accessKey)
    );
    const { loading, priceData } = useGetAllPrice();

    return (
        <>
            <HomePageHeader />
            <HeaderBanner />
            {loading ? (
                <Skeleton />
            ) : (
                <>
                    <Row gutter={[17, 17]} className="mt-3">
                        <Col span={24}>
                            <Typography.Text
                                className="text-lg font-medium"
                                onClick={() =>
                                    navigate(paths.verificationSuite.verificationHistory)
                                }
                            >
                                Identity Verification
                            </Typography.Text>
                        </Col>
                        {filteredIdentityVerification.map((item: IdentityVerificationItem) => (
                            <Col xs={24} md={12} xl={6} key={item.accessKey || item.title}>
                                <VerificationCard
                                    title={item.title}
                                    desc={item.desc}
                                    logo={item.logo}
                                    inputComponents={item.inputComponents}
                                    price={priceData?.[item.accessKey] || 'N/A'}
                                    accessKeys={item.accessKey}
                                    serviceName={item.serviceName}
                                    serviceValue={item.serviceValue}
                                />
                            </Col>
                        ))}
                    </Row>
                    <Row gutter={[17, 17]} className="mt-6">
                        <Col span={24}>
                            <Typography.Text className="text-lg font-medium">
                                Business Verification
                            </Typography.Text>
                        </Col>
                        {filteredBusinessVerification.map((item: any) => (
                            <Col xs={24} md={12} xl={6} key={item.accessKey || item.title}>
                                <VerificationCard
                                    title={item.title}
                                    desc={item.desc}
                                    logo={item.logo}
                                    inputComponents={item.inputComponents}
                                    price={priceData?.[item.accessKey] || 'N/A'}
                                    accessKeys={item.accessKey}
                                    serviceName={item.serviceName}
                                    serviceValue={item.serviceValue}
                                />
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </>
    );
};

export default HomePage;
