import React, { useEffect, useState } from 'react';

import { Flex, Radio, Typography, Image } from 'antd';
import { Content } from 'antd/es/layout/layout';

import roomNotAvailable from '@domains/dashboard/Hotels/Assets/icons/roomNotAvailable.svg';
import { useAppSelector } from '@src/hooks/store';

import RoomCard from './RoomCard';

interface roomDetails {
    filteredRoomInfo: any;
    roomData: any;
    handleRoomSelect: any;
    reset: boolean;
    roomdetails: any;
    selectedBookingCode: any;
}

const Rooms = ({
    filteredRoomInfo,
    roomData,
    handleRoomSelect,
    reset,
    roomdetails,
    selectedBookingCode,
}: roomDetails) => {
    const { hotelsRequest } = useAppSelector(state => state.reducer.hotels);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selected, setSelected] = useState<any>();
    const { rooms } = hotelsRequest;

    const handleSelectionChange = (BookingCode: any, amount: any, room: any, Supplements: any) => {
        let totalSum = 0;

        room.DayRates.forEach((roomArray: any) => {
            roomArray.forEach((value: any) => {
                totalSum += value.BasePrice;
            });
        });

        const taxes = room.TotalTax;
        handleRoomSelect(BookingCode, amount, totalSum, taxes, Supplements);
    };
    useEffect(() => {
        // Set the first room as selected by default when component loads
        if (filteredRoomInfo.length > 0) {
            const firstRoom = filteredRoomInfo[0];

            let totalSum = 0;

            firstRoom.DayRates.forEach((roomArray: any) => {
                roomArray.forEach((value: any) => {
                    totalSum += value.BasePrice;
                });
            });

            const taxes = firstRoom.TotalTax;
            setSelected(firstRoom.BookingCode);
            handleRoomSelect(
                firstRoom.BookingCode,
                firstRoom.TotalFare,
                totalSum,
                taxes,
                firstRoom?.Supplements
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredRoomInfo]);

    useEffect(() => {
        if (reset) {
            setSelected(undefined);
        }
    }, [reset]);

    const totals = rooms.reduce(
        (acc: any, curr: any) => {
            acc.totalAdults += curr.adult;
            acc.totalChildren += curr.child;
            return acc;
        },
        { totalAdults: 0, totalChildren: 0 }
    );

    return (
        <Content
            className={`${filteredRoomInfo[0]?.BookingCode === roomData.BookingCode ? '' : 'pt-5'} w-full`}
        >
            <Content className="bg-gray-200  py-4">
                <Flex justify="space-between" className="px-5">
                    <Typography.Text className="text-xs">
                        Adult - {totals.totalAdults} , Child - {totals.totalChildren} (Total Rooms :{' '}
                        {rooms.length})
                    </Typography.Text>
                </Flex>
            </Content>

            {/* Conditional rendering for 'Rooms Not Available' */}
            {filteredRoomInfo.length === 0 && (
                <Flex className="max-h-80 mt-10 items-center justify-center">
                    <Image className="mt-1" src={roomNotAvailable} preview={false} />
                </Flex>
            )}

            <div>
                <Radio.Group
                    name="radiogroup"
                    className="w-full"
                    value={selectedBookingCode}
                    size="small"
                    onChange={e =>
                        handleSelectionChange(
                            roomData.BookingCode,
                            roomData.TotalFare,
                            roomData,
                            roomData?.Supplements
                        )
                    }
                >
                    {/* {roomdetails.map((item: any, index: number) => ( */}
                    <RoomCard
                        selected={selectedBookingCode === roomData.BookingCode}
                        filteredRoomInfo={filteredRoomInfo}
                        item={roomdetails}
                        room={roomData}
                    />

                    {/* ))} */}
                </Radio.Group>
            </div>
        </Content>
    );
};

export default Rooms;
