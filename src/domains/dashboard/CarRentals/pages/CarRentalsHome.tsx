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

const CARD_SHADOW = '0px 1.94px 19.398px 0px rgba(0, 0, 0, 0.10)';

const CITIES = [
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Bangalore', label: 'Bangalore' },
    { value: 'Chennai', label: 'Chennai' },
    { value: 'Hyderabad', label: 'Hyderabad' },
    { value: 'Pune', label: 'Pune' },
];

const VEHICLE_TYPES = [
    { value: 'bike', label: 'Bike' },
    { value: 'scooter', label: 'Scooter' },
];

// ─── VehicleImage ─────────────────────────────────────────────────────────────

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

// ─── Static data ──────────────────────────────────────────────────────────────

const popularRoutes = [
    { from: 'Mumbai',    to: 'Pune',       price: '₹3,960' },
    { from: 'Bangalore', to: 'Mysore',     price: '₹3,960' },
    { from: 'Delhi',     to: 'Agra',       price: '₹4,200' },
    { from: 'Chennai',   to: 'Bangalore',  price: '₹5,500' },
    { from: 'Hyderabad', to: 'Vijayawada', price: '₹3,200' },
    { from: 'Delhi',     to: 'Jaipur',     price: '₹4,800' },
];

const budgetCars = [
    { name: 'Maruti Suzuki Dzire', make: 'Maruti Suzuki', model: 'Dzire', price: '₹3,200' },
    { name: 'Kia Sonet',           make: 'Kia',           model: 'Sonet', price: '₹3,500' },
    { name: 'Honda Amaze',         make: 'Honda',         model: 'Amaze', price: '₹3,200' },
    { name: 'Hyundai Aura',        make: 'Hyundai',       model: 'Aura',  price: '₹3,100' },
    { name: 'Tata Tigor',          make: 'Tata',          model: 'Tigor', price: '₹2,900' },
];

const luxuryCars = [
    { name: 'BMW 5 Series',          make: 'BMW',           model: '5 Series', price: '₹18,400' },
    { name: 'Mercedes-Benz E-Class', make: 'Mercedes-Benz', model: 'E-Class',  price: '₹18,700' },
    { name: 'Mercedes-Benz GLS',     make: 'Mercedes-Benz', model: 'GLS',      price: '₹23,500' },
    { name: 'Audi A6',               make: 'Audi',          model: 'A6',       price: '₹17,200' },
    { name: 'Jaguar XF',             make: 'Jaguar',        model: 'XF',       price: '₹22,500' },
];

const durationOptions = [
    { value: '4hrs', label: '4hrs / 40kms' },
    { value: '8hrs', label: '8hrs / 80kms' },
    { value: '12hrs', label: '12hrs / 120kms' },
];

const FieldLabel = ({ children }: { children: string }) => (
    <Typography.Text className="text-xs text-textGreyLight" style={{ display: 'block' }}>
        {children}
    </Typography.Text>
);

const CarRentalsHome = () => {
    const [mainTab, setMainTab] = useState('cars');
    const [searchTab, setSearchTab] = useState('cabs');
    const [cabSubType, setCabSubType] = useState('one-way');
    const [airportDirection, setAirportDirection] = useState('drop');
    const [categoryTab, setCategoryTab] = useState('car');
    const [tierTab, setTierTab] = useState('budget');
    const [luxuryTab, setLuxuryTab] = useState('daily');

    const [fromCity, setFromCity] = useState<string | undefined>(undefined);
    const [toCity, setToCity] = useState<string | undefined>(undefined);
    const [selfDriveCity, setSelfDriveCity] = useState<string | undefined>(undefined);
    const [twoWheelerCity, setTwoWheelerCity] = useState<string | undefined>(undefined);
    const [twoWheelerVehicle, setTwoWheelerVehicle] = useState<string | undefined>(undefined);

    const navigate = useNavigate();
    const radioClass = 'xs:text-xs md:text-sm md:font-semibold mt-1 me-4';

    const goToResults = () => {
        const params = new URLSearchParams();
        if (mainTab === 'two-wheelers') {
            params.set('rentalType', '2wheelers');
            if (twoWheelerVehicle) {
                params.set('vehicleType', twoWheelerVehicle === 'bike' ? 'bikes' : 'scooters');
            }
            if (twoWheelerCity) params.set('fromCity', twoWheelerCity);
        } else if (searchTab === 'self-drive') {
            params.set('rentalType', 'selfDrive');
            if (selfDriveCity) params.set('fromCity', selfDriveCity);
        } else {
            params.set('rentalType', 'cabs');
            const bookingTypeMap: Record<string, string> = {
                'one-way':    'outstationOneWay',
                'round-trip': 'outstationRoundTrip',
                'airport':    'airportTransfer',
                'local':      'localHourly',
            };
            params.set('bookingType', bookingTypeMap[cabSubType]);
            if (fromCity) params.set('fromCity', fromCity);
            if (toCity && (cabSubType === 'one-way' || cabSubType === 'round-trip')) {
                params.set('toCity', toCity);
            }
        }
        navigate(`/${paths.dashboard.carRentalsResults}?${params.toString()}`);
    };

    const renderCabFields = () => {
        switch (cabSubType) {
            case 'one-way':
                return (
                    <Row gutter={[12, 12]}>
                        <Col xs={24} sm={12} md={6}>
                            <Flex vertical gap={4}>
                                <FieldLabel>From</FieldLabel>
                                <Select className="w-full" size="large" placeholder="Select city" options={CITIES} value={fromCity} onChange={setFromCity} />
                            </Flex>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Flex vertical gap={4}>
                                <FieldLabel>To</FieldLabel>
                                <Select className="w-full" size="large" placeholder="Select city" options={CITIES} value={toCity} onChange={setToCity} />
                            </Flex>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Flex vertical gap={4}>
                                <FieldLabel>Departure Date</FieldLabel>
                                <DatePicker className="w-full" size="large" placeholder="Select date" />
                            </Flex>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Flex vertical gap={4}>
                                <FieldLabel>Pickup Time</FieldLabel>
                                <TimePicker className="w-full" size="large" placeholder="Select time" use12Hours format="h:mm a" />
                            </Flex>
                        </Col>
                    </Row>
                );

            case 'round-trip':
                return (
                    <Row gutter={[12, 12]}>
                        <Col xs={24} sm={12} md={5}>
                            <Flex vertical gap={4}>
                                <FieldLabel>From</FieldLabel>
                                <Select className="w-full" size="large" placeholder="Select city" options={CITIES} value={fromCity} onChange={setFromCity} />
                            </Flex>
                        </Col>
                        <Col xs={24} sm={12} md={5}>
                            <Flex vertical gap={4}>
                                <FieldLabel>To</FieldLabel>
                                <Select className="w-full" size="large" placeholder="Select city" options={CITIES} value={toCity} onChange={setToCity} />
                            </Flex>
                        </Col>
                        <Col xs={24} sm={12} md={5}>
                            <Flex vertical gap={4}>
                                <FieldLabel>Departure Date</FieldLabel>
                                <DatePicker className="w-full" size="large" placeholder="Select date" />
                            </Flex>
                        </Col>
                        <Col xs={24} sm={12} md={5}>
                            <Flex vertical gap={4}>
                                <FieldLabel>Return Date</FieldLabel>
                                <DatePicker className="w-full" size="large" placeholder="Select date" />
                            </Flex>
                        </Col>
                        <Col xs={24} sm={24} md={4}>
                            <Flex vertical gap={4}>
                                <FieldLabel>Pickup Time</FieldLabel>
                                <TimePicker className="w-full" size="large" placeholder="Select time" use12Hours format="h:mm a" />
                            </Flex>
                        </Col>
                    </Row>
                );

            case 'airport':
                return (
                    <Flex vertical gap={12}>
                        <Radio.Group value={airportDirection} onChange={e => setAirportDirection(e.target.value)} buttonStyle="solid">
                            <Radio.Button value="drop">Drop to Airport</Radio.Button>
                            <Radio.Button value="pickup">Pickup from Airport</Radio.Button>
                        </Radio.Group>
                        <Row gutter={[12, 12]}>
                            <Col xs={24} sm={12} md={6}>
                                <Flex vertical gap={4}>
                                    <FieldLabel>From City</FieldLabel>
                                    <Select className="w-full" size="large" placeholder="Select city" options={CITIES} value={fromCity} onChange={setFromCity} />
                                </Flex>
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <Flex vertical gap={4}>
                                    <FieldLabel>Airport</FieldLabel>
                                    <Input placeholder="Drop airport" size="large" />
                                </Flex>
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <Flex vertical gap={4}>
                                    <FieldLabel>Date</FieldLabel>
                                    <DatePicker className="w-full" size="large" placeholder="Select date" />
                                </Flex>
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <Flex vertical gap={4}>
                                    <FieldLabel>Pickup Time</FieldLabel>
                                    <TimePicker className="w-full" size="large" placeholder="Select time" use12Hours format="h:mm a" />
                                </Flex>
                            </Col>
                        </Row>
                    </Flex>
                );

            case 'local':
                return (
                    <Row gutter={[12, 12]}>
                        <Col xs={24} sm={12} md={5}>
                            <Flex vertical gap={4}>
                                <FieldLabel>Pickup City</FieldLabel>
                                <Select className="w-full" size="large" placeholder="Select city" options={CITIES} value={fromCity} onChange={setFromCity} />
                            </Flex>
                        </Col>
                        <Col xs={24} sm={12} md={5}>
                            <Flex vertical gap={4}>
                                <FieldLabel>Date</FieldLabel>
                                <DatePicker className="w-full" size="large" placeholder="Select date" />
                            </Flex>
                        </Col>
                        <Col xs={24} sm={12} md={5}>
                            <Flex vertical gap={4}>
                                <FieldLabel>Pickup Time</FieldLabel>
                                <TimePicker className="w-full" size="large" placeholder="Select time" use12Hours format="h:mm a" />
                            </Flex>
                        </Col>
                        <Col xs={24} sm={12} md={5}>
                            <Flex vertical gap={4}>
                                <FieldLabel>Duration</FieldLabel>
                                <Select className="w-full" size="large" placeholder="Duration" options={durationOptions} />
                            </Flex>
                        </Col>
                        <Col xs={24} sm={12} md={4}>
                            <Flex vertical gap={4}>
                                <FieldLabel>Days</FieldLabel>
                                <InputNumber
                                    className="w-full"
                                    size="large"
                                    min={1}
                                    defaultValue={1}
                                    formatter={value => `${value} Day${Number(value) === 1 ? '' : 's'}`}
                                    parser={value => Number(value?.replace(/[^\d]/g, '') || '1')}
                                />
                            </Flex>
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
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=1600&q=80')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
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
                    style={{ borderRadius: 8, boxShadow: CARD_SHADOW }}
                    bodyStyle={{ padding: 16 }}
                >
                    <Tabs
                        activeKey={mainTab}
                        onChange={setMainTab}
                        size="large"
                        items={[
                            {
                                key: 'cars',
                                label: 'Cars',
                                children: (
                                    <Tabs
                                        activeKey={searchTab}
                                        onChange={setSearchTab}
                                        items={[
                                            {
                                                key: 'cabs',
                                                label: 'Cabs',
                                                children: (
                                                    <Flex vertical gap={16}>
                                                        <Radio.Group value={cabSubType} onChange={e => setCabSubType(e.target.value)} size="large">
                                                            <Radio value="one-way" className={radioClass}>Outstation One-Way</Radio>
                                                            <Radio value="round-trip" className={radioClass}>Outstation Round-Trip</Radio>
                                                            <Radio value="airport" className={radioClass}>Airport Transfer</Radio>
                                                            <Radio value="local" className={radioClass}>Local/Hourly</Radio>
                                                        </Radio.Group>
                                                        {renderCabFields()}
                                                        <Button type="primary" danger block size="large" onClick={goToResults}>
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
                                                                <Flex vertical gap={4}>
                                                                    <FieldLabel>Pickup City</FieldLabel>
                                                                    <Select className="w-full" size="large" placeholder="Select city" options={CITIES} value={selfDriveCity} onChange={setSelfDriveCity} />
                                                                </Flex>
                                                            </Col>
                                                            <Col xs={24} sm={12} md={8}>
                                                                <Flex vertical gap={4}>
                                                                    <FieldLabel>Pickup Date</FieldLabel>
                                                                    <DatePicker className="w-full" size="large" placeholder="Select date" />
                                                                </Flex>
                                                            </Col>
                                                            <Col xs={24} sm={12} md={8}>
                                                                <Flex vertical gap={4}>
                                                                    <FieldLabel>Return Date</FieldLabel>
                                                                    <DatePicker className="w-full" size="large" placeholder="Select date" />
                                                                </Flex>
                                                            </Col>
                                                        </Row>
                                                        <Button type="primary" danger block size="large" onClick={goToResults}>
                                                            Search
                                                        </Button>
                                                    </Flex>
                                                ),
                                            },
                                        ]}
                                    />
                                ),
                            },
                            {
                                key: 'two-wheelers',
                                label: '2 Wheelers',
                                children: (
                                    <Flex vertical gap={16}>
                                        <Row gutter={[12, 12]}>
                                            <Col xs={24} sm={12} md={6}>
                                                <Flex vertical gap={4}>
                                                    <FieldLabel>Vehicle Type</FieldLabel>
                                                    <Select className="w-full" size="large" placeholder="Select type" options={VEHICLE_TYPES} value={twoWheelerVehicle} onChange={setTwoWheelerVehicle} />
                                                </Flex>
                                            </Col>
                                            <Col xs={24} sm={12} md={6}>
                                                <Flex vertical gap={4}>
                                                    <FieldLabel>Pickup City</FieldLabel>
                                                    <Select className="w-full" size="large" placeholder="Select city" options={CITIES} value={twoWheelerCity} onChange={setTwoWheelerCity} />
                                                </Flex>
                                            </Col>
                                            <Col xs={24} sm={12} md={6}>
                                                <Flex vertical gap={4}>
                                                    <FieldLabel>Pickup Date</FieldLabel>
                                                    <DatePicker className="w-full" size="large" placeholder="Select date" />
                                                </Flex>
                                            </Col>
                                            <Col xs={24} sm={12} md={6}>
                                                <Flex vertical gap={4}>
                                                    <FieldLabel>Return Date</FieldLabel>
                                                    <DatePicker className="w-full" size="large" placeholder="Select date" />
                                                </Flex>
                                            </Col>
                                        </Row>
                                        <Button type="primary" danger block size="large" onClick={goToResults}>
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
                                style={{ width: 240, borderRadius: 12, boxShadow: CARD_SHADOW, cursor: 'pointer' }}
                            >
                                <Flex gap={10} align="center">
                                    <div style={{
                                        width: 48, height: 48, borderRadius: '50%', background: '#FFF1F0',
                                        border: '1px solid #FFD6D6', display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', fontSize: 11, color: '#FF4F4F', fontWeight: 600, flexShrink: 0,
                                    }}>
                                        {item.from.charAt(0)}{item.to.charAt(0)}
                                    </div>
                                    <Flex vertical gap={4}>
                                        <Typography.Text strong className="text-sm">
                                            {item.from} to {item.to}
                                        </Typography.Text>
                                        <Typography.Text className="text-textGreyLight text-xs">
                                            Starts from {item.price}
                                        </Typography.Text>
                                    </Flex>
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
                                style={{ borderRadius: 12, boxShadow: CARD_SHADOW }}
                            >
                                <Flex vertical gap={8}>
                                    <VehicleImage make={car.make} model={car.model} width={200} height={140} />
                                    <Typography.Text strong className="text-sm">{car.name}</Typography.Text>
                                    <Typography.Text className="text-textGreyLight text-xs">
                                        Rental Starts from {car.price}
                                    </Typography.Text>
                                    <Button type="primary" danger size="small">Book Now</Button>
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
                                style={{ borderRadius: 12, boxShadow: CARD_SHADOW }}
                            >
                                <Flex vertical gap={8}>
                                    <VehicleImage make={car.make} model={car.model} width={200} height={140} />
                                    <Typography.Text strong className="text-sm">{car.name}</Typography.Text>
                                    <Typography.Text className="text-textGreyLight text-xs">
                                        Rental Starts from {car.price}
                                    </Typography.Text>
                                    <Button type="primary" danger size="small">Book Now</Button>
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
