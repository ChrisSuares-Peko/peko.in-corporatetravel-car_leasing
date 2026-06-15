import React, { useState } from 'react';

import {
    Button,
    Card,
    Col,
    DatePicker,
    Flex,
    Input,
    InputNumber,
    Radio,
    Row,
    Select,
    Tabs,
    TimePicker,
    Typography,
} from 'antd';
import { useNavigate } from 'react-router-dom';

import { paths } from '@src/routes/paths';

const popularRoutes = [
    { route: 'Mumbai to Pune', price: '₹3,960' },
    { route: 'Bangalore to Mysore', price: '₹3,960' },
    { route: 'Delhi to Agra', price: '₹4,200' },
    { route: 'Chennai to Bangalore', price: '₹5,500' },
    { route: 'Hyderabad to Vijayawada', price: '₹3,200' },
    { route: 'Delhi to Jaipur', price: '₹4,800' },
];

const budgetCars = [
    { name: 'Maruti Suzuki Dzire', price: '₹3,200' },
    { name: 'Kia Sonet', price: '₹3,500' },
    { name: 'Honda Amaze', price: '₹3,200' },
    { name: 'Hyundai Aura', price: '₹3,100' },
    { name: 'Tata Tigor', price: '₹2,900' },
];

const luxuryCars = [
    { name: 'BMW 5 Series', price: '₹18,400' },
    { name: 'Mercedes-Benz E-Class', price: '₹18,700' },
    { name: 'Mercedes-Benz GLS', price: '₹23,500' },
    { name: 'Audi A6', price: '₹17,200' },
    { name: 'Jaguar XF', price: '₹22,500' },
];

const durationOptions = [
    { value: '4hrs', label: '4hrs / 40kms' },
    { value: '8hrs', label: '8hrs / 80kms' },
    { value: '12hrs', label: '12hrs / 120kms' },
];

const CarRentalsHome = () => {
    const [searchTab, setSearchTab] = useState('cabs');
    const [cabSubType, setCabSubType] = useState('one-way');
    const [airportDirection, setAirportDirection] = useState('drop');
    const [categoryTab, setCategoryTab] = useState('car');
    const [tierTab, setTierTab] = useState('budget');
    const [luxuryTab, setLuxuryTab] = useState('daily');

    const navigate = useNavigate();
    const radioClass = 'xs:text-xs md:text-sm md:font-semibold mt-1 me-4';
    const goToResults = () => navigate(`/${paths.dashboard.carRentalsResults}`);

    const renderCabFields = () => {
        switch (cabSubType) {
            case 'one-way':
                return (
                    <Row gutter={[12, 12]}>
                        <Col xs={24} sm={12} md={6}>
                            <Input placeholder="From city" size="large" />
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Input placeholder="To city" size="large" />
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <DatePicker
                                className="w-full"
                                size="large"
                                placeholder="Departure date"
                            />
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <TimePicker
                                className="w-full"
                                size="large"
                                placeholder="Pickup time"
                                use12Hours
                                format="h:mm a"
                            />
                        </Col>
                    </Row>
                );

            case 'round-trip':
                return (
                    <Row gutter={[12, 12]}>
                        <Col xs={24} sm={12} md={5}>
                            <Input placeholder="From city" size="large" />
                        </Col>
                        <Col xs={24} sm={12} md={5}>
                            <Input placeholder="To city" size="large" />
                        </Col>
                        <Col xs={24} sm={12} md={5}>
                            <DatePicker
                                className="w-full"
                                size="large"
                                placeholder="Departure date"
                            />
                        </Col>
                        <Col xs={24} sm={12} md={5}>
                            <DatePicker
                                className="w-full"
                                size="large"
                                placeholder="Return date"
                            />
                        </Col>
                        <Col xs={24} sm={24} md={4}>
                            <TimePicker
                                className="w-full"
                                size="large"
                                placeholder="Pickup time"
                                use12Hours
                                format="h:mm a"
                            />
                        </Col>
                    </Row>
                );

            case 'airport':
                return (
                    <Flex vertical gap={12}>
                        <Radio.Group
                            value={airportDirection}
                            onChange={e => setAirportDirection(e.target.value)}
                            buttonStyle="solid"
                        >
                            <Radio.Button value="drop">Drop to Airport</Radio.Button>
                            <Radio.Button value="pickup">Pickup from Airport</Radio.Button>
                        </Radio.Group>
                        <Row gutter={[12, 12]}>
                            <Col xs={24} sm={12} md={6}>
                                <Input placeholder="From city" size="large" />
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <Input placeholder="Drop airport" size="large" />
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <DatePicker
                                    className="w-full"
                                    size="large"
                                    placeholder="Departure date"
                                />
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <TimePicker
                                    className="w-full"
                                    size="large"
                                    placeholder="Pickup time"
                                    use12Hours
                                    format="h:mm a"
                                />
                            </Col>
                        </Row>
                    </Flex>
                );

            case 'local':
                return (
                    <Row gutter={[12, 12]}>
                        <Col xs={24} sm={12} md={5}>
                            <Input placeholder="Pickup location" size="large" />
                        </Col>
                        <Col xs={24} sm={12} md={5}>
                            <DatePicker
                                className="w-full"
                                size="large"
                                placeholder="Departure date"
                            />
                        </Col>
                        <Col xs={24} sm={12} md={5}>
                            <TimePicker
                                className="w-full"
                                size="large"
                                placeholder="Pickup time"
                                use12Hours
                                format="h:mm a"
                            />
                        </Col>
                        <Col xs={24} sm={12} md={5}>
                            <Select
                                className="w-full"
                                size="large"
                                placeholder="Duration"
                                options={durationOptions}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={4}>
                            <InputNumber
                                className="w-full"
                                size="large"
                                min={1}
                                defaultValue={1}
                                formatter={value => `${value} Day${Number(value) === 1 ? '' : 's'}`}
                                parser={value => Number(value?.replace(/[^\d]/g, '') || '1')}
                            />
                        </Col>
                    </Row>
                );

            default:
                return null;
        }
    };

    return (
        <Flex vertical gap={32}>
            {/* Hero / Search Section */}
            <Flex
                vertical
                gap={24}
                className="rounded-2xl p-8"
                style={{ background: '#171717' }}
            >
                <Flex vertical gap={4}>
                    <Typography.Title level={4} style={{ color: '#fff', margin: 0 }}>
                        Book a Car
                    </Typography.Title>
                    <Typography.Text style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14 }}>
                        Cabs, Self Drive &amp; Luxury Rentals for Business
                    </Typography.Text>
                </Flex>

                <Card
                    bordered={false}
                    style={{ borderRadius: 12 }}
                    bodyStyle={{ padding: '16px 24px' }}
                >
                    <Tabs
                        activeKey={searchTab}
                        onChange={setSearchTab}
                        items={[
                            {
                                key: 'cabs',
                                label: 'Cabs',
                                children: (
                                    <Flex vertical gap={16}>
                                        <Radio.Group
                                            value={cabSubType}
                                            onChange={e => setCabSubType(e.target.value)}
                                            size="large"
                                        >
                                            <Radio value="one-way" className={radioClass}>
                                                Outstation One-Way
                                            </Radio>
                                            <Radio value="round-trip" className={radioClass}>
                                                Outstation Round-Trip
                                            </Radio>
                                            <Radio value="airport" className={radioClass}>
                                                Airport Transfer
                                            </Radio>
                                            <Radio value="local" className={radioClass}>
                                                Local/Hourly
                                            </Radio>
                                        </Radio.Group>
                                        {renderCabFields()}
                                        <Button
                                            type="primary"
                                            danger
                                            block
                                            size="large"
                                            onClick={goToResults}
                                        >
                                            Search
                                        </Button>
                                    </Flex>
                                ),
                            },
                            {
                                key: 'self-drive',
                                label: 'Self Drive',
                                children: (
                                    <Flex vertical gap={16}>
                                        <Row gutter={[12, 12]}>
                                            <Col xs={24} sm={12} md={8}>
                                                <Input placeholder="Pickup city" size="large" />
                                            </Col>
                                            <Col xs={24} sm={12} md={8}>
                                                <DatePicker
                                                    className="w-full"
                                                    size="large"
                                                    placeholder="Pickup date"
                                                />
                                            </Col>
                                            <Col xs={24} sm={12} md={8}>
                                                <DatePicker
                                                    className="w-full"
                                                    size="large"
                                                    placeholder="Return date"
                                                />
                                            </Col>
                                        </Row>
                                        <Button
                                            type="primary"
                                            danger
                                            block
                                            size="large"
                                            onClick={goToResults}
                                        >
                                            Search
                                        </Button>
                                    </Flex>
                                ),
                            },
                        ]}
                    />
                </Card>
            </Flex>

            {/* Popular Rental Routes */}
            <Flex vertical gap={16}>
                <Typography.Text className="text-xl font-medium">
                    Popular Rental Routes
                </Typography.Text>
                <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
                    <Flex gap={16} style={{ width: 'max-content' }}>
                        {popularRoutes.map((item, i) => (
                            <Card
                                key={i}
                                bordered={false}
                                style={{
                                    width: 200,
                                    borderRadius: 12,
                                    boxShadow: '0px 1.94px 19.398px 0px rgba(0, 0, 0, 0.10)',
                                    cursor: 'pointer',
                                }}
                            >
                                <Flex vertical gap={6}>
                                    <Typography.Text strong className="text-sm">
                                        {item.route}
                                    </Typography.Text>
                                    <Typography.Text className="text-textGreyLight text-xs">
                                        Starts from {item.price}
                                    </Typography.Text>
                                </Flex>
                            </Card>
                        ))}
                    </Flex>
                </div>
            </Flex>

            {/* Rental By Category */}
            <Flex vertical gap={16}>
                <Typography.Text className="text-xl font-medium">
                    Rental By Category
                </Typography.Text>
                <Tabs
                    activeKey={categoryTab}
                    onChange={setCategoryTab}
                    items={[
                        { key: 'car', label: 'Car' },
                        { key: 'vintage', label: 'Vintage Car' },
                        { key: 'bike', label: 'Bike' },
                        { key: 'scooter', label: 'Scooter' },
                    ]}
                />
                <Tabs
                    activeKey={tierTab}
                    onChange={setTierTab}
                    items={[
                        { key: 'budget', label: 'Budget' },
                        { key: 'mini', label: 'Mini' },
                        { key: 'premium', label: 'Premium' },
                        { key: 'luxury', label: 'Luxury' },
                    ]}
                />
                <Row gutter={[16, 16]}>
                    {budgetCars.map((car, i) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={i}>
                            <Card
                                bordered={false}
                                className="h-full"
                                style={{
                                    borderRadius: 12,
                                    boxShadow: '0px 1.94px 19.398px 0px rgba(0, 0, 0, 0.10)',
                                }}
                            >
                                <Flex vertical gap={8}>
                                    <Typography.Text strong className="text-sm">
                                        {car.name}
                                    </Typography.Text>
                                    <Typography.Text className="text-textGreyLight text-xs">
                                        Rental Starts from {car.price}
                                    </Typography.Text>
                                    <Button type="primary" danger size="small">
                                        Book Now
                                    </Button>
                                </Flex>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Flex>

            {/* Top Luxury Rentals */}
            <Flex vertical gap={16}>
                <Typography.Text className="text-xl font-medium">
                    Top Luxury Rentals
                </Typography.Text>
                <Tabs
                    activeKey={luxuryTab}
                    onChange={setLuxuryTab}
                    items={[
                        { key: 'daily', label: 'Daily Rental' },
                        { key: 'self-drive', label: 'Self Drive' },
                        { key: 'wedding', label: 'Wedding' },
                    ]}
                />
                <Row gutter={[16, 16]}>
                    {luxuryCars.map((car, i) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={i}>
                            <Card
                                bordered={false}
                                className="h-full"
                                style={{
                                    borderRadius: 12,
                                    boxShadow: '0px 1.94px 19.398px 0px rgba(0, 0, 0, 0.10)',
                                }}
                            >
                                <Flex vertical gap={8}>
                                    <Typography.Text strong className="text-sm">
                                        {car.name}
                                    </Typography.Text>
                                    <Typography.Text className="text-textGreyLight text-xs">
                                        Rental Starts from {car.price}
                                    </Typography.Text>
                                    <Button type="primary" danger size="small">
                                        Book Now
                                    </Button>
                                </Flex>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Flex>
        </Flex>
    );
};

export default CarRentalsHome;
