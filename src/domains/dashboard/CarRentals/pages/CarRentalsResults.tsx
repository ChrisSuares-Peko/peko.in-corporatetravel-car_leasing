import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { paths } from '@src/routes/paths';

import {
    Button,
    Card,
    Checkbox,
    Col,
    Collapse,
    Divider,
    Flex,
    InputNumber,
    Radio,
    Row,
    Slider,
    Space,
    Tag,
    Typography,
} from 'antd';
import {
    CarOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    EnvironmentOutlined,
    LeftOutlined,
    RightOutlined,
    SafetyOutlined,
    ShoppingOutlined,
    TeamOutlined,
} from '@ant-design/icons';

const results = [
    { name: 'Maruti Suzuki Ciaz',        bags: 4, seats: 5, bodyType: 'Sedan',     airbags: 2, price: '28,812', kms: '1296', img: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=200&q=80' },
    { name: 'Maruti Suzuki Ertiga',       bags: 4, seats: 7, bodyType: 'MUV',       airbags: 4, price: '31,404', kms: '1296', img: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=200&q=80' },
    { name: 'Maruti Suzuki Celerio',      bags: 3, seats: 5, bodyType: 'Hatchback', airbags: 2, price: '31,604', kms: '1296', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=200&q=80' },
    { name: 'Maruti Suzuki Wagon R',      bags: 3, seats: 5, bodyType: 'Hatchback', airbags: 2, price: '31,604', kms: '1296', img: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=200&q=80' },
    { name: 'Maruti Suzuki Swift Dzire',  bags: 4, seats: 5, bodyType: 'Sedan',     airbags: 2, price: '33,696', kms: '1296', img: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=200&q=80' },
    { name: 'Hyundai Aura',               bags: 4, seats: 5, bodyType: 'Sedan',     airbags: 2, price: '33,946', kms: '1296', img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200&q=80' },
    { name: 'Maruti Suzuki Dzire',        bags: 4, seats: 5, bodyType: 'Sedan',     airbags: 6, price: '33,946', kms: '1296', img: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=200&q=80' },
    { name: 'Toyota Etios',               bags: 4, seats: 5, bodyType: 'Sedan',     airbags: 2, price: '33,946', kms: '1296', img: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=200&q=80' },
    { name: 'Honda Amaze',                bags: 4, seats: 5, bodyType: 'Sedan',     airbags: 6, price: '33,996', kms: '1296', img: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=200&q=80' },
    { name: 'Hyundai Xcent',              bags: 4, seats: 5, bodyType: 'Sedan',     airbags: 2, price: '33,996', kms: '1296', img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200&q=80' },
];

const partPayAmount = (price: string): string => {
    const num = parseInt(price.replace(/,/g, ''), 10);
    return Math.round(num * 0.35).toLocaleString('en-IN');
};

const CarRentalsResults = () => {
    const [rentalType, setRentalType] = useState('daily');
    const [bookingType, setBookingType] = useState('one-way');
    const [priceRange, setPriceRange] = useState<[number, number]>([28812, 1076976]);
    const [segments, setSegments] = useState<string[]>(['all', 'value', 'mid', 'premium', 'luxury']);
    const [expandedCard, setExpandedCard] = useState<number | null>(null);
    const [paymentOption, setPaymentOption] = useState<'part' | 'full'>('part');

    const navigate = useNavigate();

    const toggleCard = (i: number) => {
        if (expandedCard === i) {
            setExpandedCard(null);
        } else {
            setExpandedCard(i);
            setPaymentOption('part');
        }
    };

    const filterPanels = [
        {
            key: 'rental-type',
            label: <Typography.Text strong>Rental Type</Typography.Text>,
            children: (
                <Radio.Group value={rentalType} onChange={e => setRentalType(e.target.value)}>
                    <Space direction="vertical" className="w-full">
                        <Flex justify="space-between">
                            <Radio value="daily">Daily Rental</Radio>
                            <Typography.Text className="text-textGreyLight text-xs">86</Typography.Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Radio value="wedding">Wedding/Vintage</Radio>
                            <Typography.Text className="text-textGreyLight text-xs">36</Typography.Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Radio value="self-drive">Self Drive</Radio>
                            <Typography.Text className="text-textGreyLight text-xs">38</Typography.Text>
                        </Flex>
                    </Space>
                </Radio.Group>
            ),
        },
        {
            key: 'booking-type',
            label: <Typography.Text strong>Booking Type</Typography.Text>,
            children: (
                <Radio.Group value={bookingType} onChange={e => setBookingType(e.target.value)}>
                    <Space direction="vertical" className="w-full">
                        <Flex justify="space-between">
                            <Radio value="one-way">Outstation One-Way</Radio>
                            <Typography.Text className="text-textGreyLight text-xs">74</Typography.Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Radio value="round-trip">Outstation Round-Trip</Radio>
                            <Typography.Text className="text-textGreyLight text-xs">74</Typography.Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Radio value="airport">Airport Transfer</Radio>
                            <Typography.Text className="text-textGreyLight text-xs">58</Typography.Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Radio value="local">Local/Hourly Rental</Radio>
                            <Typography.Text className="text-textGreyLight text-xs">82</Typography.Text>
                        </Flex>
                    </Space>
                </Radio.Group>
            ),
        },
        {
            key: 'price-range',
            label: <Typography.Text strong>Price Range</Typography.Text>,
            children: (
                <Flex vertical gap={12}>
                    <Flex gap={8}>
                        <InputNumber
                            className="w-full"
                            addonBefore="₹"
                            value={priceRange[0]}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => Number(value?.replace(/,/g, '') || '0')}
                            onChange={v => setPriceRange([Number(v ?? 0), priceRange[1]])}
                        />
                        <InputNumber
                            className="w-full"
                            addonBefore="₹"
                            value={priceRange[1]}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => Number(value?.replace(/,/g, '') || '0')}
                            onChange={v => setPriceRange([priceRange[0], Number(v ?? 0)])}
                        />
                    </Flex>
                    <Slider
                        range
                        min={28812}
                        max={1076976}
                        value={priceRange}
                        onChange={values => setPriceRange(values as [number, number])}
                    />
                </Flex>
            ),
        },
        {
            key: 'make-model',
            label: <Typography.Text strong>Make and Model</Typography.Text>,
            children: <div />,
        },
        {
            key: 'body-type',
            label: <Typography.Text strong>Body Type</Typography.Text>,
            children: <div />,
        },
        {
            key: 'fuel-type',
            label: <Typography.Text strong>Fuel Type</Typography.Text>,
            children: <div />,
        },
        {
            key: 'transmission',
            label: <Typography.Text strong>Transmission Type</Typography.Text>,
            children: <div />,
        },
    ];

    return (
        <Row gutter={[20, 20]}>
            {/* Left Filter Panel */}
            <Col xs={0} lg={6}>
                <Card
                    bodyStyle={{ padding: 16 }}
                    style={{ minHeight: '100%' }}
                    className="rounded-xl"
                >
                    <Flex justify="space-between" className="mb-4">
                        <Typography.Text className="text-lg font-bold leading-6">
                            Filters
                        </Typography.Text>
                        <Typography.Link type="danger">Reset All</Typography.Link>
                    </Flex>
                    <Collapse
                        expandIconPosition="end"
                        className="w-full border-none"
                        defaultActiveKey={['rental-type', 'booking-type', 'price-range']}
                        items={filterPanels}
                    />
                </Card>
            </Col>

            {/* Right Results Panel */}
            <Col xs={24} lg={18}>
                <Flex vertical gap={16}>
                    {/* Search Summary Strip */}
                    <Card bodyStyle={{ padding: '12px 16px' }} className="rounded-xl">
                        <Flex justify="space-between" align="center" gap={8}>
                            <Flex gap={6} align="center" wrap="wrap">
                                <Typography.Text strong>Mumbai</Typography.Text>
                                <Typography.Text className="text-textGreyLight">→</Typography.Text>
                                <Typography.Text strong>Agra</Typography.Text>
                                <Divider type="vertical" />
                                <Typography.Text>15 Jun'26</Typography.Text>
                                <Divider type="vertical" />
                                <Typography.Text className="text-textGreyLight text-xs">
                                    Tap to add a return
                                </Typography.Text>
                                <Divider type="vertical" />
                                <Typography.Text>04:45 PM</Typography.Text>
                            </Flex>
                            <Button danger ghost>
                                Modify
                            </Button>
                        </Flex>
                    </Card>

                    {/* Vehicle Segment Row */}
                    <Card bodyStyle={{ padding: '10px 16px' }} className="rounded-xl">
                        <Flex gap={16} align="center" wrap="wrap">
                            <Typography.Text strong>Vehicle Segment:</Typography.Text>
                            <Checkbox.Group
                                value={segments}
                                onChange={v => setSegments(v as string[])}
                                options={[
                                    { label: 'All', value: 'all' },
                                    { label: 'Value', value: 'value' },
                                    { label: 'Mid', value: 'mid' },
                                    { label: 'Premium', value: 'premium' },
                                    { label: 'Luxury', value: 'luxury' },
                                ]}
                            />
                        </Flex>
                    </Card>

                    {/* Result Cards */}
                    <Flex vertical gap={12}>
                        {results.map((car, i) => (
                            <Card
                                key={i}
                                className="rounded-xl"
                                bodyStyle={{ padding: '16px 20px' }}
                                style={{
                                    boxShadow: '0px 1.94px 19.398px 0px rgba(0, 0, 0, 0.10)',
                                }}
                            >
                                {/* Summary row */}
                                <Row gutter={[16, 16]} align="middle">
                                    {/* Car image */}
                                    <Col xs={24} sm={4}>
                                        <img
                                            src={car.img}
                                            alt={car.name}
                                            style={{
                                                width: 120,
                                                height: 80,
                                                objectFit: 'cover',
                                                borderRadius: 8,
                                                display: 'block',
                                            }}
                                        />
                                    </Col>

                                    {/* Car details */}
                                    <Col xs={24} sm={14}>
                                        <Flex vertical gap={8}>
                                            <Typography.Text strong>{car.name}</Typography.Text>
                                            <Flex gap={16} wrap="wrap">
                                                <Flex gap={4} align="center">
                                                    <ShoppingOutlined />
                                                    <Typography.Text className="text-textGreyLight text-xs">
                                                        {car.bags} Bags
                                                    </Typography.Text>
                                                </Flex>
                                                <Flex gap={4} align="center">
                                                    <TeamOutlined />
                                                    <Typography.Text className="text-textGreyLight text-xs">
                                                        {car.seats} Seats
                                                    </Typography.Text>
                                                </Flex>
                                                <Flex gap={4} align="center">
                                                    <CarOutlined />
                                                    <Typography.Text className="text-textGreyLight text-xs">
                                                        {car.bodyType}
                                                    </Typography.Text>
                                                </Flex>
                                                <Flex gap={4} align="center">
                                                    <SafetyOutlined />
                                                    <Typography.Text className="text-textGreyLight text-xs">
                                                        {car.airbags} Airbags
                                                    </Typography.Text>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Col>

                                    {/* Price + CTA */}
                                    <Col xs={24} sm={6}>
                                        <Flex vertical gap={8} align="flex-end">
                                            <Typography.Text strong style={{ fontSize: 18 }}>
                                                ₹{car.price}
                                            </Typography.Text>
                                            <Typography.Text className="text-textGreyLight text-xs">
                                                {car.kms} Kms
                                            </Typography.Text>
                                            <Button
                                                type="primary"
                                                danger
                                                onClick={() => toggleCard(i)}
                                            >
                                                {expandedCard === i ? 'Close' : 'View Details'}
                                            </Button>
                                        </Flex>
                                    </Col>
                                </Row>

                                {/* Expandable Detail Panel */}
                                {expandedCard === i && (
                                    <>
                                        <Divider />

                                        {/* Overview chips */}
                                        <Flex gap={8} wrap="wrap" style={{ marginBottom: 20 }}>
                                            <Tag>{car.bodyType}</Tag>
                                            <Tag>{car.seats} Seats</Tag>
                                            <Tag>Chauffeur</Tag>
                                            <Tag>{car.bags} Bags</Tag>
                                        </Flex>

                                        {/* Two-column layout */}
                                        <Row gutter={[24, 24]}>
                                            {/* Left: image + highlight strip + tip */}
                                            <Col xs={24} md={12}>
                                                <Flex vertical gap={12}>
                                                    {/* Large car image */}
                                                    <img
                                                        src={car.img}
                                                        alt={car.name}
                                                        style={{
                                                            width: '100%',
                                                            height: 280,
                                                            objectFit: 'cover',
                                                            borderRadius: 8,
                                                            display: 'block',
                                                        }}
                                                    />

                                                    {/* Highlight strip */}
                                                    <Flex
                                                        justify="space-between"
                                                        align="center"
                                                        gap={8}
                                                        style={{
                                                            background: '#f9f9f9',
                                                            borderRadius: 8,
                                                            padding: '10px 14px',
                                                        }}
                                                    >
                                                        <LeftOutlined style={{ color: '#bfbfbf' }} />
                                                        <Flex gap={8} align="center">
                                                            <CheckCircleOutlined
                                                                style={{ color: '#52c41a', flexShrink: 0 }}
                                                            />
                                                            <Typography.Text className="text-xs">
                                                                Verified drivers &amp; 24/7 support to ensure
                                                                your peace of mind
                                                            </Typography.Text>
                                                        </Flex>
                                                        <RightOutlined style={{ color: '#bfbfbf' }} />
                                                    </Flex>

                                                    <Typography.Text className="text-textGreyLight text-xs">
                                                        Tip is always optional*
                                                    </Typography.Text>
                                                </Flex>
                                            </Col>

                                            {/* Right: rental details */}
                                            <Col xs={24} md={12}>
                                                <Flex vertical gap={16}>
                                                    {/* Heading + ID */}
                                                    <Flex vertical gap={4}>
                                                        <Typography.Text
                                                            strong
                                                            style={{ fontSize: 16 }}
                                                        >
                                                            Rental Details
                                                        </Typography.Text>
                                                        <Typography.Text className="text-textGreyLight text-xs">
                                                            DLID: 1422117931
                                                        </Typography.Text>
                                                    </Flex>

                                                    {/* Pickup + Drop */}
                                                    <Row gutter={[16, 8]}>
                                                        <Col xs={12}>
                                                            <Flex gap={6} align="flex-start">
                                                                <EnvironmentOutlined
                                                                    style={{ color: '#FF4F4F', marginTop: 2 }}
                                                                />
                                                                <Flex vertical gap={2}>
                                                                    <Typography.Text className="text-textGreyLight text-xs">
                                                                        Pickup Location
                                                                    </Typography.Text>
                                                                    <Typography.Text className="text-sm">
                                                                        Mumbai
                                                                    </Typography.Text>
                                                                </Flex>
                                                            </Flex>
                                                        </Col>
                                                        <Col xs={12}>
                                                            <Flex gap={6} align="flex-start">
                                                                <EnvironmentOutlined
                                                                    style={{ color: '#FF4F4F', marginTop: 2 }}
                                                                />
                                                                <Flex vertical gap={2}>
                                                                    <Typography.Text className="text-textGreyLight text-xs">
                                                                        Drop Location
                                                                    </Typography.Text>
                                                                    <Typography.Text className="text-sm">
                                                                        Agra
                                                                    </Typography.Text>
                                                                </Flex>
                                                            </Flex>
                                                        </Col>
                                                    </Row>

                                                    {/* Inclusions & Exclusions */}
                                                    <Row gutter={[16, 8]}>
                                                        <Col xs={12}>
                                                            <Flex vertical gap={8}>
                                                                <Typography.Text
                                                                    strong
                                                                    className="text-sm"
                                                                >
                                                                    Inclusions
                                                                </Typography.Text>
                                                                {[
                                                                    `${car.kms} Kms`,
                                                                    'Fuel Charges',
                                                                    'Driver Charges',
                                                                ].map(item => (
                                                                    <Flex gap={6} align="center" key={item}>
                                                                        <CheckCircleOutlined
                                                                            style={{ color: '#52c41a' }}
                                                                        />
                                                                        <Typography.Text className="text-xs">
                                                                            {item}
                                                                        </Typography.Text>
                                                                    </Flex>
                                                                ))}
                                                            </Flex>
                                                        </Col>
                                                        <Col xs={12}>
                                                            <Flex vertical gap={8}>
                                                                <Typography.Text
                                                                    strong
                                                                    className="text-sm"
                                                                >
                                                                    Exclusions
                                                                </Typography.Text>
                                                                {[
                                                                    'Toll Tax',
                                                                    'State Tax',
                                                                    'Parking Charges',
                                                                ].map(item => (
                                                                    <Flex gap={6} align="center" key={item}>
                                                                        <CloseCircleOutlined
                                                                            style={{ color: '#FF4F4F' }}
                                                                        />
                                                                        <Typography.Text className="text-xs">
                                                                            {item}
                                                                        </Typography.Text>
                                                                    </Flex>
                                                                ))}
                                                            </Flex>
                                                        </Col>
                                                    </Row>

                                                    <Divider style={{ margin: '4px 0' }} />

                                                    {/* Payment options */}
                                                    <Radio.Group
                                                        value={paymentOption}
                                                        onChange={e =>
                                                            setPaymentOption(e.target.value)
                                                        }
                                                        className="w-full"
                                                    >
                                                        <Space direction="vertical" className="w-full">
                                                            <Flex justify="space-between" align="center">
                                                                <Radio value="part">Part Pay</Radio>
                                                                <Typography.Text strong>
                                                                    ₹{partPayAmount(car.price)}
                                                                </Typography.Text>
                                                            </Flex>
                                                            <Flex justify="space-between" align="center">
                                                                <Radio value="full">Full Pay</Radio>
                                                                <Typography.Text strong>
                                                                    ₹{car.price}
                                                                </Typography.Text>
                                                            </Flex>
                                                        </Space>
                                                    </Radio.Group>

                                                    <Typography.Text className="text-textGreyLight text-xs">
                                                        Additional Kms @ ₹26/Km
                                                    </Typography.Text>

                                                    {/* Book Now */}
                                                    <Button
                                                        type="primary"
                                                        danger
                                                        block
                                                        size="large"
                                                        onClick={() =>
                                                            navigate(
                                                                `/${paths.dashboard.carRentalsCart}`
                                                            )
                                                        }
                                                    >
                                                        Book Now @ ₹
                                                        {paymentOption === 'part'
                                                            ? partPayAmount(car.price)
                                                            : car.price}
                                                    </Button>

                                                    {/* See More Details */}
                                                    <Flex justify="center">
                                                        <Typography.Link type="danger">
                                                            See More Details
                                                        </Typography.Link>
                                                    </Flex>
                                                </Flex>
                                            </Col>
                                        </Row>
                                    </>
                                )}
                            </Card>
                        ))}
                    </Flex>
                </Flex>
            </Col>
        </Row>
    );
};

export default CarRentalsResults;
