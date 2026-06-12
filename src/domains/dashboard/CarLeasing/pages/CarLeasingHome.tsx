import React from 'react';

import { Card, Col, Flex, Row, Typography } from 'antd';
import { ReactSVG } from 'react-svg';

import CarLeasingIcon from '@domains/dashboard/MoreServices/assets/icons/CarLeasing.svg';

const features = [
    { title: 'Flexible Terms', description: '12 to 60-month leasing plans tailored to your fleet needs' },
    { title: 'Wide Selection', description: 'Choose from 500+ sedan, SUV, and commercial vehicle models' },
    { title: 'Zero Down Payment', description: 'Get your fleet on the road with no upfront capital outlay' },
    { title: 'Managed Maintenance', description: 'Comprehensive service, insurance, and support included' },
];

const CarLeasingHome = () => {
    return (
        <Flex vertical gap={32}>
            <Flex align="center" gap={16}>
                <Flex
                    className="w-16 h-16 bg-bgIconCard rounded-2xl"
                    align="center"
                    justify="center"
                >
                    <ReactSVG src={CarLeasingIcon} />
                </Flex>
                <Flex vertical gap={4}>
                    <Typography.Title level={4} className="!mb-0">
                        Car Leasing
                    </Typography.Title>
                    <Typography.Text className="text-textGreyLight text-sm">
                        Flexible vehicle leasing solutions for your business
                    </Typography.Text>
                </Flex>
            </Flex>

            <Row gutter={[20, 20]}>
                {features.map((item, i) => (
                    <Col xs={24} sm={12} lg={6} key={i}>
                        <Card bordered={false} className="h-full">
                            <Flex vertical gap={8}>
                                <Typography.Text strong className="text-base">
                                    {item.title}
                                </Typography.Text>
                                <Typography.Text className="text-textGreyLight text-sm">
                                    {item.description}
                                </Typography.Text>
                            </Flex>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Flex>
    );
};

export default CarLeasingHome;
