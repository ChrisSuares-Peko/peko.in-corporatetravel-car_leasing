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
    StarFilled,
    TeamOutlined,
} from '@ant-design/icons';

// ─── VehicleImage ────────────────────────────────────────────────────────────

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

// ─── Static data ─────────────────────────────────────────────────────────────

const listings = [
    {
        lid: 1422055815,
        display_product: 'Honda Amaze VX MT 2024',
        display_make: 'Honda', display_model: 'Amaze', display_trim: 'VX MT', year: 2024,
        selling_price: 1502, body_type: 'Sedan', transmission_type: 'Manual',
        fuel_type: 'Petrol', vehicle_segment: 'Value', seating_capacity: 5,
        rental_details: { bags: 4, no_of_airbags: 6 },
        applicable_offering: { rented_for: '4hrs/40kms', booking_type: 'Hourly', additional_charge_per_km: 23 },
        exclusions_services: ['Toll Tax', 'State Tax', 'Parking Charges', 'Driver Tip'],
        inclusions_services: ['Fuel Charges', 'Driver Charges', 'GST'],
        rating_score: 4.7, total_reviews: 85, rentals_kms: 200,
    },
    {
        lid: 1422055816,
        display_product: 'Hyundai Xcent S 1.2 2020',
        display_make: 'Hyundai', display_model: 'Xcent', display_trim: 'S 1.2', year: 2020,
        selling_price: 1502, body_type: 'Sedan', transmission_type: 'Manual',
        fuel_type: 'Petrol', vehicle_segment: 'Value', seating_capacity: 5,
        rental_details: { bags: 4, no_of_airbags: 2 },
        applicable_offering: { rented_for: '4hrs/40kms', booking_type: 'Hourly', additional_charge_per_km: 23 },
        exclusions_services: ['Toll Tax', 'State Tax', 'Parking Charges', 'Driver Tip'],
        inclusions_services: ['Fuel Charges', 'Driver Charges', 'GST'],
        rating_score: 4.7, total_reviews: 13, rentals_kms: 200,
    },
    {
        lid: 1422055827,
        display_product: 'Tata Indigo eCS LS CR4 2018',
        display_make: 'Tata', display_model: 'Indigo eCS', display_trim: 'LS CR4', year: 2018,
        selling_price: 1502, body_type: 'Sedan', transmission_type: 'Manual',
        fuel_type: 'Diesel', vehicle_segment: 'Value', seating_capacity: 5,
        rental_details: { bags: 4, no_of_airbags: 0 },
        applicable_offering: { rented_for: '4hrs/40kms', booking_type: 'Hourly', additional_charge_per_km: 23 },
        exclusions_services: ['Toll Tax', 'State Tax', 'Parking Charges', 'Driver Tip'],
        inclusions_services: ['Fuel Charges', 'Driver Charges', 'GST'],
        rating_score: 4.4, total_reviews: 17, rentals_kms: 200,
    },
    {
        lid: 1422055817,
        display_product: 'Toyota Etios GD SP 2019',
        display_make: 'Toyota', display_model: 'Etios', display_trim: 'GD SP', year: 2019,
        selling_price: 1502, body_type: 'Sedan', transmission_type: 'Manual',
        fuel_type: 'Diesel', vehicle_segment: 'Value', seating_capacity: 5,
        rental_details: { bags: 4, no_of_airbags: 2 },
        applicable_offering: { rented_for: '4hrs/40kms', booking_type: 'Hourly', additional_charge_per_km: 23 },
        exclusions_services: ['Toll Tax', 'State Tax', 'Parking Charges', 'Driver Tip'],
        inclusions_services: ['Fuel Charges', 'Driver Charges', 'GST'],
        rating_score: 4.9, total_reviews: 83, rentals_kms: 200,
    },
    {
        lid: 1422166192,
        display_product: 'Maruti Suzuki Dzire LXi 2023',
        display_make: 'Maruti Suzuki', display_model: 'Dzire', display_trim: 'LXi', year: 2023,
        selling_price: 1571, body_type: 'Sedan', transmission_type: 'Manual',
        fuel_type: 'Petrol', vehicle_segment: 'Value', seating_capacity: 5,
        rental_details: { bags: 4, no_of_airbags: 2 },
        applicable_offering: { rented_for: '4hrs/40kms', booking_type: 'Hourly', additional_charge_per_km: 24 },
        exclusions_services: ['Toll Tax', 'State Tax', 'Parking Charges', 'Driver Tip'],
        inclusions_services: ['Fuel Charges', 'Driver Charges', 'GST'],
        rating_score: 4.2, total_reviews: 22, rentals_kms: 200,
    },
    {
        lid: 1422055818,
        display_product: 'Honda City V i-VTEC 2023',
        display_make: 'Honda', display_model: 'City', display_trim: 'V i-VTEC', year: 2023,
        selling_price: 1744, body_type: 'Sedan', transmission_type: 'Manual',
        fuel_type: 'Petrol', vehicle_segment: 'Mid', seating_capacity: 5,
        rental_details: { bags: 4, no_of_airbags: 2 },
        applicable_offering: { rented_for: '4hrs/40kms', booking_type: 'Hourly', additional_charge_per_km: 31 },
        exclusions_services: ['Toll Tax', 'State Tax', 'Parking Charges', 'Driver Tip'],
        inclusions_services: ['Fuel Charges', 'Driver Charges', 'GST'],
        rating_score: 4.7, total_reviews: 459, rentals_kms: 200,
    },
    {
        lid: 1422055828,
        display_product: 'Mitsubishi Lancer LXi 1.5 2012',
        display_make: 'Mitsubishi', display_model: 'Lancer', display_trim: 'LXi 1.5', year: 2012,
        selling_price: 1744, body_type: 'Sedan', transmission_type: 'Manual',
        fuel_type: 'Petrol', vehicle_segment: 'Value', seating_capacity: 5,
        rental_details: { bags: 4, no_of_airbags: 2 },
        applicable_offering: { rented_for: '4hrs/40kms', booking_type: 'Hourly', additional_charge_per_km: 31 },
        exclusions_services: ['Toll Tax', 'State Tax', 'Parking Charges', 'Driver Tip'],
        inclusions_services: ['Fuel Charges', 'Driver Charges', 'GST'],
        rating_score: 4.8, total_reviews: 5, rentals_kms: 200,
    },
    {
        lid: 1422123784,
        display_product: 'Ford Aspire Trend 1.5 TDCi 2017',
        display_make: 'Ford', display_model: 'Aspire', display_trim: 'Trend 1.5 TDCi', year: 2017,
        selling_price: 2000, body_type: 'Sedan', transmission_type: 'Manual',
        fuel_type: 'Diesel', vehicle_segment: 'Value', seating_capacity: 5,
        rental_details: { bags: 4, no_of_airbags: 7 },
        applicable_offering: { rented_for: '4hrs/40kms', booking_type: 'Hourly', additional_charge_per_km: 27 },
        exclusions_services: ['Toll Tax', 'State Tax', 'Parking Charges', 'Driver Tip'],
        inclusions_services: ['Fuel Charges', 'Driver Charges', 'GST'],
        rating_score: 4.5, total_reviews: 5, rentals_kms: 200,
    },
    {
        lid: 1422123786,
        display_product: 'Ford EcoSport Titanium 1.5 TDCi 2018',
        display_make: 'Ford', display_model: 'EcoSport', display_trim: 'Titanium 1.5 TDCi', year: 2018,
        selling_price: 2000, body_type: 'SUV', transmission_type: 'Manual',
        fuel_type: 'Diesel', vehicle_segment: 'Value', seating_capacity: 5,
        rental_details: { bags: 5, no_of_airbags: 7 },
        applicable_offering: { rented_for: '4hrs/40kms', booking_type: 'Hourly', additional_charge_per_km: 27 },
        exclusions_services: ['Toll Tax', 'State Tax', 'Parking Charges', 'Driver Tip'],
        inclusions_services: ['Fuel Charges', 'Driver Charges', 'GST'],
        rating_score: 4.8, total_reviews: 105, rentals_kms: 200,
    },
    {
        lid: 1422123788,
        display_product: 'Renault Kiger RXT MT 2021',
        display_make: 'Renault', display_model: 'Kiger', display_trim: 'RXT MT', year: 2021,
        selling_price: 2000, body_type: 'SUV', transmission_type: 'Manual',
        fuel_type: 'Petrol', vehicle_segment: 'Value', seating_capacity: 5,
        rental_details: { bags: 5, no_of_airbags: 2 },
        applicable_offering: { rented_for: '4hrs/40kms', booking_type: 'Hourly', additional_charge_per_km: 27 },
        exclusions_services: ['Toll Tax', 'State Tax', 'Parking Charges', 'Driver Tip'],
        inclusions_services: ['Fuel Charges', 'Driver Charges', 'GST'],
        rating_score: 3.1, total_reviews: 1, rentals_kms: 200,
    },
];

const MAKES_AND_MODELS = [
    { name: 'Toyota',        models: ['Innova Crysta', 'Etios', 'Corolla Altis', 'Camry', 'Fortuner', 'Glanza', 'Innova', 'Innova Hycross', 'Urban Cruiser'] },
    { name: 'Maruti Suzuki', models: ['Dzire', 'Brezza', 'Ciaz', 'Ertiga'] },
    { name: 'Hyundai',       models: ['Xcent', 'Creta'] },
    { name: 'Honda',         models: ['Amaze', 'City', 'Accord'] },
    { name: 'Tata',          models: ['Harrier', 'Hexa', 'Indigo eCS', 'Nexon'] },
    { name: 'Ford',          models: ['Aspire', 'EcoSport'] },
    { name: 'MG',            models: ['Astor', 'Hector'] },
    { name: 'Nissan',        models: ['Sunny'] },
    { name: 'Renault',       models: ['Kiger', 'Triber'] },
    { name: 'BMW',           models: ['5 Series'] },
    { name: 'BYD',           models: ['E6'] },
    { name: 'Kia',           models: ['Carens'] },
    { name: 'Mahindra',      models: ['XUV700'] },
    { name: 'Mercedes-Benz', models: ['E-Class'] },
    { name: 'Mitsubishi',    models: ['Lancer'] },
    { name: 'Skoda',         models: ['Rapid'] },
    { name: 'Volkswagen',    models: ['Vento'] },
];

const partPay = (price: number): number => Math.round(price * 0.36);

const BOOKING_TYPE_MAP: Record<string, string> = {
    outstationOneWay:    'one-way',
    outstationRoundTrip: 'round-trip',
    airportTransfer:     'airport',
    localHourly:         'local',
};

// ─── Component ───────────────────────────────────────────────────────────────

const CarRentalsResults = () => {
    const location = useLocation();

    const [selectedFrom] = useState<string>(
        () => new URLSearchParams(location.search).get('fromCity') || ''
    );
    const [selectedTo] = useState<string>(
        () => new URLSearchParams(location.search).get('toCity') || ''
    );

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

    const [bookingTypes, setBookingTypes] = useState<string[]>(() => {
        const bt = new URLSearchParams(location.search).get('bookingType');
        return bt && BOOKING_TYPE_MAP[bt] ? [BOOKING_TYPE_MAP[bt]] : [];
    });

    const [priceRange, setPriceRange] = useState<[number, number]>([1502, 21890]);
    const [selectedModels, setSelectedModels] = useState<Record<string, string[]>>({});
    const [bodyTypes, setBodyTypes] = useState<string[]>([]);
    const [fuelTypes, setFuelTypes] = useState<string[]>([]);
    const [transmissionTypes, setTransmissionTypes] = useState<string[]>([]);
    const [segments, setSegments] = useState<string[]>(['all', 'value', 'mid', 'premium', 'luxury']);

    const [expandedCard, setExpandedCard] = useState<number | null>(null);
    const [paymentOption, setPaymentOption] = useState<'part' | 'full'>('part');

    const navigate = useNavigate();

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

    const renderMakeModelCollapse = (brands: { name: string; models: string[] }[]) => (
        <Collapse
            ghost
            size="small"
            items={brands.map(brand => ({
                key: brand.name,
                label: <Typography.Text className="text-sm">{brand.name}</Typography.Text>,
                children: (
                    <Checkbox.Group
                        value={selectedModels[brand.name] ?? []}
                        onChange={vals =>
                            setSelectedModels(prev => ({ ...prev, [brand.name]: vals as string[] }))
                        }
                    >
                        <Space direction="vertical" style={{ paddingLeft: 8 }}>
                            {brand.models.map(model => (
                                <Checkbox key={model} value={model}>
                                    <Typography.Text className="text-sm">{model}</Typography.Text>
                                </Checkbox>
                            ))}
                        </Space>
                    </Checkbox.Group>
                ),
            }))}
        />
    );

    const filterPanels = [
        {
            key: 'rental-type',
            label: <Typography.Text strong>Rental Type</Typography.Text>,
            children: (
                <Radio.Group value={rentalType} onChange={e => handleRentalTypeChange(e.target.value)}>
                    <Space direction="vertical" className="w-full">
                        <Radio value="daily">Daily Rental</Radio>
                        <Radio value="selfDrive">Self Drive</Radio>
                    </Space>
                </Radio.Group>
            ),
        },
        rentalType === 'daily'
            ? {
                  key: 'booking-type',
                  label: <Typography.Text strong>Booking Type</Typography.Text>,
                  children: (
                      <Checkbox.Group value={bookingTypes} onChange={v => setBookingTypes(v as string[])}>
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
                      <Radio.Group value={vehicleType} onChange={e => handleVehicleTypeChange(e.target.value)}>
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
                        min={1502}
                        max={21890}
                        value={priceRange}
                        onChange={values => setPriceRange(values as [number, number])}
                    />
                </Flex>
            ),
        },
        {
            key: 'make-model',
            label: <Typography.Text strong>Make and Model</Typography.Text>,
            children: renderMakeModelCollapse(MAKES_AND_MODELS),
        },
        {
            key: 'body-type',
            label: <Typography.Text strong>Body Type</Typography.Text>,
            children: (
                <Checkbox.Group value={bodyTypes} onChange={v => setBodyTypes(v as string[])}>
                    <Space direction="vertical" className="w-full">
                        {([
                            { label: 'MUV', count: 7 },
                            { label: 'Sedan', count: 18 },
                            { label: 'SUV', count: 12 },
                            { label: 'Hatchback', count: 1 },
                        ] as { label: string; count: number }[]).map(opt => (
                            <Checkbox key={opt.label} value={opt.label}>
                                <Flex gap={6} align="center">
                                    {opt.label}
                                    <Typography.Text className="text-textGreyLight text-xs">({opt.count})</Typography.Text>
                                </Flex>
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
                <Checkbox.Group value={fuelTypes} onChange={v => setFuelTypes(v as string[])}>
                    <Space direction="vertical" className="w-full">
                        {([
                            { label: 'Diesel', count: 16 },
                            { label: 'Petrol', count: 24 },
                            { label: 'Hybrid', count: 3 },
                            { label: 'Electric', count: 1 },
                        ] as { label: string; count: number }[]).map(opt => (
                            <Checkbox key={opt.label} value={opt.label}>
                                <Flex gap={6} align="center">
                                    {opt.label}
                                    <Typography.Text className="text-textGreyLight text-xs">({opt.count})</Typography.Text>
                                </Flex>
                            </Checkbox>
                        ))}
                    </Space>
                </Checkbox.Group>
            ),
        },
        {
            key: 'transmission',
            label: <Typography.Text strong>Transmission Type</Typography.Text>,
            children: (
                <Checkbox.Group value={transmissionTypes} onChange={v => setTransmissionTypes(v as string[])}>
                    <Space direction="vertical" className="w-full">
                        {([
                            { label: 'Manual', count: 28 },
                            { label: 'Automatic', count: 12 },
                        ] as { label: string; count: number }[]).map(opt => (
                            <Checkbox key={opt.label} value={opt.label}>
                                <Flex gap={6} align="center">
                                    {opt.label}
                                    <Typography.Text className="text-textGreyLight text-xs">({opt.count})</Typography.Text>
                                </Flex>
                            </Checkbox>
                        ))}
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
                        <Typography.Text className="text-lg font-bold leading-6">Filters</Typography.Text>
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
                                <Typography.Text strong>{selectedFrom || 'Origin'}</Typography.Text>
                                {selectedTo && (
                                    <>
                                        <Typography.Text className="text-textGreyLight">→</Typography.Text>
                                        <Typography.Text strong>{selectedTo}</Typography.Text>
                                    </>
                                )}
                                <Divider type="vertical" />
                                <Typography.Text>15 Jun'26</Typography.Text>
                                <Divider type="vertical" />
                                <Typography.Text className="text-textGreyLight text-xs">Tap to add a return</Typography.Text>
                                <Divider type="vertical" />
                                <Typography.Text>04:45 PM</Typography.Text>
                            </Flex>
                            <Button danger ghost>Modify</Button>
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
                        {listings.map((car, i) => (
                            <Card
                                key={car.lid}
                                className="rounded-xl"
                                bodyStyle={{ padding: '16px 20px' }}
                                style={{ boxShadow: '0px 1.94px 19.398px 0px rgba(0, 0, 0, 0.10)' }}
                            >
                                {/* Summary row */}
                                <Row gutter={[16, 16]} align="middle">
                                    <Col xs={24} sm={4}>
                                        <VehicleImage
                                            make={car.display_make}
                                            model={car.display_model}
                                            width={120}
                                            height={80}
                                        />
                                    </Col>

                                    <Col xs={24} sm={14}>
                                        <Flex vertical gap={8}>
                                            <Typography.Text strong>{car.display_product}</Typography.Text>
                                            <Flex gap={16} wrap="wrap">
                                                <Flex gap={4} align="center">
                                                    <ShoppingOutlined />
                                                    <Typography.Text className="text-textGreyLight text-xs">
                                                        {car.rental_details.bags} Bags
                                                    </Typography.Text>
                                                </Flex>
                                                <Flex gap={4} align="center">
                                                    <TeamOutlined />
                                                    <Typography.Text className="text-textGreyLight text-xs">
                                                        {car.seating_capacity} Seats
                                                    </Typography.Text>
                                                </Flex>
                                                <Flex gap={4} align="center">
                                                    <CarOutlined />
                                                    <Typography.Text className="text-textGreyLight text-xs">
                                                        {car.body_type}
                                                    </Typography.Text>
                                                </Flex>
                                                {car.rental_details.no_of_airbags > 0 && (
                                                    <Flex gap={4} align="center">
                                                        <SafetyOutlined />
                                                        <Typography.Text className="text-textGreyLight text-xs">
                                                            {car.rental_details.no_of_airbags} Airbags
                                                        </Typography.Text>
                                                    </Flex>
                                                )}
                                                <Flex gap={4} align="center">
                                                    <StarFilled style={{ color: '#FAAD14', fontSize: 11 }} />
                                                    <Typography.Text className="text-textGreyLight text-xs">
                                                        {car.rating_score} ({car.total_reviews} reviews)
                                                    </Typography.Text>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Col>

                                    <Col xs={24} sm={6}>
                                        <Flex vertical gap={6} align="flex-end">
                                            <Typography.Text strong style={{ fontSize: 18 }}>
                                                ₹{car.selling_price}
                                            </Typography.Text>
                                            <Typography.Text className="text-textGreyLight text-xs">
                                                {car.applicable_offering.rented_for}
                                            </Typography.Text>
                                            <Typography.Text className="text-textGreyLight text-xs">
                                                ₹{car.applicable_offering.additional_charge_per_km}/km beyond limit
                                            </Typography.Text>
                                            <Button type="primary" danger onClick={() => toggleCard(i)}>
                                                {expandedCard === i ? 'Close' : 'View Details'}
                                            </Button>
                                        </Flex>
                                    </Col>
                                </Row>

                                {/* Expandable Detail Panel */}
                                {expandedCard === i && (
                                    <>
                                        <Divider />
                                        <Flex gap={8} wrap="wrap" style={{ marginBottom: 20 }}>
                                            <Tag>{car.body_type}</Tag>
                                            <Tag>{car.seating_capacity} Seats</Tag>
                                            <Tag>{car.transmission_type}</Tag>
                                            <Tag>{car.rental_details.bags} Bags</Tag>
                                        </Flex>

                                        <Row gutter={[24, 24]}>
                                            <Col xs={24} md={12}>
                                                <Flex vertical gap={12}>
                                                    <VehicleImage
                                                        make={car.display_make}
                                                        model={car.display_model}
                                                        width={420}
                                                        height={240}
                                                    />
                                                    <Flex
                                                        justify="space-between"
                                                        align="center"
                                                        gap={8}
                                                        style={{ background: '#f9f9f9', borderRadius: 8, padding: '10px 14px' }}
                                                    >
                                                        <LeftOutlined style={{ color: '#bfbfbf' }} />
                                                        <Flex gap={8} align="center">
                                                            <CheckCircleOutlined style={{ color: '#52c41a', flexShrink: 0 }} />
                                                            <Typography.Text className="text-xs">
                                                                Verified vehicles &amp; 24/7 support to ensure your peace of mind
                                                            </Typography.Text>
                                                        </Flex>
                                                        <RightOutlined style={{ color: '#bfbfbf' }} />
                                                    </Flex>
                                                    <Typography.Text className="text-textGreyLight text-xs">
                                                        Tip is always optional*
                                                    </Typography.Text>
                                                </Flex>
                                            </Col>

                                            <Col xs={24} md={12}>
                                                <Flex vertical gap={16}>
                                                    <Flex vertical gap={4}>
                                                        <Typography.Text strong style={{ fontSize: 16 }}>
                                                            Rental Details
                                                        </Typography.Text>
                                                        <Typography.Text className="text-textGreyLight text-xs">
                                                            DLID: {car.lid}
                                                        </Typography.Text>
                                                    </Flex>

                                                    <Row gutter={[16, 8]}>
                                                        <Col xs={12}>
                                                            <Flex gap={6} align="flex-start">
                                                                <EnvironmentOutlined style={{ color: '#FF4F4F', marginTop: 2 }} />
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
                                                                <EnvironmentOutlined style={{ color: '#FF4F4F', marginTop: 2 }} />
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

                                                    <Row gutter={[16, 8]}>
                                                        <Col xs={12}>
                                                            <Flex vertical gap={8}>
                                                                <Typography.Text strong className="text-sm">
                                                                    Inclusions
                                                                </Typography.Text>
                                                                {car.inclusions_services.map(item => (
                                                                    <Flex gap={6} align="center" key={item}>
                                                                        <CheckCircleOutlined style={{ color: '#52c41a' }} />
                                                                        <Typography.Text className="text-xs">{item}</Typography.Text>
                                                                    </Flex>
                                                                ))}
                                                            </Flex>
                                                        </Col>
                                                        <Col xs={12}>
                                                            <Flex vertical gap={8}>
                                                                <Typography.Text strong className="text-sm">
                                                                    Exclusions
                                                                </Typography.Text>
                                                                {car.exclusions_services.map(item => (
                                                                    <Flex gap={6} align="center" key={item}>
                                                                        <CloseCircleOutlined style={{ color: '#FF4F4F' }} />
                                                                        <Typography.Text className="text-xs">{item}</Typography.Text>
                                                                    </Flex>
                                                                ))}
                                                            </Flex>
                                                        </Col>
                                                    </Row>

                                                    <Divider style={{ margin: '4px 0' }} />

                                                    <Radio.Group
                                                        value={paymentOption}
                                                        onChange={e => setPaymentOption(e.target.value)}
                                                        className="w-full"
                                                    >
                                                        <Space direction="vertical" className="w-full">
                                                            <Flex justify="space-between" align="center">
                                                                <Radio value="part">Part Pay</Radio>
                                                                <Typography.Text strong>
                                                                    ₹{partPay(car.selling_price)}
                                                                </Typography.Text>
                                                            </Flex>
                                                            <Flex justify="space-between" align="center">
                                                                <Radio value="full">Full Pay</Radio>
                                                                <Typography.Text strong>
                                                                    ₹{car.selling_price}
                                                                </Typography.Text>
                                                            </Flex>
                                                        </Space>
                                                    </Radio.Group>

                                                    <Typography.Text className="text-textGreyLight text-xs">
                                                        Additional charges may apply
                                                    </Typography.Text>

                                                    <Button
                                                        type="primary"
                                                        danger
                                                        block
                                                        size="large"
                                                        onClick={() => navigate(`/${paths.dashboard.carRentalsCart}`)}
                                                    >
                                                        Book Now @ ₹{paymentOption === 'part' ? partPay(car.selling_price) : car.selling_price}
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
