import React from 'react';

import { Col, Divider, Flex, Image, Row, Typography } from 'antd';

import RenewalCards from './RenewalCards';
import car from '../../assets/car.png';
import { renewalCardsData } from '../../utils/data';

const VehicleCard = () => {
    const vehicleDetails = [
        { label: 'Vehicle No.', value: 'KL 39 G 9990' },
        { label: 'Make & Model', value: 'Toyota Innova 2 5 Gx' },
        { label: 'Class', value: 'Private Service Vehicle' },
        { label: 'Body Type', value: 'Truck' },
        { label: 'Fuel Type', value: 'Diesel' },
        { label: 'Color', value: 'Gray' },
    ];

    const registrationAndTaxDetails = [
        { label: 'Registration Date', value: '02.10.2030' },
        { label: 'Expiry Date', value: '02.10.2030' },
        { label: 'Tax Validity', value: '02.10.2030' },
        { label: 'Vehicle Age', value: '10.7 Year' },
        { label: 'Owner Count', value: '2' },
    ];

    return (
        <Row gutter={[30, 10]} className="mt-5">
            <Col
                xs={24}
                xl={8}
                className=" px-10 rounded-xl"
                // style={{ background: '#FBFBFB' }}
            >
                <Flex
                    justify="center"
                    align="center"
                    className="px-5 rounded-xl"
                    style={{ height: '100%', minHeight: '200px', background: '#FBFBFB' }} // set a height to center vertically
                >
                    <Image src={car} preview={false} />
                </Flex>
            </Col>

            <Col xs={24} xl={16}>
                <Row gutter={[10, 10]}>
                    {renewalCardsData.map(item => (
                        <Col xs={24} md={6}>
                            <RenewalCards
                                icon={item.icon}
                                title={item.title}
                                renewalDate={item.renewalDate}
                                bgColor={item.bgColor}
                            />
                        </Col>
                    ))}
                    <>
                        <Typography.Text type="secondary" className="px-2 mt-2 text-xs">
                            Vehicle Overview
                        </Typography.Text>
                        <Flex justify="space-between" className="w-full px-2">
                            {vehicleDetails.map((item, index) => (
                                <Flex key={index} vertical>
                                    <Typography.Text className="font-medium">
                                        {item.value}
                                    </Typography.Text>
                                    <Typography.Text type="secondary" className="text-xs">
                                        {item.label}
                                    </Typography.Text>
                                </Flex>
                            ))}
                        </Flex>
                        <Divider />
                        <Typography.Text type="secondary" className="px-2 text-xs">
                            Registration & Tax
                        </Typography.Text>
                        <Flex justify="space-between" className="w-full px-2">
                            {registrationAndTaxDetails.map((item, index) => (
                                <Flex key={index} vertical>
                                    <Typography.Text className="font-medium">
                                        {item.value}
                                    </Typography.Text>
                                    <Typography.Text type="secondary" className="text-xs">
                                        {item.label}
                                    </Typography.Text>
                                </Flex>
                            ))}
                        </Flex>

                        <Flex justify="space-between" className="w-full px-2 mt-2">
                            <Flex vertical>
                                <Typography.Text className="font-medium">
                                    Mini Civil Station, Tripunithura, Ernakulam - 682301
                                </Typography.Text>
                                <Typography.Text type="secondary" className="text-xs">
                                    RTO / Authority{' '}
                                </Typography.Text>
                            </Flex>
                        </Flex>
                    </>
                </Row>
            </Col>
        </Row>
    );
};

export default VehicleCard;
