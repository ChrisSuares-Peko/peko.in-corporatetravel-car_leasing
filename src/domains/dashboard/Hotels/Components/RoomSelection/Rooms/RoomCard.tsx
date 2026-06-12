import React from 'react';

import { Typography, Grid, Row, Col, Radio } from 'antd';

import { formatNumberWithLocalString } from '@utils/priceFormat';

const { useBreakpoint } = Grid;

interface Desc {
    index?: number;
    filteredRoomInfo: any[];
    item: any[];
    selected: boolean;
    room: any;
}

const RoomCard = ({ index, filteredRoomInfo, item, selected, room }: Desc) => {
    const { sm } = useBreakpoint();


    return (
        <>
            {item.map((rooms: any, roomIndex: number) => (
                <Row
                    key={roomIndex}
                    gutter={[0, 10]}
                    className={`mt-4 px-3 ${roomIndex === filteredRoomInfo.length - 1 ? 'mb-3' : ''}`}
                >
                    <Col span={24} sm={17} md={20}>
                        <div className="flex flex-col w-full gap-5">
                            <Typography.Text className="text-lg font-medium">
                                {rooms
                                    .replace(/,([^ ])/g, ', $1')
                                    .replace(/([a-z])([A-Z])/g, '$1 $2')}
                            </Typography.Text>
                            <div className="flex flex-wrap gap-5">
                                <Typography.Text className="text-sm text-red-500">
                                    {/* {room.roomRate.rates[0]?.name === 'DailyRate' ? 'Day wise rate' : ''} */}
                                    {(room.Inclusion ?? '').replace(/,([^ ])/g, ', $1').toLowerCase().replace(/(?:^|\s|-)\S/g, (c: string) => c.toUpperCase())}
                                </Typography.Text>
                                <Typography.Text
                                    className={
                                        room.ratePlan?.availableStatus === 'Available'
                                            ? 'text-green-500 text-sm'
                                            : 'text-red-500 text-sm'
                                    }
                                >
                                    {/* {room.ratePlan?.availableStatus} */}
                                </Typography.Text>
                                <Typography.Text className="text-bgOrange2">
                                  
                                    {room.IsRefundable ? 'Refundable' : 'Non Refundable'}
                                </Typography.Text>
                            </div>
                        </div>
                      
                    </Col>
                    {sm ? (
                        <Col span={24} sm={7} md={4} className="flex justify-end">
                            {roomIndex === 0 ? ( // Conditionally render only for the first item
                                <Typography.Text className="text-lg font-medium">
                                    ₹ {formatNumberWithLocalString(room.TotalFare)}
                                </Typography.Text>
                            ) : null}
                        </Col>
                    ) : (
                        <Col span={24} sm={7} md={4} className="flex justify-start">
                            {roomIndex === 0 ? ( // Conditionally render only for the first item
                                <Typography.Text className="text-lg font-medium">
                                    ₹ {formatNumberWithLocalString(room.TotalFare)}
                                </Typography.Text>
                            ) : null}
                        </Col>
                    )}
                </Row>
            ))}
            <div className="flex justify-end  md:-mt-0 mr-4">
                <Radio value={room.BookingCode}>
                    <Typography.Text className="md:text-sm xs:text-xs">
                        Select this room
                    </Typography.Text>
                </Radio>
            </div>
       
        </>
    );
};

export default RoomCard;
