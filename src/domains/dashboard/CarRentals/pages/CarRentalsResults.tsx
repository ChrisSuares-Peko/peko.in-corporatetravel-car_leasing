import React, { useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

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

// ─── Static data ────────────────────────────────────────────────────────────

const CAR_RESULTS = [
    { name: 'Maruti Suzuki Ciaz',       bags: 4, seats: 5, bodyType: 'Sedan',     airbags: 2, price: '28,812', kms: '1296', priceUnit: '', img: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=160&q=80' },
    { name: 'Maruti Suzuki Ertiga',      bags: 4, seats: 7, bodyType: 'MUV',       airbags: 4, price: '31,404', kms: '1296', priceUnit: '', img: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=160&q=80' },
    { name: 'Maruti Suzuki Celerio',     bags: 3, seats: 5, bodyType: 'Hatchback', airbags: 2, price: '31,604', kms: '1296', priceUnit: '', img: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=160&q=80' },
    { name: 'Maruti Suzuki Wagon R',     bags: 3, seats: 5, bodyType: 'Hatchback', airbags: 2, price: '31,604', kms: '1296', priceUnit: '', img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=160&q=80' },
    { name: 'Maruti Suzuki Swift Dzire', bags: 4, seats: 5, bodyType: 'Sedan',     airbags: 2, price: '33,696', kms: '1296', priceUnit: '', img: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=160&q=80' },
    { name: 'Hyundai Aura',              bags: 4, seats: 5, bodyType: 'Sedan',     airbags: 2, price: '33,946', kms: '1296', priceUnit: '', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=160&q=80' },
    { name: 'Maruti Suzuki Dzire',       bags: 4, seats: 5, bodyType: 'Sedan',     airbags: 6, price: '33,946', kms: '1296', priceUnit: '', img: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=160&q=80' },
    { name: 'Toyota Etios',              bags: 4, seats: 5, bodyType: 'Sedan',     airbags: 2, price: '33,946', kms: '1296', priceUnit: '', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=160&q=80' },
    { name: 'Honda Amaze',               bags: 4, seats: 5, bodyType: 'Sedan',     airbags: 6, price: '33,996', kms: '1296', priceUnit: '', img: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=160&q=80' },
    { name: 'Hyundai Xcent',             bags: 4, seats: 5, bodyType: 'Sedan',     airbags: 2, price: '33,996', kms: '1296', priceUnit: '', img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=160&q=80' },
];

const BIKE_RESULTS = [
    { name: 'Royal Enfield Classic 350', bags: 2, seats: 2, bodyType: 'Cruiser',   airbags: 0, price: '1,200', kms: '', priceUnit: '/day', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=160&q=80' },
    { name: 'Bajaj Dominar 400',         bags: 1, seats: 2, bodyType: 'Sport',     airbags: 0, price: '1,400', kms: '', priceUnit: '/day', img: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=160&q=80' },
    { name: 'KTM Duke 390',              bags: 1, seats: 2, bodyType: 'Naked',     airbags: 0, price: '1,600', kms: '', priceUnit: '/day', img: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=160&q=80' },
    { name: 'Honda Hornet 2.0',          bags: 1, seats: 2, bodyType: 'Naked',     airbags: 0, price: '1,100', kms: '', priceUnit: '/day', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=160&q=80' },
    { name: 'Yamaha MT-15',              bags: 1, seats: 2, bodyType: 'Naked',     airbags: 0, price: '1,300', kms: '', priceUnit: '/day', img: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=160&q=80' },
    { name: 'Hero XPulse 200',           bags: 1, seats: 2, bodyType: 'Adventure', airbags: 0, price: '900',   kms: '', priceUnit: '/day', img: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=160&q=80' },
];

const SCOOTER_RESULTS = [
    { name: 'Honda Activa 6G',    bags: 1, seats: 2, bodyType: 'Standard Scooter', airbags: 0, price: '600', kms: '', priceUnit: '/day', img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=160&q=80' },
    { name: 'TVS Jupiter',        bags: 1, seats: 2, bodyType: 'Standard Scooter', airbags: 0, price: '550', kms: '', priceUnit: '/day', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=160&q=80' },
    { name: 'Ola S1 Pro',         bags: 1, seats: 2, bodyType: 'Electric Scooter', airbags: 0, price: '800', kms: '', priceUnit: '/day', img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=160&q=80' },
    { name: 'Ather 450X',         bags: 1, seats: 2, bodyType: 'Electric Scooter', airbags: 0, price: '750', kms: '', priceUnit: '/day', img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=160&q=80' },
    { name: 'TVS Ntorq 125',      bags: 1, seats: 2, bodyType: 'Standard Scooter', airbags: 0, price: '650', kms: '', priceUnit: '/day', img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=160&q=80' },
    { name: 'Yamaha Fascino 125', bags: 1, seats: 2, bodyType: 'Standard Scooter', airbags: 0, price: '580', kms: '', priceUnit: '/day', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=160&q=80' },
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

const BIKE_MAKES_AND_MODELS = [
    { name: 'Royal Enfield', models: ['Classic 350', 'Meteor 350', 'Himalayan', 'Thunderbird'] },
    { name: 'Bajaj',         models: ['Dominar 400', 'Pulsar NS200', 'Pulsar 150'] },
    { name: 'Honda',         models: ['CB Shine', 'Unicorn', 'Hornet 2.0', 'Africa Twin'] },
    { name: 'KTM',           models: ['Duke 200', 'Duke 390', 'Adventure 390'] },
    { name: 'Hero',          models: ['Splendor Plus', 'XPulse 200', 'Xtreme 160R'] },
    { name: 'Yamaha',        models: ['FZ-S', 'MT-15', 'R15', 'FZ25'] },
];

const SCOOTER_MAKES_AND_MODELS = [
    { name: 'Honda',        models: ['Activa 6G', 'Dio', 'Grazia'] },
    { name: 'TVS',          models: ['Jupiter', 'Ntorq 125', 'iQube Electric'] },
    { name: 'Suzuki',       models: ['Access 125', 'Burgman Street'] },
    { name: 'Yamaha',       models: ['Fascino 125', 'Ray ZR'] },
    { name: 'Ola Electric', models: ['S1', 'S1 Pro'] },
    { name: 'Ather',        models: ['450X', '450 Plus'] },
];

const partPayAmount = (price: string): string => {
    const num = parseInt(price.replace(/,/g, ''), 10);
    return Math.round(num * 0.35).toLocaleString('en-IN');
};

// bookingType URL param → filter checkbox value
const BOOKING_TYPE_MAP: Record<string, string> = {
    outstationOneWay:   'one-way',
    outstationRoundTrip:'round-trip',
    airportTransfer:    'airport',
    localHourly:        'local',
};

// ─── Component ───────────────────────────────────────────────────────────────

const CarRentalsResults = () => {
    const location = useLocation();

    // City labels shown in the summary strip — read once from URL on mount
    const [selectedFrom] = useState<string>(
        () => new URLSearchParams(location.search).get('fromCity') || ''
    );
    const [selectedTo] = useState<string>(
        () => new URLSearchParams(location.search).get('toCity') || ''
    );

    // Primary mode toggles — initialized from URL params
    const [rentalType, setRentalType] = useState<'daily' | 'selfDrive'>(() => {
        const rt = new URLSearchParams(location.search).get('rentalType');
        return rt === 'selfDrive' || rt === '2wheelers' ? 'selfDrive' : 'daily';
    });

    const [vehicleType, setVehicleType] = useState<'cars' | 'bikes' | 'scooters'>(() => {
        const vt = new URLSearchParams(location.search).get('vehicleType');
        if (vt === 'bikes') return 'bikes';
        if (vt === 'scooters') return 'scooters';
        return 'cars';
    });

    // Filter state — bookingTypes pre-selected from URL param
    const [bookingTypes, setBookingTypes] = useState<string[]>(() => {
        const bt = new URLSearchParams(location.search).get('bookingType');
        return bt && BOOKING_TYPE_MAP[bt] ? [BOOKING_TYPE_MAP[bt]] : [];
    });

    const [priceRange, setPriceRange] = useState<[number, number]>([5000, 1076976]);
    const [selectedModels, setSelectedModels] = useState<Record<string, string[]>>({});
    const [bodyTypes, setBodyTypes] = useState<string[]>([]);
    const [fuelTypes, setFuelTypes] = useState<string[]>([]);
    const [transmissionTypes, setTransmissionTypes] = useState<string[]>([]);
    const [segments, setSegments] = useState<string[]>(['all', 'value', 'mid', 'premium', 'luxury']);

    // Card state
    const [expandedCard, setExpandedCard] = useState<number | null>(null);
    const [paymentOption, setPaymentOption] = useState<'part' | 'full'>('part');

    const navigate = useNavigate();

    // Reset all sub-filters and expanded card whenever the top-level mode changes
    const resetFilters = () => {
        setBookingTypes([]);
        setSelectedModels({});
        setBodyTypes([]);
        setFuelTypes([]);
        setTransmissionTypes([]);
        setExpandedCard(null);
    };

    const handleRentalTypeChange = (type: 'daily' | 'selfDrive') => {
        setRentalType(type);
        setVehicleType('cars');
        resetFilters();
    };

    const handleVehicleTypeChange = (type: 'cars' | 'bikes' | 'scooters') => {
        setVehicleType(type);
        resetFilters();
    };

    const toggleCard = (i: number) => {
        if (expandedCard === i) {
            setExpandedCard(null);
        } else {
            setExpandedCard(i);
            setPaymentOption('part');
        }
    };

    // ── Derived flags ──────────────────────────────────────────────────────
    const isBikeMode    = rentalType === 'selfDrive' && vehicleType === 'bikes';
    const isScooterMode = rentalType === 'selfDrive' && vehicleType === 'scooters';

    // ── Active data ────────────────────────────────────────────────────────
    const activeResults =
        isBikeMode    ? BIKE_RESULTS    :
        isScooterMode ? SCOOTER_RESULTS :
                        CAR_RESULTS;

    const activeMakesAndModels =
        isBikeMode    ? BIKE_MAKES_AND_MODELS    :
        isScooterMode ? SCOOTER_MAKES_AND_MODELS :
                        MAKES_AND_MODELS;

    const activeBodyTypeOptions =
        isBikeMode    ? ['Sport', 'Cruiser', 'Adventure', 'Commuter', 'Naked'] :
        isScooterMode ? ['Standard Scooter', 'Maxi Scooter', 'Electric Scooter'] :
                        ['Sedan', 'Hatchback', 'SUV', 'MUV', 'Luxury Sedan', 'Convertible', 'Coupe'];

    const activeFuelTypeOptions =
        isBikeMode    ? ['Petrol'] :
        isScooterMode ? ['Petrol', 'Electric'] :
                        ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'];

    const activeTransmissionOptions =
        isBikeMode    ? ['Manual', 'Automatic'] :
        isScooterMode ? [] :
                        ['Manual', 'Automatic', 'AMT'];

    // ── Make/Model nested collapse ─────────────────────────────────────────
    const renderMakeModelCollapse = (brands: { name: string; models: string[] }[]) => (
        <Collapse
            ghost
            size="small"
            items={brands.map(brand => ({
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
    );

    // ── Filter panels (derived from rentalType + vehicleType) ──────────────
    const filterPanels = [
        {
            key: 'rental-type',
            label: <Typography.Text strong>Rental Type</Typography.Text>,
            children: (
                <Radio.Group
                    value={rentalType}
                    onChange={e => handleRentalTypeChange(e.target.value)}
                >
                    <Space direction="vertical" className="w-full">
                        <Radio value="daily">Daily Rental</Radio>
                        <Radio value="selfDrive">Self Drive</Radio>
                    </Space>
                </Radio.Group>
            ),
        },
        // Second panel: Booking Type (daily) or Vehicle Type (selfDrive)
        rentalType === 'daily'
            ? {
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
              }
            : {
                  key: 'vehicle-type',
                  label: <Typography.Text strong>Vehicle Type</Typography.Text>,
                  children: (
                      <Radio.Group
                          value={vehicleType}
                          onChange={e => handleVehicleTypeChange(e.target.value)}
                      >
                          <Space direction="vertical" className="w-full">
                              <Radio value="cars">Cars</Radio>
                              <Radio value="bikes">Bikes</Radio>
                              <Radio value="scooters">Scooters</Radio>
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
            children: renderMakeModelCollapse(activeMakesAndModels),
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
                        {activeBodyTypeOptions.map(opt => (
                            <Checkbox key={opt} value={opt}>
                                {opt}
                            </Checkbox>
                        ))}
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
                        {activeFuelTypeOptions.map(opt => (
                            <Checkbox key={opt} value={opt}>
                                {opt}
                            </Checkbox>
                        ))}
                    </Space>
                </Checkbox.Group>
            ),
        },
        {
            key: 'transmission',
            label: <Typography.Text strong>Transmission Type</Typography.Text>,
            children: isScooterMode ? (
                <Flex vertical gap={8}>
                    <Checkbox disabled checked>
                        Automatic
                    </Checkbox>
                    <Typography.Text className="text-textGreyLight text-xs">
                        All scooters are automatic
                    </Typography.Text>
                </Flex>
            ) : (
                <Checkbox.Group
                    value={transmissionTypes}
                    onChange={v => setTransmissionTypes(v as string[])}
                >
                    <Space direction="vertical" className="w-full">
                        {activeTransmissionOptions.map(opt => (
                            <Checkbox key={opt} value={opt}>
                                {opt}
                            </Checkbox>
                        ))}
                    </Space>
                </Checkbox.Group>
            ),
        },
    ];

    // ── Render ─────────────────────────────────────────────────────────────
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
                                <Typography.Text strong>
                                    {selectedFrom || 'Origin'}
                                </Typography.Text>
                                {selectedTo && (
                                    <>
                                        <Typography.Text className="text-textGreyLight">
                                            →
                                        </Typography.Text>
                                        <Typography.Text strong>{selectedTo}</Typography.Text>
                                    </>
                                )}
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
                        {activeResults.map((car, i) => (
                            <Card
                                key={`${rentalType}-${vehicleType}-${i}`}
                                className="rounded-xl"
                                bodyStyle={{ padding: '16px 20px' }}
                                style={{
                                    boxShadow: '0px 1.94px 19.398px 0px rgba(0, 0, 0, 0.10)',
                                }}
                            >
                                {/* Summary row */}
                                <Row gutter={[16, 16]} align="middle">
                                    {/* Vehicle image */}
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

                                    {/* Vehicle details */}
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
                                                {car.airbags > 0 && (
                                                    <Flex gap={4} align="center">
                                                        <SafetyOutlined />
                                                        <Typography.Text className="text-textGreyLight text-xs">
                                                            {car.airbags} Airbags
                                                        </Typography.Text>
                                                    </Flex>
                                                )}
                                            </Flex>
                                        </Flex>
                                    </Col>

                                    {/* Price + CTA */}
                                    <Col xs={24} sm={6}>
                                        <Flex vertical gap={8} align="flex-end">
                                            <Typography.Text strong style={{ fontSize: 18 }}>
                                                ₹{car.price}{car.priceUnit}
                                            </Typography.Text>
                                            {car.kms && (
                                                <Typography.Text className="text-textGreyLight text-xs">
                                                    {car.kms} Kms
                                                </Typography.Text>
                                            )}
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
                                            <Tag>Self Drive</Tag>
                                            <Tag>{car.bags} Bags</Tag>
                                        </Flex>

                                        {/* Two-column layout */}
                                        <Row gutter={[24, 24]}>
                                            {/* Left: image + highlight strip + tip */}
                                            <Col xs={24} md={12}>
                                                <Flex vertical gap={12}>
                                                    {/* Large vehicle image */}
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
                                                                Verified vehicles &amp; 24/7 support to ensure
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
                                                                        {selectedFrom || '–'}
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
                                                                        {selectedTo || '–'}
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
                                                                    car.kms ? `${car.kms} Kms` : null,
                                                                    'Fuel Charges',
                                                                    'Driver Charges',
                                                                ]
                                                                    .filter(Boolean)
                                                                    .map(item => (
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
                                                                    ₹{car.price}{car.priceUnit}
                                                                </Typography.Text>
                                                            </Flex>
                                                        </Space>
                                                    </Radio.Group>

                                                    <Typography.Text className="text-textGreyLight text-xs">
                                                        Additional charges may apply
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
                                                            : `${car.price}${car.priceUnit}`}
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
