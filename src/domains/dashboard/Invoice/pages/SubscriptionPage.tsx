import React from 'react';

import { Col, Flex, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';

import collectorIcon from '@src/assets/collectorIcon.png';
import useScreenSize from '@src/hooks/useScreenSize';
import { accessKeys } from '@utils/accessKeys';
import { packageAccessKeys } from '@utils/packageAccessKeys';

import FeatureCard from '../../IndividualPlan/components/FeatureCard';
import FeatureCardMob from '../../IndividualPlan/components/FeatureCardMob';
import { useGetDetailsSubscription } from '../../IndividualPlan/hooks/useGetDetailsSubscription';
import AdaptiveCommonLandingPage from '../../IndividualPlan/pages/AdaptiveCommonLandingPage';
import NewIndividualLandingPage from '../../IndividualPlan/pages/NewIndividualLandingPage';
import { CollectorFeatures, serviceDetails, subDescription } from '../utils/features';

type SubscriptionPageProps = {
    data?: any;
};
const SubscriptionPage = ({ data }: SubscriptionPageProps) => {
    const { xs } = useScreenSize();
    const { subscriptionData } = useGetDetailsSubscription(
        packageAccessKeys.Invoicing,
        accessKeys.paymentLinks
    );
    const serviceName = subscriptionData?.packageDetails[0]?.packageName ?? "Invoicing";
    return (
        <Content style={{ maxWidth: '1500px', margin: '0 auto', padding: '0 20px' }}>
            {xs ? (
                <AdaptiveCommonLandingPage
                    serviceName={serviceName}
                    title="Invoice smarter, get paid faster, and stay on top of every receivable. One platform for all your account receivables"
                    serviceDetails={serviceDetails}
                    subDescription={subDescription}
                    serviceKey={packageAccessKeys.Invoicing}
                    svgIcon={collectorIcon}
                    packageDetails={subscriptionData?.packageDetails[0]}
                >
                    <Row gutter={[15, 15]}>
                        {CollectorFeatures.map((feature, index) => (
                            <Col xs={12} key={index}>
                                <FeatureCardMob
                                    icon={feature.iconMob}
                                    title={feature.title}
                                    description={feature.description}
                                />
                            </Col>
                        ))}
                    </Row>
                </AdaptiveCommonLandingPage>
            ) : (
                <NewIndividualLandingPage
                    serviceName={serviceName}
                    title="Invoice smarter, get paid faster, and stay on top of every | receivable. One platform for all your account receivables"
                    serviceDetails={serviceDetails}
                    subDescription={subDescription}
                    serviceKey={packageAccessKeys.Invoicing}
                    svgIcon={collectorIcon}
                    packageDetails={subscriptionData?.packageDetails[0]}
                >
                    <Flex justify="center" align="center">
                        <div className="feature-cards-container">
                            {CollectorFeatures.map((feature, index) => (
                                <div className="feature-card " key={index}>
                                    <FeatureCard icon={feature.icon} />
                                </div>
                            ))}
                        </div>
                    </Flex>
                </NewIndividualLandingPage>
            )}
        </Content>
    );
};

export default SubscriptionPage;
