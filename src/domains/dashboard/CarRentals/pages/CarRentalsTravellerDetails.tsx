import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { paths } from '@src/routes/paths';

import { Button, Card, Col, Flex, Input, Radio, Row, Select, Typography } from 'antd';

const CARD_SHADOW = '0px 1.94px 19.398px 0px rgba(0, 0, 0, 0.10)';

const ACTIVE_RADIO_STYLE: React.CSSProperties = {
    background: '#FF4F4F',
    borderColor: '#FF4F4F',
    color: '#fff',
};

type EmployeeData = {
    firstName: string;
    lastName: string;
    gender: string;
    phone: string;
    email: string;
    address: string;
};

const employeeData: Record<string, EmployeeData> = {
    'sarah-johnson': { firstName: 'Sarah', lastName: 'Johnson', gender: 'female', phone: '9876543210', email: 'sarah.johnson@company.com', address: '12 MG Road, Bangalore' },
    'rahul-sharma':  { firstName: 'Rahul',  lastName: 'Sharma',  gender: 'male',   phone: '9845012345', email: 'rahul.sharma@company.com',  address: '45 Linking Road, Mumbai' },
    'priya-mehta':   { firstName: 'Priya',  lastName: 'Mehta',   gender: 'female', phone: '9900123456', email: 'priya.mehta@company.com',   address: '8 Jubilee Hills, Hyderabad' },
    'amit-verma':    { firstName: 'Amit',   lastName: 'Verma',   gender: 'male',   phone: '9812345678', email: 'amit.verma@company.com',    address: '22 Connaught Place, Delhi' },
    'neha-kapoor':   { firstName: 'Neha',   lastName: 'Kapoor',  gender: 'female', phone: '9988776655', email: 'neha.kapoor@company.com',   address: '5 Anna Nagar, Chennai' },
    'vikram-singh':  { firstName: 'Vikram', lastName: 'Singh',   gender: 'male',   phone: '9776655443', email: 'vikram.singh@company.com',  address: '33 Koregaon Park, Pune' },
};

const EMPLOYEE_OPTIONS = [
    { value: 'sarah-johnson', label: 'Sarah Johnson (sarah.johnson@company.com)' },
    { value: 'rahul-sharma', label: 'Rahul Sharma (rahul.sharma@company.com)' },
    { value: 'priya-mehta', label: 'Priya Mehta (priya.mehta@company.com)' },
    { value: 'amit-verma', label: 'Amit Verma (amit.verma@company.com)' },
    { value: 'neha-kapoor', label: 'Neha Kapoor (neha.kapoor@company.com)' },
    { value: 'vikram-singh', label: 'Vikram Singh (vikram.singh@company.com)' },
];

const FieldLabel = ({ children }: { children: string }) => (
    <Typography.Text className="text-xs text-textGreyLight" style={{ display: 'block' }}>
        {children}
    </Typography.Text>
);

const CarRentalsTravellerDetails = () => {
    const navigate = useNavigate();

    const [selectedEmployeeKey, setSelectedEmployeeKey] = useState('sarah-johnson');
    const [employee, setEmployee] = useState<EmployeeData>(employeeData['sarah-johnson']);

    const handleSelectEmployee = (key: string) => {
        setSelectedEmployeeKey(key);
        setEmployee(employeeData[key]);
    };

    const updateField = (field: keyof EmployeeData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmployee(prev => ({ ...prev, [field]: e.target.value }));
    };

    return (
        <Row>
            <Col offset={4} span={16}>
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
                        <Flex vertical gap={20}>
                            <Flex vertical gap={4}>
                                <FieldLabel>Select Employee</FieldLabel>
                                <Select
                                    className="w-full"
                                    size="large"
                                    showSearch
                                    optionFilterProp="label"
                                    placeholder="Search and select employee"
                                    value={selectedEmployeeKey}
                                    onChange={handleSelectEmployee}
                                    options={EMPLOYEE_OPTIONS}
                                />
                            </Flex>

                            <Row gutter={[24, 20]}>
                                <Col xs={24} md={12}>
                                    <Flex vertical gap={4}>
                                        <FieldLabel>First Name</FieldLabel>
                                        <Input size="large" value={employee.firstName} onChange={updateField('firstName')} />
                                    </Flex>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Flex vertical gap={4}>
                                        <FieldLabel>Last Name</FieldLabel>
                                        <Input size="large" value={employee.lastName} onChange={updateField('lastName')} />
                                    </Flex>
                                </Col>

                                <Col xs={24} md={12}>
                                    <Flex vertical gap={4}>
                                        <FieldLabel>Gender</FieldLabel>
                                        <Radio.Group
                                            value={employee.gender}
                                            onChange={e => setEmployee(prev => ({ ...prev, gender: e.target.value }))}
                                        >
                                            <Radio.Button
                                                value="male"
                                                style={employee.gender === 'male' ? ACTIVE_RADIO_STYLE : undefined}
                                            >
                                                Male
                                            </Radio.Button>
                                            <Radio.Button
                                                value="female"
                                                style={employee.gender === 'female' ? ACTIVE_RADIO_STYLE : undefined}
                                            >
                                                Female
                                            </Radio.Button>
                                        </Radio.Group>
                                    </Flex>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Flex vertical gap={4}>
                                        <FieldLabel>Phone Number</FieldLabel>
                                        <Input
                                            size="large"
                                            addonBefore="🇮🇳 +91"
                                            value={employee.phone}
                                            onChange={updateField('phone')}
                                        />
                                    </Flex>
                                </Col>

                                <Col xs={24}>
                                    <Flex vertical gap={4}>
                                        <FieldLabel>Email</FieldLabel>
                                        <Input size="large" value={employee.email} onChange={updateField('email')} />
                                    </Flex>
                                </Col>

                                <Col xs={24}>
                                    <Flex vertical gap={4}>
                                        <FieldLabel>Address</FieldLabel>
                                        <Input size="large" value={employee.address} onChange={updateField('address')} />
                                    </Flex>
                                </Col>
                            </Row>
                        </Flex>
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
                            Proceed to Cart
                        </Button>
                    </Flex>
                </Flex>
            </Col>
        </Row>
    );
};

export default CarRentalsTravellerDetails;
