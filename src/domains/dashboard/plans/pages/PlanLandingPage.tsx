import React, { useState } from 'react';

import { Button, Col, Empty, Flex, Image, Row, Skeleton, Tag, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router-dom';

import noItems from '@assets/images/No-Product.png';
import PekoPlus from '@assets/PekoPlus.png';
import SwitchPlan from '@domains/dashboard/IndividualPlan/components/SwitchPlan';
import SwitchPlanWeb from '@domains/dashboard/IndividualPlan/components/SwitchPlanWeb';
import { useAppSelector } from '@src/hooks/store';
import useScreenSize from '@src/hooks/useScreenSize';
import { paths } from '@src/routes/paths';

import eSignIcon from '../assets/icons/esign.png';
// import invoicingIcon from '../assets/icons/invoicing.png';
import payrollIcon from '../assets/icons/payroll.png';
// import pekoCloudIcon from '../assets/icons/peko-cloud.png';
import turboIcon from '../assets/icons/turbo-bw.png';
import PaidServiceCard from '../components/subscription/listing-page/PaidServiceCard';
import ServiceCard from '../components/subscription/listing-page/ServiceCard';
import useGetPackages from '../hooks/useGetPackages';
import { PlanType } from '../types';
import { freeServiceList } from '../utils';

const { Text } = Typography;
const PlanLandingPage = () => {
    const [selectedType, setSelectedType] = useState<PlanType>(PlanType.Monthly);
    const navigate = useNavigate();
    const handleChange = (tab: PlanType) => {
        setSelectedType(tab);
    };
    const { xs } = useScreenSize();
    const { data, isLoading, userSaving } = useGetPackages();

    const { roleName } = useAppSelector(state => state.reducer.auth);
    if (roleName && roleName === 'corporate sub user') {
        navigate('/404');
        return null;
    }
    const services = [
        { key: 'Payroll', title: 'Payroll', icon: payrollIcon },
        // { key: 'Invoicing', title: 'Invoicing and Payment Links', icon: invoicingIcon },
        // { key: 'Hub', title: 'Hub', icon: pekoCloudIcon },
        { key: 'eSign', title: 'eSign', icon: eSignIcon },
        { key: 'Turbo', title: 'Turbo', icon: turboIcon, isEqualSymbol: true },
    ];
    if (isLoading) return <Skeleton />;

    return (
        <Content>
            {data.length <= 0 ? (
                <Flex className="bg-re h-96" align="center" justify="center">
                    <Empty
                        image={noItems}
                        styles={{ image: { height: 250 } }}
                        className="flex flex-col items-center "
                        description={
                            <Typography.Text className="text-lg text-center">
                                No plans available at the moment
                            </Typography.Text>
                        }
                    />
                </Flex>
            ) : (
                <Col className="xl:px-20 xxl:px-40">
                    <Flex vertical align="center" gap={20}>
                        <Image
                            src={data[0].packageLogo || PekoPlus}
                            preview={false}
                            className="w-full h-full max-h-[1.5rem] lg:max-h-[2.5rem] object-contain"
                        />
                        <Text className="text-sm font-bold sm:text-lg lg:text-3xl xxl:text-3xl text-greyTitle">
                            One subscription for everything
                        </Text>
                        <Text className="text-xs sm:text-base">
                            (Except WhatsApp for Business)
                            {/* and Accounting */}
                        </Text>
                    </Flex>

                    <Row className="my-4 " gutter={[16, 16]} justify="center" align="middle">
                        {services.map(({ key, title, icon, isEqualSymbol }) => {
                            const price = data[0]?.individualPackages?.[key];

                            if (!price) return null;

                            return (
                                <PaidServiceCard
                                    key={key}
                                    icon={icon}
                                    price={price}
                                    title={title}
                                    isEqualSymbol={isEqualSymbol}
                                />
                            );
                        })}

                        <Col className="text-center gutter-row" xs={24} sm={6} md={8} lg={6} xl={3}>
                            <Flex gap={40} justify="center" align="center">
                                {xs && <Text className="text-4xl">=</Text>}
                                <Flex
                                    className="sm:w-full h-full xl:h-2/3 "
                                    gap={12}
                                    align="center"
                                    justify="center"
                                    vertical
                                >
                                    <Image
                                        src={data[0].packageLogo || PekoPlus}
                                        preview={false}
                                        className="w-full h-full max-h-[1.5rem] lg:max-h-[2rem] object-contain"
                                    />
                                    <Text className="text-xl font-bold">Just pay</Text>
                                    <Text className="text-xl font-bold">
                                        {' '}
                                        ₹ {data[0].packagePrices.monthly}/m
                                    </Text>
                                    <Tag
                                        bordered={false}
                                        className="px-3 py-1 text-green-700 rounded-lg bg-green-50 "
                                    >
                                        You save {userSaving}%
                                    </Tag>
                                </Flex>
                            </Flex>
                        </Col>
                    </Row>

                    <Flex align="center" justify="center" className="my-4">
                        <Text className="text-5xl">+</Text>
                    </Flex>

                    <Col className="xxl:px-10">
                        <Row gutter={[16, 16]} className="my-4" justify="center" align="middle">
                            {freeServiceList.map(({ bgColor, contentColor, icon, title, id }) => (
                                <ServiceCard
                                    bgColor={bgColor}
                                    contentColor={contentColor}
                                    icon={icon}
                                    title={title}
                                    key={id}
                                />
                            ))}
                        </Row>
                    </Col>
                    <Col xs={24} className="my-4">
                        <Flex vertical align="center" gap={20}>
                            {xs ? (
                                <Col span={24} className="px-3">
                                    <SwitchPlan
                                        handleChange={handleChange}
                                        selectedType={selectedType}
                                        price={data[0].packagePrices}
                                        discount={data[0].discount}
                                    />
                                </Col>
                            ) : (
                                <SwitchPlanWeb
                                    handleChange={handleChange}
                                    selectedType={selectedType}
                                    price={data[0].packagePrices}
                                    discount={data[0].discount}
                                />
                            )}
                            <Button
                                key="submit"
                                type="primary"
                                danger
                                className="w-full h-10 md:px-10 sm:w-auto"
                                size="large"
                                onClick={() => {
                                    sessionStorage.setItem(
                                        'PlanDetails',
                                        JSON.stringify({
                                            url: window.location.href,
                                            planId: data[0].id,
                                            selectedType,
                                            isAddOns: false,
                                        })
                                    );
                                    navigate(paths.plans.reviewOrder);
                                }}
                            >
                                Subscribe Now
                            </Button>
                        </Flex>
                    </Col>
                </Col>
            )}
        </Content>
    );
};

export default PlanLandingPage;
