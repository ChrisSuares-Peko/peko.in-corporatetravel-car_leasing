import React, { lazy } from 'react';

import { Button, Col, Divider, Flex, Image, Row, Skeleton, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router-dom';

import ServiceNotPurchasedPage from '@domains/dashboard/IndividualPlan/pages/ServiceNotPurchased';
import amount from '@domains/dashboard/Invoice/assets/amountIcon.svg';
import dashboard from '@domains/dashboard/Invoice/assets/dashboard.svg';
import pending from '@domains/dashboard/Invoice/assets/pendinIcon.svg';
import total from '@domains/dashboard/Invoice/assets/total.svg';
import { useAppSelector } from '@src/hooks/store';
import useScreenSize from '@src/hooks/useScreenSize';
import useServiceAccess from '@src/hooks/useSubscriptionCheck';
import { paths } from '@src/routes/paths';
import { accessKeys } from '@utils/accessKeys';
import { formatNumberWithLocalString } from '@utils/priceFormat';

import DashboardCard2 from './DashboardCard2';
import CollectorSubscriptionPage from './SubscriptionPage';
import DashboardCard from '../components/DashboardCard';
import KybButton from '../components/kyb/KybButton';
import useDashboard from '../hooks/UseDashboard';
import { featureRow } from '../utils/data';

const FeaturesCard = lazy(() => import('../components/FeaturesCard'));

const { Text } = Typography;

const Dashboard = () => {
    const navigate = useNavigate();
    const { xs, xxl } = useScreenSize();
    const isPurchased = useServiceAccess(accessKeys.paymentLinks);
    const { data, isLoading } = useDashboard();

    const { user } = useAppSelector(state => state.reducer.user);
    if (!isPurchased && user?.roleName === 'corporate sub user') {
        return <ServiceNotPurchasedPage />;
    }

    const getLineHeight = () => {
        switch (true) {
            case xxl:
                return '3.8rem';
            case xs:
                return '2rem';
            default:
                return '2.8rem';
        }
    };
    if (isPurchased === undefined || isLoading)
        return (
            <Content>
                <Skeleton />
            </Content>
        );
    return !isPurchased ? (
        <CollectorSubscriptionPage data={data} />
    ) : (
        <Content>
            <>
                <Row
                    justify="space-between"
                    align="middle"
                    className="pb-6 bg-white border-gray-200"
                >
                    <Text className="text-xl font-medium">Invoicing</Text>
                    <Button
                        danger
                        onClick={() => {
                            navigate(paths.invoice.customers);
                        }}
                        className="lg:mr-6"
                    >
                        Customers
                    </Button>
                </Row>

                <Row className="flex flex-col md:flex-row ">
                    <Col xl={11} sm={24}>
                        <Flex
                            justify="center"
                            vertical
                            className="flex flex-col items-center py-6 mb-4 text-center xl:h-full md:h-auto xl:py-0 md:mb-0 rounded-xl bg-stone-50 md:mr-2"
                        >
                            <Image
                                src={dashboard}
                                loading="eager"
                                preview={false}
                                alt="Invoicing Dashboard"
                            />
                            <Text
                                style={{
                                    lineHeight: getLineHeight(),
                                }}
                                className="font-medium leading-relaxed text-gray-700 xs:text-xl sm:text-2xl md:text-xl xl:text-2xl xxl:text-3xl md:px-40 lg:px-28 xl:px-32 xxl:px-44 sm:px-0 "
                            >
                                Now you can collect all your payments with Invoicing
                            </Text>
                            {data && <KybButton data={data} />}
                            {/* <Link to={paths.invoice.kyb} className="my-5 cursor-pointer">
                                    <Button type="default" danger size="large">
                                        Complete KYB
                                    </Button>
                                </Link> */}
                            {/* <Text>
                                    {data?.paymentLinkCommission.isPercentage
                                        ? `${data?.paymentLinkCommission.charge}% per payment link transaction`
                                        : `₹ ${data?.paymentLinkCommission.charge} per payment link transaction`}
                                </Text> */}
                        </Flex>
                    </Col>
                    <Col xl={13} sm={24}>
                        <Row className="px-4 ml-0 sm:flex-row xl:mt-0 sm:mt-6" gutter={[15, 15]}>
                            <Col xs={24} className="sm:hidden">
                                <DashboardCard2
                                    title="Total Invoice Amount"
                                    value={formatNumberWithLocalString(
                                        data?.pendingInvoiceAmount || 0
                                    )}
                                    currency="₹"
                                    bgColor="bg-[#EBF8FC]"
                                    icon={amount}
                                />
                            </Col>
                            <Col xs={12} sm={8}>
                                <DashboardCard
                                    title="Total Invoices"
                                    value={data?.totalInvoiceCount || 0}
                                    currency=""
                                    bgColor="bg-magnolia"
                                    icon={total}
                                />
                            </Col>
                            <Col xs={12} sm={8}>
                                <DashboardCard
                                    title="Total Paid"
                                    value={data?.paidInvoiceCount || 0}
                                    currency=""
                                    bgColor="bg-seashell"
                                    icon={pending}
                                />
                            </Col>
                            <Col sm={8} className="xs:hidden sm:block">
                                <DashboardCard
                                    title="Total Invoice Amount"
                                    value={formatNumberWithLocalString(
                                        data?.pendingInvoiceAmount || 0
                                    )}
                                    currency="₹"
                                    bgColor="bg-[#EBF8FC]"
                                    icon={amount}
                                />
                            </Col>
                        </Row>
                        <Flex className="px-4 mt-1">
                            <Divider className="my-4 border-gray-200 " />
                        </Flex>
                        <Row gutter={[24, 20]} className="px-4 mb-16 md:mb-0">
                            {featureRow.map((item, i) => (
                                <Col key={i} xs={12} lg={12} xl={12}>
                                    <FeaturesCard
                                        icon={item.image}
                                        title={item.title}
                                        path={item.link}
                                        kybStatus={data?.paymentLinkKYB?.kybStatus}
                                        // paymentLinkCommission={data?.paymentLinkCommission}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </>
        </Content>
    );
};

export default Dashboard;
