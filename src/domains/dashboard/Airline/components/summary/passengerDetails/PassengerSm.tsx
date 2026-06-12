import type { FC } from 'react';

import { Card, Col, Flex, Typography } from 'antd';

import { Passenger as PassengerType } from '../../../types/slices';

const { Text } = Typography;

interface PassengerProps {
    passenger: PassengerType;
    index: number;
}

const Passenger: FC<PassengerProps> = ({ passenger, index }) => (
        <Col key={index} xs={24}>
            <Card bordered className="border-2 [border-radius:10px] p-4" bodyStyle={{ padding: 0 }}>
                <Flex className="mb-3">
                    <Text strong>{`Passenger ${index + 1}`}</Text>
                </Flex>

                <Flex justify="space-between" className="mt-2">
                    <Flex vertical gap={5} justify="start" className="mr-4">
                        <Text className="text-textGreyColor text-[12px]">Name </Text>
                        <Text strong className="text-[12px]">
                            {`${passenger.Title}. ${passenger.FirstName} ${passenger.LastName}`}
                        </Text>
                        {passenger.PassportNo && (
                            <>
                                <Text className="text-textGreyColor text-[12px]">
                                    Passport Number{' '}
                                </Text>
                                <Text strong className="text-[12px]">
                                    {passenger.PassportNo}
                                </Text>
                            </>
                        )}
                        {passenger.Email && (
                            <>
                                <Text className="text-textGreyColor text-[12px]">Email ID </Text>
                                <Text strong className="text-[12px]">
                                    {passenger.Email}
                                </Text>
                            </>
                        )}
                    </Flex>
                    <Flex vertical gap={5} justify="start">
                        {passenger.DateOfBirth && (
                            <>
                                <Text className="text-textGreyColor text-[12px]">
                                    Date of Birth{' '}
                                </Text>
                                <Text
                                    strong
                                    className="text-[12px]"
                                >{`${passenger.DateOfBirth || 'NA'}`}</Text>
                            </>
                        )}
                        {passenger.PassportExpiry && (
                            <>
                                <Text className="text-textGreyColor text-[12px]">
                                    Passport Expiry
                                </Text>
                                <Text strong className="text-[12px]">
                                    {passenger.PassportExpiry || 'NA'}
                                </Text>
                            </>
                        )}
                        <Text className="text-textGreyColor text-[12px]">Mobile Number</Text>
                        <Text strong className="whitespace-nowrap text-[12px]">
                            {passenger.CellCountryCode} {passenger.ContactNo}
                        </Text>
                    </Flex>
                </Flex>
            </Card>
        </Col>
    );

export default Passenger;
