import React from 'react';

import { Card, Col, Flex, Row, Typography } from 'antd';
import { ReactSVG } from 'react-svg';

import CarRentalsIcon from '@domains/dashboard/MoreServices/assets/icons/CarLeasing.svg';

const features = [
    { title: 'Daily Rentals', description: 'Self-drive and chauffeur-driven cars available for day bookings' },
    { title: 'Outstation Trips', description: 'One-way and round-trip intercity rides with professional drivers' },
    { title: 'Airport Transfers', description: 'Scheduled pickups and drops across all major airports' },
    { title: 'Hourly Packages', description: 'Flexible hourly hire for meetings, errands, and business runs' },
];

const CarRentalsHome = () => {
    return (
        <Flex vertical gap={32}>
            <Flex align="center" gap={16}>
                <Flex
                    className="w-16 h-16 bg-bgIconCard rounded-2xl"
                    align="center"
                    justify="center"
                >
                    <ReactSVG src={CarRentalsIcon} />
                </Flex>
                <Flex vertical gap={4}>
                    <Typography.Title level={4} className="!mb-0">
                        Car Rentals
                    </Typography.Title>
                    <Typography.Text className="text-textGreyLight text-sm">
                        On-demand vehicle rentals for every business need
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

export default CarRentalsHome;
