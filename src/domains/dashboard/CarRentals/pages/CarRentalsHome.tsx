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

const popularRoutes = [
    { route: 'Mumbai to Pune',          price: '₹3,960', img: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=80&q=80' },
    { route: 'Bangalore to Mysore',     price: '₹3,960', img: 'https://images.unsplash.com/photo-1580889240428-a8ed8b5a4b43?w=80&q=80' },
    { route: 'Delhi to Agra',           price: '₹4,200', img: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=80&q=80' },
    { route: 'Chennai to Bangalore',    price: '₹5,500', img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=80&q=80' },
    { route: 'Hyderabad to Vijayawada', price: '₹3,200', img: 'https://images.unsplash.com/photo-1600100397608-658dcab04e61?w=80&q=80' },
    { route: 'Delhi to Jaipur',         price: '₹4,800', img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=80&q=80' },
];

const budgetCars = [
    { name: 'Maruti Suzuki Dzire', price: '₹3,200', img: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=200&q=80' },
    { name: 'Kia Sonet',           price: '₹3,500', img: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=200&q=80' },
    { name: 'Honda Amaze',         price: '₹3,200', img: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=200&q=80' },
    { name: 'Hyundai Aura',        price: '₹3,100', img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200&q=80' },
    { name: 'Tata Tigor',          price: '₹2,900', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=200&q=80' },
];

const luxuryCars = [
    { name: 'BMW 5 Series',          price: '₹18,400', img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=200&q=80' },
    { name: 'Mercedes-Benz E-Class', price: '₹18,700', img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=200&q=80' },
    { name: 'Mercedes-Benz GLS',     price: '₹23,500', img: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=200&q=80' },
    { name: 'Audi A6',               price: '₹17,200', img: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=200&q=80' },
    { name: 'Jaguar XF',             price: '₹22,500', img: 'https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?w=200&q=80' },
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

    // Search field selections — passed as query params to Results
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
            // Cabs
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
                                <Select
                                    className="w-full"
                                    size="large"
                                    placeholder="Select city"
                                    options={CITIES}
                                    value={fromCity}
                                    onChange={setFromCity}
                                />
                            </Flex>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Flex vertical gap={4}>
                                <FieldLabel>To</FieldLabel>
                                <Select
                                    className="w-full"
                                    size="large"
                                    placeholder="Select city"
                                    options={CITIES}
                                    value={toCity}
                                    onChange={setToCity}
                                />
                            </Flex>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Flex vertical gap={4}>
                                <FieldLabel>Departure Date</FieldLabel>
                                <DatePicker
                                    className="w-full"
                                    size="large"
                                    placeholder="Select date"
                                />
                            </Flex>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Flex vertical gap={4}>
                                <FieldLabel>Pickup Time</FieldLabel>
                                <TimePicker
                                    className="w-full"
                                    size="large"
                                    placeholder="Select time"
                                    use12Hours
                                    format="h:mm a"
                                />
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
                                <Select
                                    className="w-full"
                                    size="large"
                                    placeholder="Select city"
                                    options={CITIES}
                                    value={fromCity}
                                    onChange={setFromCity}
                                />
                            </Flex>
                        </Col>
                        <Col xs={24} sm={12} md={5}>
                            <Flex vertical gap={4}>
                                <FieldLabel>To</FieldLabel>
                                <Select
                                    className="w-full"
                                    size="large"
                                    placeholder="Select city"
                                    options={CITIES}
                                    value={toCity}
                                    onChange={setToCity}
                                />
                            </Flex>
                        </Col>
                        <Col xs={24} sm={12} md={5}>
                            <Flex vertical gap={4}>
                                <FieldLabel>Departure Date</FieldLabel>
                                <DatePicker
                                    className="w-full"
                                    size="large"
                                    placeholder="Select date"
                                />
                            </Flex>
                        </Col>
                        <Col xs={24} sm={12} md={5}>
                            <Flex vertical gap={4}>
                                <FieldLabel>Return Date</FieldLabel>
                                <DatePicker
                                    className="w-full"
                                    size="large"
                                    placeholder="Select date"
                                />
                            </Flex>
                        </Col>
                        <Col xs={24} sm={24} md={4}>
                            <Flex vertical gap={4}>
                                <FieldLabel>Pickup Time</FieldLabel>
                                <TimePicker
                                    className="w-full"
                                    size="large"
                                    placeholder="Select time"
                                    use12Hours
                                    format="h:mm a"
                                />
                            </Flex>
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
                                <Flex vertical gap={4}>
                                    <FieldLabel>From City</FieldLabel>
                                    <Select
                                        className="w-full"
                                        size="large"
                                        placeholder="Select city"
                                        options={CITIES}
                                        value={fromCity}
                                        onChange={setFromCity}
                                    />
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
                                    <DatePicker
                                        className="w-full"
                                        size="large"
                                        placeholder="Select date"
                                    />
                                </Flex>
                            </Col>
                            <Col xs={24} sm={12} md={6}>
                                <Flex vertical gap={4}>
                                    <FieldLabel>Pickup Time</FieldLabel>
                                    <TimePicker
                                        className="w-full"
                                        size="large"
                                        placeholder="Select time"
                                        use12Hours
                                        format="h:mm a"
                                    />
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
                                <Select
                                    className="w-full"
                                    size="large"
                                    placeholder="Select city"
                                    options={CITIES}
                                    value={fromCity}
                                    onChange={setFromCity}
                                />
                            </Flex>
                        </Col>
                        <Col xs={24} sm={12} md={5}>
                            <Flex vertical gap={4}>
                                <FieldLabel>Date</FieldLabel>
                                <DatePicker
                                    className="w-full"
                                    size="large"
                                    placeholder="Select date"
                                />
                            </Flex>
                        </Col>
                        <Col xs={24} sm={12} md={5}>
                            <Flex vertical gap={4}>
                                <FieldLabel>Pickup Time</FieldLabel>
                                <TimePicker
                                    className="w-full"
                                    size="large"
                                    placeholder="Select time"
                                    use12Hours
                                    format="h:mm a"
                                />
                            </Flex>
                        </Col>
                        <Col xs={24} sm={12} md={5}>
                            <Flex vertical gap={4}>
                                <FieldLabel>Duration</FieldLabel>
                                <Select
                                    className="w-full"
                                    size="large"
                                    placeholder="Duration"
                                    options={durationOptions}
                                />
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
                                    formatter={value =>
                                        `${value} Day${Number(value) === 1 ? '' : 's'}`
                                    }
                                    parser={value =>
                                        Number(value?.replace(/[^\d]/g, '') || '1')
                                    }
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
                    {/* Top-level tabs: Cars / 2 Wheelers */}
                    <Tabs
                        activeKey={mainTab}
                        onChange={setMainTab}
                        size="large"
                        items={[
                            {
                                key: 'cars',
                                label: 'Cars',
                                children: (
                                    /* Secondary tabs: Cabs / Self Drive */
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
                                                            onChange={e =>
                                                                setCabSubType(e.target.value)
                                                            }
                                                            size="large"
                                                        >
                                                            <Radio
                                                                value="one-way"
                                                                className={radioClass}
                                                            >
                                                                Outstation One-Way
                                                            </Radio>
                                                            <Radio
                                                                value="round-trip"
                                                                className={radioClass}
                                                            >
                                                                Outstation Round-Trip
                                                            </Radio>
                                                            <Radio
                                                                value="airport"
                                                                className={radioClass}
                                                            >
                                                                Airport Transfer
                                                            </Radio>
                                                            <Radio
                                                                value="local"
                                                                className={radioClass}
                                                            >
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
                                                                <Flex vertical gap={4}>
                                                                    <FieldLabel>
                                                                        Pickup City
                                                                    </FieldLabel>
                                                                    <Select
                                                                        className="w-full"
                                                                        size="large"
                                                                        placeholder="Select city"
                                                                        options={CITIES}
                                                                        value={selfDriveCity}
                                                                        onChange={setSelfDriveCity}
                                                                    />
                                                                </Flex>
                                                            </Col>
                                                            <Col xs={24} sm={12} md={8}>
                                                                <Flex vertical gap={4}>
                                                                    <FieldLabel>
                                                                        Pickup Date
                                                                    </FieldLabel>
                                                                    <DatePicker
                                                                        className="w-full"
                                                                        size="large"
                                                                        placeholder="Select date"
                                                                    />
                                                                </Flex>
                                                            </Col>
                                                            <Col xs={24} sm={12} md={8}>
                                                                <Flex vertical gap={4}>
                                                                    <FieldLabel>
                                                                        Return Date
                                                                    </FieldLabel>
                                                                    <DatePicker
                                                                        className="w-full"
                                                                        size="large"
                                                                        placeholder="Select date"
                                                                    />
                                                                </Flex>
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
                                                    <Select
                                                        className="w-full"
                                                        size="large"
                                                        placeholder="Select type"
                                                        options={VEHICLE_TYPES}
                                                        value={twoWheelerVehicle}
                                                        onChange={setTwoWheelerVehicle}
                                                    />
                                                </Flex>
                                            </Col>
                                            <Col xs={24} sm={12} md={6}>
                                                <Flex vertical gap={4}>
                                                    <FieldLabel>Pickup City</FieldLabel>
                                                    <Select
                                                        className="w-full"
                                                        size="large"
                                                        placeholder="Select city"
                                                        options={CITIES}
                                                        value={twoWheelerCity}
                                                        onChange={setTwoWheelerCity}
                                                    />
                                                </Flex>
                                            </Col>
                                            <Col xs={24} sm={12} md={6}>
                                                <Flex vertical gap={4}>
                                                    <FieldLabel>Pickup Date</FieldLabel>
                                                    <DatePicker
                                                        className="w-full"
                                                        size="large"
                                                        placeholder="Select date"
                                                    />
                                                </Flex>
                                            </Col>
                                            <Col xs={24} sm={12} md={6}>
                                                <Flex vertical gap={4}>
                                                    <FieldLabel>Return Date</FieldLabel>
                                                    <DatePicker
                                                        className="w-full"
                                                        size="large"
                                                        placeholder="Select date"
                                                    />
                                                </Flex>
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
                                    width: 240,
                                    borderRadius: 12,
                                    boxShadow: CARD_SHADOW,
                                    cursor: 'pointer',
                                }}
                            >
                                <Flex gap={10} align="center">
                                    <img
                                        src={item.img}
                                        alt={item.route}
                                        style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            flexShrink: 0,
                                        }}
                                    />
                                    <Flex vertical gap={4}>
                                        <Typography.Text strong className="text-sm">
                                            {item.route}
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
                                style={{
                                    borderRadius: 12,
                                    boxShadow: CARD_SHADOW,
                                }}
                            >
                                <Flex vertical gap={8}>
                                    <img
                                        src={car.img}
                                        alt={car.name}
                                        style={{
                                            width: '100%',
                                            height: 120,
                                            objectFit: 'cover',
                                            borderRadius: 6,
                                            display: 'block',
                                        }}
                                    />
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
                                    boxShadow: CARD_SHADOW,
                                }}
                            >
                                <Flex vertical gap={8}>
                                    <img
                                        src={car.img}
                                        alt={car.name}
                                        style={{
                                            width: '100%',
                                            height: 120,
                                            objectFit: 'cover',
                                            borderRadius: 6,
                                            display: 'block',
                                        }}
                                    />
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
