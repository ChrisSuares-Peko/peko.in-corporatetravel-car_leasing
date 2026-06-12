import type { FC } from 'react';

import { Card, Col, Flex, Typography } from 'antd';

import { Passenger as PassengerType } from '../../../types/slices';

const { Text } = Typography;

interface PassengerProps {
    passenger: PassengerType;
    index: number;
}

const Passenger: FC<PassengerProps> = ({ passenger, index }) => 
    // const {
    //     passengerInfo,
    //     identityDocuments,
    //     contact: { contactsProvided },
    // } = passenger;

     (
        <Col key={index} xs={24} sm={24} md={12} lg={8} xl={8}>
            <Card
                // title={`Passenger ${index + 1}`}
                bordered
                // style={{ background: '#F0F0F0' }}
            >
                <Flex className="mb-3">
                    <Text strong>{`Passenger ${index + 1}`}</Text>
                </Flex>

                <Flex justify="space-between" className="mt-2">
                    <Flex vertical gap={5} justify="start" className="mr-4">
                        <Text className="text-textGreyColor">Name </Text>
                        <Text strong>
                            {`${passenger.Title}. ${passenger.FirstName} ${passenger.LastName}`}
                        </Text>
                        {passenger.PassportNo && (
                            <>
                                <Text className="text-textGreyColor">Passport Number </Text>
                                <Text strong>{passenger.PassportNo}</Text>
                            </>
                        )}
                        {passenger.Email && (
                            <>
                                <Text className="text-textGreyColor">Email ID </Text>
                                <Text strong>{passenger.Email}</Text>
                            </>
                        )}
                    </Flex>
                    <Flex vertical gap={5} justify="start">
                        {passenger.DateOfBirth && (
                            <>
                                <Text className="text-textGreyColor">Date of Birth </Text>
                                <Text strong>{`${passenger.DateOfBirth}`}</Text>
                            </>
                        )}
                        {passenger.PassportExpiry && (
                            <>
                                <Text className="text-textGreyColor">Passport Expiry</Text>
                                <Text strong>{passenger.PassportExpiry}</Text>
                            </>
                        )}
                        {passenger.ContactNo && passenger.CellCountryCode && (
                            <>
                                <Text className="text-textGreyColor">Mobile Number</Text>
                                <Text strong className="whitespace-nowrap">
                                    {passenger.CellCountryCode} {passenger.ContactNo}
                                </Text>
                            </>
                        )}
                    </Flex>
                </Flex>
            </Card>
        </Col>
    )
;

export default Passenger;
