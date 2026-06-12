import React, { useEffect } from 'react';

import { Flex, Layout, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router-dom';

import { paths } from '@src/routes/paths';

import AddonDetailCard from '../components/add-ons/AddonDetailCard';
import GoBackIcon from '../components/GoBackIcon';
import PlanDetailsCard from '../components/subscription/review-order/PlanDetailsCard';
import { SelectedType } from '../types';

interface State {
    planId: number;
    selectedType: SelectedType;
    isAddOns: boolean;
    url: string;
    addOnpaymentPayload: {
        addonsAccessKey: string;
        packageId: number;
        pgAmount: number;
        quantity: number;
        title: string;
        description: string;
        rows: {
            column1: string;
            column2: string;
            column3: string;
        }[];
    };
}

const ReviewOrder = () => {
    const navigate = useNavigate();
    const subscriptionData = sessionStorage.getItem('PlanDetails');
    useEffect(() => {
        if (!subscriptionData) {
            navigate(`/${paths.plans.index}`);
        }
    }, [navigate, subscriptionData]);
    if (!subscriptionData) {
        return null;
    }
    const { planId, selectedType, isAddOns, url, addOnpaymentPayload }: State = JSON.parse(
        subscriptionData as string
    );
    return (
        <Layout className="overflow-hidden bg-white min-h-svh">
            <Content className="">
                <GoBackIcon url={url} isAddOns={isAddOns} />
                <Flex className="my-5">
                    <Typography.Text className="text-base sm:text-lg font-medium">
                        Review your plan
                    </Typography.Text>
                </Flex>

                {isAddOns ? (
                    <AddonDetailCard paymentPayload={addOnpaymentPayload} />
                ) : (
                    <PlanDetailsCard planId={planId} selectedType={selectedType} />
                )}
            </Content>
        </Layout>
    );
};

export default ReviewOrder;
