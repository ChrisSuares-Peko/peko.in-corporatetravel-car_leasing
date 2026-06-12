import React from 'react';

import { Alert, Button, Col, Flex, Typography } from 'antd';

import { useAppDispatch } from '@src/hooks/store';

import useOrganizationSettingsApi from '../../hooks/OrganizationSettings/useOrganizationSettingsApi';
import { setPayrollProgress } from '../../slices/payrollAuth';

const DashboardBanner = () => {
    const dispatch = useAppDispatch();
    const { updateSkipDashboard, isLoading: skipDashboardLoader } = useOrganizationSettingsApi();
    const handleSkipDashboard = async () => {
        await updateSkipDashboard(false);
        dispatch(setPayrollProgress({ isSkippedDasboard: false }));
    };
    return (
        <Col className="xs:mb-2 md:mb-4">
            <Alert
                type="warning"
                showIcon
                message={
                    <Flex justify="space-between" align="center" wrap="wrap" gap={10}>
                        <Typography.Text className="text-[14px] text-[#000000]">
                            <span className="font-semibold">Complete Your Onboarding:</span> It
                            looks like you haven&apos;t completed your onboarding process. Important
                            information like your tax details, bank account, and personal
                            information is missing.
                        </Typography.Text>
                        <Button
                            type="default"
                            danger
                            className="border-[#FF4D4F] text-[#FF4D4F] font-medium"
                            onClick={handleSkipDashboard}
                            loading={skipDashboardLoader}
                        >
                            Complete Onboarding Now
                        </Button>
                    </Flex>
                }
            />
        </Col>
    );
};

export default DashboardBanner;
