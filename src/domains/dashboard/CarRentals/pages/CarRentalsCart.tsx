import React from 'react';

import { Button, Card, Col, Divider, Flex, Row, Typography } from 'antd';
import { DeleteOutlined, HeartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { paths } from '@src/routes/paths';

const CARD_SHADOW = '0px 1.94px 19.398px 0px rgba(0, 0, 0, 0.10)';

const VehicleImage = ({ make, model, width = 120, height = 80 }: {
    make: string; model: string; width?: number; height?: number;
}) => (
    <div style={{
        width, height, background: '#F5F5F5', borderRadius: 4,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        border: '1px solid #E8E8E8', overflow: 'hidden', flexShrink: 0,
    }}>
        <svg width={width * 0.55} height={height * 0.45} viewBox="0 0 60 30" fill="none">
            <rect x="5" y="12" width="50" height="12" rx="3" fill="#D9D9D9"/>
            <rect x="12" y="6" width="30" height="10" rx="3" fill="#BFBFBF"/>
            <circle cx="15" cy="25" r="4" fill="#8C8C8C"/>
            <circle cx="45" cy="25" r="4" fill="#8C8C8C"/>
            <rect x="13" y="8" width="12" height="6" rx="1" fill="#E6F7FF"/>
            <rect x="27" y="8" width="12" height="6" rx="1" fill="#E6F7FF"/>
        </svg>
        <div style={{ fontSize: 9, color: '#8C8C8C', marginTop: 2, textAlign: 'center', padding: '0 4px', lineHeight: 1.2 }}>
            {make} {model}
        </div>
    </div>
);

const CarRentalsCart = () => {
    const navigate = useNavigate();

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
                        <Flex vertical gap={14}>
                            <Typography.Text strong>Outstation One Way Trip</Typography.Text>

                            <Flex align="center" gap={10}>
                                <Typography.Text strong>Mumbai</Typography.Text>
                                <Flex align="center" style={{ flex: 1 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#bfbfbf', flexShrink: 0 }} />
                                    <div style={{ flex: 1, borderTop: '2px dashed #bfbfbf' }} />
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#bfbfbf', flexShrink: 0 }} />
                                </Flex>
                                <Typography.Text strong>Agra</Typography.Text>
                            </Flex>

                            <Flex gap={8} align="center">
                                <Typography.Text className="text-textGreyLight text-sm">Start Time</Typography.Text>
                                <Typography.Text className="text-sm">15 Jun 2026, 04:45 pm</Typography.Text>
                            </Flex>
                        </Flex>

                        <Divider />

                        <Row gutter={[16, 12]} align="middle">
                            <Col xs={24} sm={3}>
                                <VehicleImage make="Honda" model="Amaze" width={80} height={60} />
                            </Col>

                            <Col xs={24} sm={13}>
                                <Flex vertical gap={4}>
                                    <Typography.Text strong>Honda Amaze VX MT 2024</Typography.Text>
                                    <Typography.Text className="text-textGreyLight text-sm">Sedan | 5 seats</Typography.Text>
                                </Flex>
                            </Col>

                            <Col xs={24} sm={8}>
                                <Flex vertical gap={4} align="flex-end">
                                    <Typography.Text strong style={{ fontSize: 16 }}>₹541</Typography.Text>
                                    <Typography.Text className="text-xs">
                                        1 Coupon Available |{' '}
                                        <Typography.Link style={{ color: '#FF4F4F', fontSize: 'inherit' }}>
                                            APPLY NOW
                                        </Typography.Link>
                                    </Typography.Text>
                                </Flex>
                            </Col>
                        </Row>

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
                            <Typography.Text strong style={{ fontSize: 16 }}>Order Summary</Typography.Text>

                            <Flex justify="space-between" align="center">
                                <Typography.Text className="text-textGreyLight text-sm">Amount Payable Online</Typography.Text>
                                <Typography.Text className="text-sm">₹541</Typography.Text>
                            </Flex>

                            <Flex justify="space-between" align="center">
                                <Typography.Text className="text-textGreyLight text-sm">Balance to driver (Offline)</Typography.Text>
                                <Typography.Text className="text-sm">₹961</Typography.Text>
                            </Flex>

                            <Divider style={{ margin: '4px 0' }} />

                            <Flex justify="space-between" align="center">
                                <Typography.Text strong>Total Payable</Typography.Text>
                                <Typography.Text strong style={{ fontSize: 18 }}>₹541</Typography.Text>
                            </Flex>

                            <Button
                                type="primary"
                                danger
                                block
                                size="large"
                                onClick={() => navigate(`/${paths.dashboard.carRentalsPayment}`)}
                            >
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
