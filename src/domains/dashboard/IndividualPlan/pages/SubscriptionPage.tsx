import React, { useState } from 'react';

import { Col, Flex, Row, Skeleton } from 'antd';
import { Content } from 'antd/es/layout/layout';

import RenewalOverlay from '@components/molecular/subscription/RenewalOverlay';
import ServiceNotPurchasedPage from '@domains/dashboard/IndividualPlan/pages/ServiceNotPurchased';
import ServiceUnavailable from '@src/domains/failed/pages/ServiceUnavailable';
import { useAppSelector } from '@src/hooks/store';
import useScreenSize from '@src/hooks/useScreenSize';

import AdaptiveCommonLandingPage from './AdaptiveCommonLandingPage';
import NewIndividualLandingPage from './NewIndividualLandingPage';
import FeatureCard from '../components/FeatureCard';
import FeatureCardMob from '../components/FeatureCardMob';
import { useGetDetailsSubscription } from '../hooks/useGetDetailsSubscription';

// Define the prop types for the component
type SubscriptionPageProps = {
    accessCode: string;
    serviceAccessKey: string;
    serviceName: string;
    title: string;
    serviceDetails: string;
    subDescription: string;
    features: {
        icon: string;
        iconMob: string;
        title: string;
        description: string;
        link?: string;
    }[];
    invoiceCommissionData?: {
        isPercentage: boolean;
        charge: string;
        fixedSurcharge: number;
        uaeCardsCharge: number;
        internationalCardsCharge: number;
    };
    children: React.ReactNode;
};

const SubscriptionPage = ({
    accessCode,
    serviceAccessKey,
    invoiceCommissionData,
    serviceName,
    title,
    serviceDetails,
    subDescription,
    features,
    children,
}: SubscriptionPageProps) => {
    const { xs } = useScreenSize();
    const { user } = useAppSelector(state => state.reducer.user);
    const [showPurchasePage, setShowPurchasePage] = useState(false);
    const handleShowPurchasePage = () => setShowPurchasePage(true);

    const { isLoading: subscriptionLoading, subscriptionData } = useGetDetailsSubscription(
        accessCode,
        serviceAccessKey
    );

    if (subscriptionLoading) {
        return <Skeleton />;
    }

    if (!subscriptionData || subscriptionData.packageDetails.length === 0) {
        return <ServiceUnavailable />;
    }

    if (!subscriptionData.isPurchased && user?.roleName === 'corporate sub user') {
        return <ServiceNotPurchasedPage />;
    }

    if (
        !subscriptionData.isPurchased &&
        (!subscriptionData.previousSubscription || showPurchasePage)
    ) {
        return (
            xs !== undefined && (
                <Content style={{ maxWidth: '1500px', margin: '0 auto', padding: '0 20px' }}>
                    {xs ? (
                        <AdaptiveCommonLandingPage
                            serviceName={serviceName}
                            title={title}
                            serviceDetails={serviceDetails}
                            subDescription={subDescription}
                            packageDetails={subscriptionData.packageDetails[0]}
                            invoiceCommissionData={invoiceCommissionData}
                        >
                            <Row gutter={[15, 15]}>
                                {features.map((feature, index) => (
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
                            title={title}
                            serviceDetails={serviceDetails}
                            subDescription={subDescription}
                            invoiceCommissionData={invoiceCommissionData}
                            packageDetails={subscriptionData.packageDetails[0]}
                        >
                            <Flex justify="center" align="center">
                                <div className="feature-cards-container">
                                    {features.map((feature, index) => (
                                        <div className="feature-card" key={index}>
                                            <FeatureCard icon={feature.icon} />
                                        </div>
                                    ))}
                                </div>
                            </Flex>
                        </NewIndividualLandingPage>
                    )}
                </Content>
            )
        );
    }
    return (
        <RenewalOverlay
            subscriptionDetails={subscriptionData}
            handleUpgrade={handleShowPurchasePage}
        >
            {children}
        </RenewalOverlay>
    );
};

export default SubscriptionPage;
