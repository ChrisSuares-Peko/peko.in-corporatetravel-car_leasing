import React from 'react';

import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { paths } from '@src/routes/paths';

import {
    Button,
    Card,
    Col,
    Collapse,
    DatePicker,
    Flex,
    Input,
    Radio,
    Row,
    Select,
    Typography,
} from 'antd';
import { DownOutlined, SearchOutlined, UpOutlined } from '@ant-design/icons';

const CARD_SHADOW = '0px 1.94px 19.398px 0px rgba(0, 0, 0, 0.10)';

const EMPLOYEE_OPTIONS = [
    { value: 'Sarah Johnson', label: 'Sarah Johnson' },
    { value: 'Rahul Sharma', label: 'Rahul Sharma' },
    { value: 'Priya Mehta', label: 'Priya Mehta' },
    { value: 'Amit Verma', label: 'Amit Verma' },
];

const ID_TYPE_OPTIONS = [
    { value: 'passport', label: 'Passport' },
    { value: 'aadhaar', label: 'Aadhaar Card' },
    { value: 'pan', label: 'PAN Card' },
    { value: 'dl', label: 'Driving Licence' },
];

const FieldLabel = ({ children, required }: { children: string; required?: boolean }) => (
    <Typography.Text className="text-xs text-textGreyLight" style={{ display: 'block' }}>
        {required && <span style={{ color: 'red' }}>* </span>}
        {children}
    </Typography.Text>
);

const CarRentalsTravellerDetails = () => {
    const navigate = useNavigate();

    return (
        <Flex vertical gap={20}>
            <Typography.Title level={4} className="!mb-0">
                Traveller Details
            </Typography.Title>

            <Card
                bordered={false}
                bodyStyle={{ padding: 24 }}
                className="rounded-xl"
                style={{ boxShadow: CARD_SHADOW }}
            >
                <Collapse
                    expandIconPosition="end"
                    className="w-full border-none"
                    defaultActiveKey={['adult-1']}
                    expandIcon={({ isActive }) => (isActive ? <UpOutlined /> : <DownOutlined />)}
                    items={[
                        {
                            key: 'adult-1',
                            label: <Typography.Text strong>Adult Passenger 1</Typography.Text>,
                            children: (
                                <Flex vertical gap={20}>
                                    <Flex vertical gap={4}>
                                        <Typography.Text strong className="text-sm">
                                            Seat Number U9
                                        </Typography.Text>
                                        <Select
                                            className="w-full"
                                            size="large"
                                            showSearch
                                            suffixIcon={<SearchOutlined />}
                                            defaultValue="Sarah Johnson"
                                            options={EMPLOYEE_OPTIONS}
                                        />
                                    </Flex>

                                    <Row gutter={[24, 20]}>
                                        <Col xs={24} md={12}>
                                            <Flex vertical gap={4}>
                                                <FieldLabel>First Name</FieldLabel>
                                                <Input size="large" defaultValue="Sarah" />
                                            </Flex>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Flex vertical gap={4}>
                                                <FieldLabel>Last Name</FieldLabel>
                                                <Input size="large" defaultValue="Johnson" />
                                            </Flex>
                                        </Col>

                                        <Col xs={24} md={12}>
                                            <Flex vertical gap={4}>
                                                <FieldLabel>Date of Birth</FieldLabel>
                                                <DatePicker
                                                    className="w-full"
                                                    size="large"
                                                    format="DD/MM/YYYY"
                                                    defaultValue={dayjs('1995-10-10', 'YYYY-MM-DD')}
                                                />
                                            </Flex>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Flex vertical gap={4}>
                                                <FieldLabel>Gender</FieldLabel>
                                                <Radio.Group defaultValue="female" buttonStyle="solid">
                                                    <Radio.Button value="male">Male</Radio.Button>
                                                    <Radio.Button value="female">Female</Radio.Button>
                                                </Radio.Group>
                                            </Flex>
                                        </Col>

                                        <Col xs={24} md={12}>
                                            <Flex vertical gap={4}>
                                                <FieldLabel>Phone Number</FieldLabel>
                                                <Input
                                                    size="large"
                                                    addonBefore="🇮🇳 +91"
                                                    defaultValue="1234567890"
                                                />
                                            </Flex>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Flex vertical gap={4}>
                                                <FieldLabel>Email</FieldLabel>
                                                <Input size="large" defaultValue="sarahjohnson@example.com" />
                                            </Flex>
                                        </Col>

                                        <Col xs={24} md={12}>
                                            <Flex vertical gap={4}>
                                                <FieldLabel required>ID Type</FieldLabel>
                                                <Select
                                                    className="w-full"
                                                    size="large"
                                                    placeholder="Select ID type"
                                                    options={ID_TYPE_OPTIONS}
                                                />
                                            </Flex>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Flex vertical gap={4}>
                                                <FieldLabel required>ID Number</FieldLabel>
                                                <Input size="large" placeholder="Enter ID number" />
                                            </Flex>
                                        </Col>

                                        <Col xs={24}>
                                            <Flex vertical gap={4}>
                                                <FieldLabel>Address</FieldLabel>
                                                <Input size="large" placeholder="Enter Address" />
                                            </Flex>
                                        </Col>
                                    </Row>
                                </Flex>
                            ),
                        },
                    ]}
                />
            </Card>

            <Flex
                justify="flex-end"
                gap={12}
                className="sticky bottom-0 z-10"
                style={{ background: '#fff', padding: '16px 0', borderTop: '1px solid #F0F0F0' }}
            >
                <Button
                    danger
                    ghost
                    size="large"
                    onClick={() => navigate(`/${paths.dashboard.carRentalsResults}`)}
                >
                    Back
                </Button>
                <Button
                    type="primary"
                    danger
                    size="large"
                    onClick={() => navigate(`/${paths.dashboard.carRentalsCart}`)}
                >
                    Continue to Cart
                </Button>
            </Flex>
        </Flex>
    );
};

export default CarRentalsTravellerDetails;
