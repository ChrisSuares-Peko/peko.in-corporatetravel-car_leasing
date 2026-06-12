import React from 'react';

import { Flex } from 'antd';

import { useScrollToTop } from '@src/hooks/useScrollToTop';
import { accessKeys } from '@utils/accessKeys';
import { packageAccessKeys } from '@utils/packageAccessKeys';

import SubscriptionPage from '../../IndividualPlan/pages/SubscriptionPage';
import HomePage from '../components/homepage/HomePage';
import { featureData, serviceDetails, subDescription } from '../utils/data';

const Dashboard = () => {
    const { garage } = accessKeys;
    const { garage:packageAccessKey } =packageAccessKeys
    useScrollToTop();

    return (
        <SubscriptionPage
            serviceName="Turbo"
            title="Your Smart Vehicle and Driver Assistant"
            serviceDetails={serviceDetails}
            subDescription={subDescription}
            accessCode={packageAccessKey}
            serviceAccessKey={garage}
            features={featureData}
        >
            <Flex vertical>
                <HomePage />
            </Flex>
        </SubscriptionPage>
    );
};

export default Dashboard;
