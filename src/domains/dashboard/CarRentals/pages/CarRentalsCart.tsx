import React from 'react';

import { Button, Card, Col, Divider, Flex, Row, Typography } from 'antd';
import { CarOutlined, DeleteOutlined, HeartOutlined } from '@ant-design/icons';

const CARD_SHADOW = '0px 1.94px 19.398px 0px rgba(0, 0, 0, 0.10)';

const CarRentalsCart = () => {
    return (
        <Flex vertical gap={20}>
            <Typography.Title level={4} className="!mb-0">
                Cart Summary
            </Typography.Title>

            <Row gutter={[24, 24]} align="top">
                {/* Left column — Cart details */}
                <Col xs={24} lg={16}>
                    <Card
                        bordered={false}
                        bodyStyle={{ padding: 24 }}
                        className="rounded-xl"
                        style={{ boxShadow: CARD_SHADOW }}
                    >
                        {/* Trip header */}
                        <Flex vertical gap={14}>
                            <Typography.Text strong>Outstation One Way Trip</Typography.Text>

                            {/* Route visualizer */}
                            <Flex align="center" gap={10}>
                                <Typography.Text strong>Mumbai</Typography.Text>
                                <Flex align="center" style={{ flex: 1 }}>
                                    <div
                                        style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            background: '#bfbfbf',
                                            flexShrink: 0,
                                        }}
                                    />
                                    <div
                                        style={{
                                            flex: 1,
                                            borderTop: '2px dashed #bfbfbf',
                                        }}
                                    />
                                    <div
                                        style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            background: '#bfbfbf',
                                            flexShrink: 0,
                                        }}
                                    />
                                </Flex>
                                <Typography.Text strong>Agra</Typography.Text>
                            </Flex>

                            {/* Start time */}
                            <Flex gap={8} align="center">
                                <Typography.Text className="text-textGreyLight text-sm">
                                    Start Time
                                </Typography.Text>
                                <Typography.Text className="text-sm">
                                    15 Jun 2026, 04:45 pm
                                </Typography.Text>
                            </Flex>
                        </Flex>

                        <Divider />

                        {/* Car item row */}
                        <Row gutter={[16, 12]} align="middle">
                            {/* Image placeholder */}
                            <Col xs={24} sm={3}>
                                <Flex
                                    align="center"
                                    justify="center"
                                    style={{
                                        width: 80,
                                        height: 60,
                                        background: '#f5f5f5',
                                        borderRadius: 6,
                                    }}
                                >
                                    <CarOutlined style={{ fontSize: 24, color: '#d9d9d9' }} />
                                </Flex>
                            </Col>

                            {/* Car name + type */}
                            <Col xs={24} sm={13}>
                                <Flex vertical gap={4}>
                                    <Typography.Text strong>
                                        Maruti Suzuki Ciaz Sigma 1.5 2024
                                    </Typography.Text>
                                    <Typography.Text className="text-textGreyLight text-sm">
                                        Sedan | 5 seats
                                    </Typography.Text>
                                </Flex>
                            </Col>

                            {/* Price + coupon */}
                            <Col xs={24} sm={8}>
                                <Flex vertical gap={4} align="flex-end">
                                    <Typography.Text strong style={{ fontSize: 16 }}>
                                        ₹10,084
                                    </Typography.Text>
                                    <Typography.Text className="text-xs">
                                        1 Coupon Available |{' '}
                                        <Typography.Link style={{ color: '#FF4F4F', fontSize: 'inherit' }}>
                                            APPLY NOW
                                        </Typography.Link>
                                    </Typography.Text>
                                </Flex>
                            </Col>
                        </Row>

                        {/* Actions row */}
                        <Flex justify="flex-end" gap={12} style={{ marginTop: 12 }}>
                            <DeleteOutlined style={{ fontSize: 16, color: '#bfbfbf', cursor: 'pointer' }} />
                            <HeartOutlined style={{ fontSize: 16, color: '#bfbfbf', cursor: 'pointer' }} />
                        </Flex>
                    </Card>
                </Col>

                {/* Right column — Order summary */}
                <Col xs={24} lg={8}>
                    <Card
                        bordered={false}
                        bodyStyle={{ padding: 20 }}
                        className="rounded-xl"
                        style={{ boxShadow: CARD_SHADOW }}
                    >
                        <Flex vertical gap={16}>
                            <Typography.Text strong style={{ fontSize: 16 }}>
                                Order Summary
                            </Typography.Text>

                            <Flex justify="space-between" align="center">
                                <Typography.Text className="text-textGreyLight text-sm">
                                    Amount Payable Online
                                </Typography.Text>
                                <Typography.Text className="text-sm">₹10,084</Typography.Text>
                            </Flex>

                            <Flex justify="space-between" align="center">
                                <Typography.Text className="text-textGreyLight text-sm">
                                    Balance to driver (Offline)
                                </Typography.Text>
                                <Typography.Text className="text-sm">₹18,728</Typography.Text>
                            </Flex>

                            <Divider style={{ margin: '4px 0' }} />

                            <Flex justify="space-between" align="center">
                                <Typography.Text strong>Total Payable</Typography.Text>
                                <Typography.Text strong style={{ fontSize: 18 }}>
                                    ₹10,084
                                </Typography.Text>
                            </Flex>

                            <Button type="primary" danger block size="large">
                                Proceed to Payment
                            </Button>
                        </Flex>
                    </Card>
                </Col>
            </Row>
        </Flex>
    );
};

export default CarRentalsCart;
