import { memo, Suspense, useCallback, useMemo, useState } from 'react';

import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Empty, Flex, Image, Row, Skeleton, Typography } from 'antd';
import { capitalize } from 'lodash';
import { Link, useNavigate } from 'react-router-dom';

import ConfirmationModal from '@components/molecular/modals/ConfirmationModal';
import PekoOne from '@src/domains/dashboard/plans/assets/logo/PekoOne.png';
import useUserInfo from '@src/hooks/useUserInfo';
import { paths } from '@src/routes/paths';
import { formattedDateWithDefault } from '@utils/dateFormat';
import { formatNumberWithLocalString } from '@utils/priceFormat';

import { packageRoutes } from '../utils';
import TextCard from './billing_saved_cards/TextCard';
import ExpiredSubscriptionCard from './subscription_plans/ExpiredSubscriptionCard';
import ListPoints from './subscription_plans/ListPoints';
import useCurrentSubscription from '../hooks/subscriptions/useCurrentSubscription';
import { ActiveSubscription, BillingTypes, PackageStatus } from '../types/subscription';

const { Text } = Typography;

const SubscriptionPlans = () => {
    const navigate = useNavigate();
    const initialValues = {
        page: 1,
        itemsPerPage: 1000,
        status: PackageStatus.Active,
    };
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [hasSameCustomPackage, setHasSameCustomPackage] = useState(false);

    const [selectedPackage, setSelectedPackage] = useState<null | ActiveSubscription>(null);
    const { isLoading, data, individualPackages, handleCancelSubscription } =
        useCurrentSubscription(initialValues);

    const { getUserServicesData } = useUserInfo();

    const activeIndividualPackages = useMemo(
        () => individualPackages?.filter(pkg => pkg.status !== PackageStatus.Expired) || [],
        [individualPackages]
    );

    const expiredIndividualPackages = useMemo(
        () => individualPackages?.filter(pkg => pkg.status === PackageStatus.Expired) || [],
        [individualPackages]
    );

    const handleCancelModal = () => {
        setOpenConfirmationModal(false);
        setSelectedPackage(null);
    };
    const handleOpenCancelModal = useCallback(
        (selected: ActiveSubscription) => {
            const packageId = selected.package.id;
            const sameCustomPackage = individualPackages.some(
                pkg => pkg.package.id === packageId && selected.id !== pkg.id && pkg.isCustom
            );
            setHasSameCustomPackage(sameCustomPackage);

            setSelectedPackage(selected);
            setOpenConfirmationModal(true);
        },
        [individualPackages]
    );

    const handleConfirmation = useCallback(() => {
        handleCancelSubscription(selectedPackage?.id!).then(success => {
            setOpenConfirmationModal(false);
            getUserServicesData();
        });
    }, [selectedPackage, handleCancelSubscription, getUserServicesData]);

    const featuresArray = useMemo(() => data?.package.description?.split('\n') || [], [data]);
    const servicesArray = useMemo(() => data?.package?.serviceList?.split('\n') || [], [data]);

    if (isLoading) {
        return (
            <Row
                className="h-full mt-8 rounded-md"
                justify="center"
                align="middle"
                gutter={[0, 20]}
            >
                <Skeleton active />
            </Row>
        );
    }
    if (!data && (!individualPackages || individualPackages.length === 0)) {
        return (
            <Row
                className="h-full mt-8 rounded-md "
                justify="center"
                align="middle"
                gutter={[0, 20]}
            >
                <Empty description="No Plans Available" />
            </Row>
        );
    }
    return (
        <>
            <Row
                className="h-full rounded-md sm:mt-4 "
                justify="center"
                align="middle"
                gutter={[0, 20]}
            >
                {data && (
                    <>
                        <Flex
                            className="flex-col w-full h-full p-8 border border-gray-200 border-solid md:flex-row rounded-2xl xs:bg-bgLightGray md:bg-white"
                            justify="space-between"
                            align="center"
                            gap={60}
                        >
                            <Flex>
                                <Image
                                    src={data?.package?.packageLogo || PekoOne}
                                    preview={false}
                                    width={130}
                                />
                            </Flex>
                            <Flex className="flex flex-1">
                                <Row gutter={[10, 20]} className="w-full">
                                    <Row>
                                        <Text className="text-xl font-medium">
                                            {data?.package?.packageName} (
                                            {capitalize(data?.billingType)})
                                        </Text>
                                    </Row>
                                    <Row
                                        justify="start"
                                        className="w-full gap-16 xl:gap-32"
                                        gutter={[0, 30]}
                                    >
                                        <TextCard
                                            label="Total Amount"
                                            value={`₹ ${formatNumberWithLocalString(data.subscriptionAmountPaid)}`}
                                        />
                                        <TextCard label="Status" value={capitalize(data.status)} />
                                        <TextCard
                                            label="Plan Started"

                                            value={formattedDateWithDefault(
                                                new Date(data.subscriptionStartDate)
                                            )}
                                        />
                                        <TextCard
                                            label="Valid Until"
                                            value={formattedDateWithDefault(
                                                new Date(data.subscriptionEndDate)
                                            )}
                                        />
                                        {/* {!data.isCancelled && (
                                            <TextCard label="Payment Mode" value="Auto" />
                                        )} */}
                                    </Row>
                                </Row>
                            </Flex>
                            <Flex justify="end" vertical gap={20} align="center">
                                {!data.isTopMostPlan && (
                                    <Link to={`/${paths.plans.index}`}>
                                        <Button danger className="text-xs font-medium">
                                            Upgrade Plan
                                        </Button>
                                    </Link>
                                )}

                                {data?.billingType === 'MONTHLY' && (
                                    <Button
                                        danger
                                        className="text-xs font-medium"
                                        onClick={() => {
                                            const currentPageUrl =
                                                window.location.href.split('?')[0];
                                            sessionStorage.setItem(
                                                'PlanDetails',
                                                JSON.stringify({
                                                    url: `${currentPageUrl}?activeTab=3`,
                                                    service: data?.package.packageName,
                                                    planId: data?.package.id,
                                                    selectedType: 'annually',
                                                    isAddOns: false,
                                                })
                                            );
                                            navigate(
                                                `/${paths.plans.index}/${paths.plans.reviewOrder}`
                                            );
                                        }}
                                    >
                                        Upgrade to Annually
                                    </Button>
                                )}

                                {data.isCancelled ? (
                                    <Text className="text-red-700 cursor-pointer">
                                        Cancellation effective on{' '}
                                        {formattedDateWithDefault(new Date(data.subscriptionEndDate))}
                                    </Text>
                                ) : (
                                    <Text
                                        onClick={() => handleOpenCancelModal(data)}
                                        className="text-red-700 cursor-pointer"
                                    >
                                        <CloseCircleOutlined className="pe-2" />
                                        Cancel my plan
                                    </Text>
                                )}
                            </Flex>
                        </Flex>
                        <ListPoints
                            title="Services"
                            items={servicesArray}
                            showTicks
                            itemsPerColumn={4}
                        />

                        <ListPoints
                            title="Features"
                            items={featuresArray}
                            showTicks={false}
                            itemsPerColumn={featuresArray.length}
                        />
                    </>
                )}
                {activeIndividualPackages &&
                    activeIndividualPackages.length > 0 &&
                    activeIndividualPackages.map(individualPlan => (
                        <Flex
                            key={individualPlan.id}
                            className="flex-col w-full h-full p-8 px-10 border border-gray-200 border-solid md:flex-row rounded-2xl xs:bg-bgLightGray md:bg-white"
                            justify="space-between"
                            align="center"
                            gap={60}
                        >
                            <Flex className="flex flex-1">
                                <Row gutter={[10, 20]} className="w-full">
                                    <Row>
                                        <Text className="text-xl font-medium">
                                            {individualPlan.isCustom
                                                ? `${individualPlan.package.packageName} - Add on `
                                                : individualPlan.package.packageName}{' '}
                                            ({capitalize(individualPlan.billingType)})
                                        </Text>
                                    </Row>
                                    <Row className="w-full">
                                        <Flex
                                            // wrap="wrap"
                                            justify="start"
                                            className="flex-wrap w-full gap-10 xl:gap-24 xxl:flex-nowrap"
                                        >
                                            <TextCard
                                                label="Total Amount"
                                                value={`₹ ${formatNumberWithLocalString(individualPlan.subscriptionAmountPaid)}`}
                                            />
                                            <TextCard
                                                label="Status"
                                                value={capitalize(individualPlan.status)}
                                            />
                                            <Flex className="w-32">
                                                <TextCard
                                                    label="Plan Started"
                                                    value={formattedDateWithDefault(
                                                        new Date(
                                                            individualPlan.subscriptionStartDate
                                                        )
                                                    )}
                                                />
                                            </Flex>
                                            <Flex className="w-32">
                                                <TextCard
                                                    label="Valid Until"
                                                    value={formattedDateWithDefault(
                                                        new Date(individualPlan.subscriptionEndDate)
                                                    )}
                                                />
                                            </Flex>
                                            {!individualPlan.isCancelled && (
                                                <TextCard label="Payment Mode" value="Auto" />
                                            )}
                                        </Flex>
                                    </Row>
                                </Row>
                            </Flex>
                            <Flex
                                justify="end"
                                vertical
                                gap={20}
                                align="center"
                                className="min-w-40"
                            >
                                {individualPlan.billingType === 'MONTHLY' &&
                                !individualPlan.isCustom &&
                                individualPlan.tableName === 'subscription' ? (
                                    <Button
                                        danger
                                        className="text-xs font-medium"
                                        onClick={() => {
                                            const baseUrl = window.location.origin;
                                            const packageName = individualPlan.package
                                                .packageName as keyof typeof packageRoutes;
                                            const routePath = packageRoutes[packageName] ?? paths.dashboard.home;
                                            
                                            const normalizedBaseUrl = baseUrl.replace(/\/+$/, '');
                                            const normalizedPath = routePath.replace(/^\/+/, '');
                                            const currentPageUrl = `${normalizedBaseUrl}/${normalizedPath}`.replace(
                                                /([^:]\/)\/+/g,
                                                '$1'
                                            );

                                            sessionStorage.setItem(
                                                'PlanDetails',
                                                JSON.stringify({
                                                    url: `${currentPageUrl}`,
                                                    service: individualPlan.package.packageName,
                                                    planId: individualPlan.package.id,
                                                    selectedType: 'annually',
                                                    isAddOns: false,
                                                })
                                            );
                                            navigate(
                                                `/${paths.plans.index}/${paths.plans.reviewOrder}`,
                                                {
                                                    state: { isSettingsPage: true },
                                                }
                                            );
                                        }}
                                    >
                                        Upgrade to Annually
                                    </Button>
                                ) : (
                                    ''
                                )}
                                {individualPlan.isCancelled ? (
                                    <Text className="text-red-700 cursor-pointer">
                                        Cancellation effective on{' '}
                                        {formattedDateWithDefault(
                                            new Date(individualPlan.subscriptionEndDate)
                                        )}
                                    </Text>
                                ) : (
                                    <Text
                                        onClick={() => handleOpenCancelModal(individualPlan)}
                                        className="text-red-700 cursor-pointer"
                                    >
                                        <CloseCircleOutlined className="pe-2" />
                                        Cancel my plan
                                    </Text>
                                )}
                            </Flex>
                        </Flex>
                    ))}

                      {expiredIndividualPackages.map(individualPlan => (
                    <ExpiredSubscriptionCard
                        key={individualPlan.id}
                        plan={individualPlan}
                        onCancel={handleOpenCancelModal}
                    />
                ))}
            </Row>
            {openConfirmationModal && (
                <Suspense fallback={<Skeleton />}>
                    <ConfirmationModal
                        isOpen={openConfirmationModal}
                        handleCancel={handleCancelModal}
                        title={`Are you sure you want to cancel your ${selectedPackage?.billingType === BillingTypes.Annually ? 'annual' : 'monthly'} subscription? ${!selectedPackage?.isCustom && hasSameCustomPackage ? 'All of your add-ons will also be cancelled.' : ''}`}
                        handleSubmit={handleConfirmation}
                        isLoading={isLoading!}
                    />
                </Suspense>
            )}
        </>
    );
};

export default memo(SubscriptionPlans);
