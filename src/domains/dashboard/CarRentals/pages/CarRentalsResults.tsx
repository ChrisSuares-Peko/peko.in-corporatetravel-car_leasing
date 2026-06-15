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
    { name: 'Maruti Suzuki Ciaz',       bags: 4, seats: 5, bodyType: 'Sedan',     airbags: 2, price: '28,812', kms: '1296', img: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=160&q=80' },
    { name: 'Maruti Suzuki Ertiga',      bags: 4, seats: 7, bodyType: 'MUV',       airbags: 4, price: '31,404', kms: '1296', img: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=160&q=80' },
    { name: 'Maruti Suzuki Celerio',     bags: 3, seats: 5, bodyType: 'Hatchback', airbags: 2, price: '31,604', kms: '1296', img: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=160&q=80' },
    { name: 'Maruti Suzuki Wagon R',     bags: 3, seats: 5, bodyType: 'Hatchback', airbags: 2, price: '31,604', kms: '1296', img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=160&q=80' },
    { name: 'Maruti Suzuki Swift Dzire', bags: 4, seats: 5, bodyType: 'Sedan',     airbags: 2, price: '33,696', kms: '1296', img: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=160&q=80' },
    { name: 'Hyundai Aura',              bags: 4, seats: 5, bodyType: 'Sedan',     airbags: 2, price: '33,946', kms: '1296', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=160&q=80' },
    { name: 'Maruti Suzuki Dzire',       bags: 4, seats: 5, bodyType: 'Sedan',     airbags: 6, price: '33,946', kms: '1296', img: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=160&q=80' },
    { name: 'Toyota Etios',              bags: 4, seats: 5, bodyType: 'Sedan',     airbags: 2, price: '33,946', kms: '1296', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=160&q=80' },
    { name: 'Honda Amaze',               bags: 4, seats: 5, bodyType: 'Sedan',     airbags: 6, price: '33,996', kms: '1296', img: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=160&q=80' },
    { name: 'Hyundai Xcent',             bags: 4, seats: 5, bodyType: 'Sedan',     airbags: 2, price: '33,996', kms: '1296', img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=160&q=80' },
];

const MAKES_AND_MODELS = [
    { name: 'Maruti Suzuki', models: ['Dzire', 'Ciaz', 'Ertiga', 'Celerio', 'Wagon R', 'Swift', 'Baleno'] },
    { name: 'Hyundai',       models: ['Aura', 'Xcent', 'i20', 'Verna', 'Creta'] },
    { name: 'Honda',         models: ['Amaze', 'City', 'WR-V'] },
    { name: 'Tata',          models: ['Tigor', 'Nexon', 'Harrier'] },
    { name: 'Toyota',        models: ['Etios', 'Innova', 'Fortuner'] },
    { name: 'Kia',           models: ['Sonet', 'Seltos', 'Carens'] },
    { name: 'BMW',           models: ['3 Series', '5 Series', '7 Series', 'X5'] },
    { name: 'Mercedes-Benz', models: ['E-Class', 'S-Class', 'GLS', 'GLE'] },
    { name: 'Audi',          models: ['A4', 'A6', 'Q5', 'Q7'] },
    { name: 'Jaguar',        models: ['XE', 'XF', 'F-Pace'] },
];

const partPayAmount = (price: string): string => {
    const num = parseInt(price.replace(/,/g, ''), 10);
    return Math.round(num * 0.35).toLocaleString('en-IN');
};

const CarRentalsResults = () => {
    const selectedFrom = 'Mumbai';
    const selectedTo = 'Agra';

    const [rentalTypes, setRentalTypes] = useState<string[]>([]);
    const [bookingTypes, setBookingTypes] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([5000, 1076976]);
    const [selectedModels, setSelectedModels] = useState<Record<string, string[]>>({});
    const [bodyTypes, setBodyTypes] = useState<string[]>([]);
    const [fuelTypes, setFuelTypes] = useState<string[]>([]);
    const [transmissionTypes, setTransmissionTypes] = useState<string[]>([]);
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
                <Checkbox.Group
                    value={rentalTypes}
                    onChange={v => setRentalTypes(v as string[])}
                >
                    <Space direction="vertical" className="w-full">
                        <Checkbox value="daily">Daily Rental</Checkbox>
                        <Checkbox value="self-drive">Self Drive</Checkbox>
                    </Space>
                </Checkbox.Group>
            ),
        },
        {
            key: 'booking-type',
            label: <Typography.Text strong>Booking Type</Typography.Text>,
            children: (
                <Checkbox.Group
                    value={bookingTypes}
                    onChange={v => setBookingTypes(v as string[])}
                >
                    <Space direction="vertical" className="w-full">
                        <Checkbox value="one-way">Outstation One-Way</Checkbox>
                        <Checkbox value="round-trip">Outstation Round-Trip</Checkbox>
                        <Checkbox value="airport">Airport Transfer</Checkbox>
                        <Checkbox value="local">Local/Hourly Rental</Checkbox>
                    </Space>
                </Checkbox.Group>
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
                        min={5000}
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
            children: (
                <Collapse
                    ghost
                    size="small"
                    items={MAKES_AND_MODELS.map(brand => ({
                        key: brand.name,
                        label: (
                            <Typography.Text className="text-sm">{brand.name}</Typography.Text>
                        ),
                        children: (
                            <Checkbox.Group
                                value={selectedModels[brand.name] ?? []}
                                onChange={vals =>
                                    setSelectedModels(prev => ({
                                        ...prev,
                                        [brand.name]: vals as string[],
                                    }))
                                }
                            >
                                <Space direction="vertical" style={{ paddingLeft: 8 }}>
                                    {brand.models.map(model => (
                                        <Checkbox key={model} value={model}>
                                            <Typography.Text className="text-sm">
                                                {model}
                                            </Typography.Text>
                                        </Checkbox>
                                    ))}
                                </Space>
                            </Checkbox.Group>
                        ),
                    }))}
                />
            ),
        },
        {
            key: 'body-type',
            label: <Typography.Text strong>Body Type</Typography.Text>,
            children: (
                <Checkbox.Group
                    value={bodyTypes}
                    onChange={v => setBodyTypes(v as string[])}
                >
                    <Space direction="vertical" className="w-full">
                        <Checkbox value="sedan">Sedan</Checkbox>
                        <Checkbox value="hatchback">Hatchback</Checkbox>
                        <Checkbox value="suv">SUV</Checkbox>
                        <Checkbox value="muv">MUV</Checkbox>
                        <Checkbox value="luxury-sedan">Luxury Sedan</Checkbox>
                        <Checkbox value="convertible">Convertible</Checkbox>
                        <Checkbox value="coupe">Coupe</Checkbox>
                    </Space>
                </Checkbox.Group>
            ),
        },
        {
            key: 'fuel-type',
            label: <Typography.Text strong>Fuel Type</Typography.Text>,
            children: (
                <Checkbox.Group
                    value={fuelTypes}
                    onChange={v => setFuelTypes(v as string[])}
                >
                    <Space direction="vertical" className="w-full">
                        <Checkbox value="petrol">Petrol</Checkbox>
                        <Checkbox value="diesel">Diesel</Checkbox>
                        <Checkbox value="cng">CNG</Checkbox>
                        <Checkbox value="electric">Electric</Checkbox>
                        <Checkbox value="hybrid">Hybrid</Checkbox>
                    </Space>
                </Checkbox.Group>
            ),
        },
        {
            key: 'transmission',
            label: <Typography.Text strong>Transmission Type</Typography.Text>,
            children: (
                <Checkbox.Group
                    value={transmissionTypes}
                    onChange={v => setTransmissionTypes(v as string[])}
                >
                    <Space direction="vertical" className="w-full">
                        <Checkbox value="manual">Manual</Checkbox>
                        <Checkbox value="automatic">Automatic</Checkbox>
                        <Checkbox value="amt">AMT</Checkbox>
                    </Space>
                </Checkbox.Group>
            ),
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
                        defaultActiveKey={['rental-type']}
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
                                <Typography.Text strong>{selectedFrom}</Typography.Text>
                                <Typography.Text className="text-textGreyLight">→</Typography.Text>
                                <Typography.Text strong>{selectedTo}</Typography.Text>
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
                                                borderRadius: 4,
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
                                                                        {selectedFrom}
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
                                                                        {selectedTo}
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
