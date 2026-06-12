import { useEffect, useState } from 'react';

import { Button, Flex, Spin, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { PreviousSubscription } from '@src/domains/dashboard/IndividualPlan/types';

import styles from './styles.module.css';
import ConfirmationModal from '../modals/ConfirmationModal';

type Props = {
    children: any;
    subscriptionDetails: {
        isPurchased: boolean;
        previousSubscription: PreviousSubscription | null;
    };
    shouldBlockActions?: boolean;
    handleUpgrade: () => void;
    handleCancelSubscriptionPlan?: (subscriptionId: number) => Promise<boolean>;
    isLoading?: boolean;
};

const RenewalOverlay = ({
    children,
    subscriptionDetails,
    handleCancelSubscriptionPlan,
    shouldBlockActions = true,
    handleUpgrade,
    isLoading,
}: Props) => {

    const container = document.getElementById('myContainer');
    const breadcrumb = document.getElementById('custom-breadcrumb');
    const [cancelModal, setCancelModal] = useState(false);

    const { isPurchased, previousSubscription } = subscriptionDetails;
    const isExpired = !isPurchased && previousSubscription;

    const { packageName } = previousSubscription || {};

    const handleCancel = async () => {
        setCancelModal(false);
        if (previousSubscription) {
            if (handleCancelSubscriptionPlan) {
                if (previousSubscription.subscriptionId !== undefined) {
                    await handleCancelSubscriptionPlan(previousSubscription.subscriptionId);
                }
            }
        }
    };

    useEffect(() => {
        if (!container) return () => { };

        if (isExpired) {
            container.classList.remove('sm:pt-8');
            container.classList.add('relative', 'xs:pt-32', 'sm:pt-16');

            // if (shouldBlockActions) {
            //     container.classList.remove('bg-white');
            //     container.classList.add('bg-[#f2f2f2]');
            // }
            // footerContainer.style.backgroundColor = '#f2f2f2';
            // if (breadcrumb) {
            //     breadcrumb.style.backgroundColor = '#f2f2f2';
            // }
        }
        return () => {
            if (isExpired) {
                container.classList.remove('relative', 'xs:pt-32', 'sm:pt-16', 'bg-[#f2f2f2]');
                container.classList.add('sm:pt-8', 'bg-white');
                container.classList.add('sm:pt-8', 'bg-white');

                // footerContainer.style.removeProperty('background-color');
                // if (breadcrumb) {
                //     breadcrumb.style.removeProperty('background-color');
                // }
            }
        };
    }, [isExpired, container, breadcrumb, shouldBlockActions]);

    function capitalizeFirstLetter(str: string) {
        if (!str) return str;
        str = str.toLowerCase();
        if (str === 'esign') return 'eSign';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <>
            {isExpired && (
                <Flex className="bg-[#DB372C] px-5 py-2 gap-5 sm:items-center mb-5 flex-col sm:flex-row absolute left-0 top-0 w-full">
                    <Typography.Text className="text-xs text-white">
                        Your auto-renewal payment could not be processed after multiple attempts.
                        Please complete your payment by clicking &#39;Upgrade&#39; to restore full
                        access to the {capitalizeFirstLetter(previousSubscription.packageName)}{' '}
                        service.
                    </Typography.Text>

                    <Flex className="gap-6">
                        <Button
                            size="small"
                            className={`text-white bg-inherit border-white rounded-[4px] hover:bg-none ${styles.removeHoverBg}`}
                            onClick={() => {
                                handleUpgrade();
                            }}
                        >
                            Upgrade
                        </Button>
                        {previousSubscription.packageType === 'GROUP' && (
                            <Button
                                size="small"
                                className={`text-white border-white w-1/2 bg-inherit rounded-[4px] hover:bg-none ${styles.removeHoverBg}`}
                                onClick={() => {
                                    setCancelModal(true);
                                }}
                            >
                                Cancel
                            </Button>
                        )}
                    </Flex>
                </Flex>

            )}
            <Content className={`${isExpired && shouldBlockActions ? 'pointer-events-none' : ''}`}>
                {isLoading && (
                    <Flex className="absolute inset-0 z-10 items-center justify-center bg-white bg-opacity-50">
                        <Spin />
                    </Flex>
                )}
                {children}
            </Content>
            {cancelModal && (
                <ConfirmationModal
                    handleSubmit={handleCancel}
                    handleCancel={() => setCancelModal(false)}
                    isOpen={cancelModal}
                    title={`Are you sure you want to cancel your ${capitalizeFirstLetter(packageName!)} subscription? This will remove access to premium features.`}
                    isLoading={false}
                />
            )}
        </>
    );
};

export default RenewalOverlay;
