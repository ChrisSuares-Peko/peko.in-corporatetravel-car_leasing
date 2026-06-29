import React, { useState } from 'react';

import {
    Button,
    Card,
    Checkbox,
    Col,
    Divider,
    Flex,
    Input,
    Radio,
    Row,
    Typography,
} from 'antd';
import {
    ArrowLeftOutlined,
    CheckCircleOutlined,
    CreditCardOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { paths } from '@src/routes/paths';

const billRows = [
    { label: 'Service name',                value: 'Car Rentals' },
    { label: 'Trip type',                   value: 'Outstation One Way Trip' },
    { label: 'Route',                       value: 'Mumbai → Agra' },
    { label: 'Travel Date',                 value: '15 Jun 2026, 04:45 pm' },
    { label: 'Vehicle',                     value: 'Honda Amaze VX MT 2024' },
    { label: 'Amount Payable Online',       value: '₹541' },
    { label: 'Balance to Driver (Offline)', value: '₹961' },
];

const CarRentalsPayment = () => {
    const navigate = useNavigate();
    const [paid, setPaid] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('wallet');
    const [useCashback, setUseCashback] = useState(false);

    if (paid) {
        return (
            <Flex
                vertical
                align="center"
                justify="center"
                gap={24}
                style={{ minHeight: '60vh' }}
            >
                <CheckCircleOutlined style={{ fontSize: 72, color: '#52c41a' }} />
                <Flex vertical align="center" gap={8}>
                    <Typography.Title level={3} className="!mb-0">
                        Payment Successful!
                    </Typography.Title>
                    <Typography.Text className="text-textGreyLight">
                        Your Car Rental booking has been confirmed.
                    </Typography.Text>
                    <Typography.Text className="text-textGreyLight">
                        Booking ID: CR-2026-08471
                    </Typography.Text>
                </Flex>
                <Button
                    type="primary"
                    danger
                    size="large"
                    onClick={() => navigate(`/${paths.dashboard.home}`)}
                >
                    Go to Dashboard
                </Button>
            </Flex>
        );
    }

    return (
        <Flex vertical gap={16}>
            {/* Cancel and Go Back */}
            <Typography.Text className="text-textGreyLight text-sm" style={{ cursor: 'pointer' }}>
                <ArrowLeftOutlined style={{ marginRight: 6 }} />
                Cancel and Go Back
            </Typography.Text>

            {/* Page heading */}
            <Typography.Title level={4} className="!mb-0">
                Review your payment
            </Typography.Title>

            <Row gutter={[24, 24]}>
                {/* Left column — Bill Summary */}
                <Col xs={24} xl={12}>
                    <Card
                        className="h-full border-0 sm:p-7 sm:rounded-2xl sm:border border-borderGray md:p-10"
                        styles={{ body: { padding: 0 } }}
                    >
                        <Flex vertical gap={25}>
                            <Typography.Title level={5}>Bill Summary</Typography.Title>
                            {billRows.map(row => (
                                <Row key={row.label} justify="space-between">
                                    <Col span={14}>
                                        <Typography.Text className="text-sm font-normal sm:text-base text-textGreyLight">
                                            {row.label}
                                        </Typography.Text>
                                    </Col>
                                    <Col span={10} style={{ textAlign: 'right' }}>
                                        <Typography.Text className="text-sm font-medium sm:text-base">
                                            {row.value}
                                        </Typography.Text>
                                    </Col>
                                </Row>
                            ))}
                        </Flex>
                    </Card>
                </Col>

                {/* Right column — three stacked cards */}
                <Col xs={24} xl={{ span: 11, offset: 1 }}>
                    <Flex vertical gap={16}>
                        {/* Card 1: Apply Coupon Code */}
                        <Flex
                            className="w-full px-6 py-8 border border-gray-200 border-solid rounded-xl"
                            vertical
                            gap={16}
                        >
                            <Flex justify="space-between" align="center">
                                <Typography.Text className="text-lg font-medium">
                                    Apply Coupon Code
                                </Typography.Text>
                                <Typography.Link style={{ color: '#FF4F4F' }}>
                                    View Offers
                                </Typography.Link>
                            </Flex>
                            <Typography.Text className="text-textGreyLight text-sm">
                                Have a discount/coupon code to redeem
                            </Typography.Text>
                            <Flex gap={8}>
                                <Input placeholder="Enter coupon code" size="large" />
                                <Button type="primary" danger size="large">
                                    Apply
                                </Button>
                            </Flex>
                        </Flex>

                        {/* Card 2: Select Payment Method */}
                        <Flex
                            className="w-full px-6 py-8 border border-gray-200 border-solid rounded-xl"
                            vertical
                            gap={16}
                        >
                            <Typography.Text className="text-lg font-medium">
                                Select Payment Method
                            </Typography.Text>
                            <Radio.Group
                                value={paymentMethod}
                                onChange={e => setPaymentMethod(e.target.value)}
                                className="w-full"
                            >
                                <Flex vertical gap={12}>
                                    {/* Option 1: Peko Wallet */}
                                    <Card
                                        bordered
                                        bodyStyle={{ padding: '12px 16px' }}
                                        style={{
                                            borderColor:
                                                paymentMethod === 'wallet' ? '#FF4F4F' : '#d9d9d9',
                                            borderRadius: 8,
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => setPaymentMethod('wallet')}
                                    >
                                        <Flex vertical gap={10}>
                                            <Flex gap={12} align="center">
                                                <Radio value="wallet" />
                                                <Flex vertical gap={2}>
                                                    <Typography.Text
                                                        strong
                                                        className="text-sm"
                                                    >
                                                        Peko Wallet
                                                    </Typography.Text>
                                                    <Typography.Text className="text-textGreyLight text-xs">
                                                        Cashback: ₹0.00
                                                    </Typography.Text>
                                                </Flex>
                                            </Flex>
                                            <Checkbox
                                                checked={useCashback}
                                                onChange={e =>
                                                    setUseCashback(e.target.checked)
                                                }
                                                className="text-xs"
                                                onClick={e => e.stopPropagation()}
                                            >
                                                Use your Cashback
                                            </Checkbox>
                                        </Flex>
                                    </Card>

                                    {/* Option 2: Debit/Credit/ATM Cards */}
                                    <Card
                                        bordered
                                        bodyStyle={{ padding: '12px 16px' }}
                                        style={{
                                            borderColor:
                                                paymentMethod === 'card' ? '#FF4F4F' : '#d9d9d9',
                                            borderRadius: 8,
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => setPaymentMethod('card')}
                                    >
                                        <Flex gap={12} align="center">
                                            <Radio value="card" />
                                            <CreditCardOutlined
                                                style={{ fontSize: 20, color: '#595959' }}
                                            />
                                            <Typography.Text strong className="text-sm">
                                                Debit/Credit/ATM Cards
                                            </Typography.Text>
                                        </Flex>
                                    </Card>
                                </Flex>
                            </Radio.Group>
                        </Flex>

                        {/* Card 3: Total Amount */}
                        <Flex
                            className="w-full px-8 py-6 border border-gray-200 border-solid rounded-xl"
                            vertical
                            gap={18}
                        >
                            <Typography.Title level={5}>Total Amount</Typography.Title>
                            <Flex justify="space-between">
                                <Typography.Text className="text-sm font-normal sm:text-base">
                                    Subtotal
                                </Typography.Text>
                                <Typography.Text className="text-sm font-medium sm:text-base">
                                    ₹541
                                </Typography.Text>
                            </Flex>
                            <Flex justify="space-between">
                                <Typography.Text className="text-sm font-normal sm:text-base">
                                    Platform fee (inclusive of taxes)
                                </Typography.Text>
                                <Typography.Text className="text-sm font-medium sm:text-base">
                                    ₹50
                                </Typography.Text>
                            </Flex>
                            <Divider style={{ margin: '4px 0' }} />
                            <Flex justify="space-between" align="center">
                                <Typography.Title level={5} className="!mb-0">
                                    Total
                                </Typography.Title>
                                <Typography.Title level={5} className="!mb-0">
                                    ₹591
                                </Typography.Title>
                            </Flex>
                            <Button
                                type="primary"
                                danger
                                size="large"
                                className="h-14"
                                onClick={() => setPaid(true)}
                            >
                                Pay ₹591
                            </Button>
                        </Flex>
                    </Flex>
                </Col>
            </Row>
        </Flex>
    );
};

export default CarRentalsPayment;
