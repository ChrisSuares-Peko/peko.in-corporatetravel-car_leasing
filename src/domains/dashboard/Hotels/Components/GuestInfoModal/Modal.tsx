import React, { useState } from 'react';

import { Button, Col, Divider, Drawer, Flex, Row, Select, Typography } from 'antd';
import { ReactSVG } from 'react-svg';

import useHideWidgetOnDrawer from '@components/molecular/freshChat/hooks/useHideWidgetOnDrawer';
import add from '@domains/dashboard/Hotels/Assets/icons/add.svg';
import RoomCount from '@src/domains/dashboard/Hotels/hooks/useRoomCount';
import { useAppDispatch, useAppSelector } from '@src/hooks/store';

import { addChildAge } from '../../slices/getHotelSlice';
import { roomTypes } from '../../utils/data';

import '../../Assets/style.css';

const { Option } = Select;

interface ModalProps {
    isModalOpen: boolean;
    handleCancel: () => void;
    setRoomData: Function;
}
const BookModal = ({ isModalOpen, handleCancel, setRoomData }: ModalProps) => {
    
    const dispatch = useAppDispatch();

    const { rooms, handleCountChange, roomDelete, handleAddRoom } = RoomCount();

    const [childAges, setChildAges] = useState<any>([]);
   

    setRoomData(rooms);

    const { hotelsRequest } = useAppSelector(state => state.reducer.hotels);

    const handleChildAgeChange = (value: number, childIndex: number, roomIndex: number) => {
        const updatedChildAges = [...childAges];
        updatedChildAges[childIndex] = value;
        setChildAges(updatedChildAges);
        dispatch(addChildAge({ ageIndex: childIndex, childAge: value, roomIndex }));
    };
    useHideWidgetOnDrawer(isModalOpen);
    return (
        <Drawer
            title=""
            className="custom-book-modal-drawer"
            onClose={handleCancel}
            open={isModalOpen}
            width={470}
        >
            {/* {searchkey && <NationalityFields />} */}

            {hotelsRequest.rooms.map((room: any, index: any) => (
                <React.Fragment key={index}>
                    <Flex justify="space-between">
                        <Typography.Text className="font-bold text-lg">
                            Room {index + 1}
                        </Typography.Text>
                        {index !== 0 && (
                            <Typography.Text
                                className="text-bgOrange cursor-pointer"
                                onClick={() => roomDelete(index)}
                            >
                                Delete
                            </Typography.Text>
                        )}
                    </Flex>
                    {roomTypes.map(roomType => (
                        <React.Fragment key={roomType.key}>
                            <Flex justify="space-between" className="py-3">
                                <Flex vertical>
                                    <Typography.Text className=" font-bold">
                                        {roomType.label}
                                    </Typography.Text>
                                    <Typography.Text className=" text-xs">
                                        {roomType.description}
                                    </Typography.Text>
                                </Flex>
                                <Flex className="w-28" justify="space-between">
                                    <Button
                                        disabled={
                                            roomType.key === 'adult'
                                                ? room.adult === 1
                                                : room.child === 0
                                        }
                                        shape="circle"
                                        onClick={() =>
                                            handleCountChange(
                                                roomType.key as 'adult' | 'child',
                                                false,
                                                index
                                            )
                                        }
                                        className="text-xl flex justify-center items-center font-light text-gray-400 p-0 m-0"
                                    >
                                        -
                                    </Button>
                                    <Typography.Text className=" text-sm mt-2">
                                        {(() => {
                                            switch (roomType.key) {
                                                case 'adult':
                                                    return room?.adult;
                                                case 'child':
                                                    return room?.child;

                                                default:
                                                    return null;
                                            }
                                        })()}
                                    </Typography.Text>
                                    <Button
                                        disabled={room.adult + room.child >= 12}
                                        shape="circle"
                                        onClick={() =>
                                            handleCountChange(
                                                roomType.key as 'adult' | 'child',
                                                true,
                                                index
                                            )
                                        }
                                        className="text-xl flex justify-center items-center  font-light text-gray-400"
                                    >
                                        +
                                    </Button>
                                </Flex>
                            </Flex>
                        </React.Fragment>
                    ))}

                    {room.child > 0 && (
                        <Row gutter={[10, 10]}>
                            <Col span={12}>
                                {hotelsRequest.rooms[index].childAge.map(
                                    (val: any, childIndex: any) => (
                                        <Flex vertical>
                                            <Typography.Text className=" font-bold mt-3">
                                                Child {childIndex + 1} Age:
                                            </Typography.Text>
                                            <Select
                                                className="mt-3"
                                                key={childIndex}
                                                style={{ width: 120 }}
                                                placeholder="Select Age"
                                                value={val}
                                                onChange={(value: number) =>
                                                    handleChildAgeChange(value, childIndex, index)
                                                }
                                            >
                                                {[...Array(18)].map((_, age) => (
                                                    <Option key={age} value={age}>
                                                        {age}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Flex>
                                    )
                                )}
                            </Col>
                        </Row>
                    )}
                    <Divider className="text-gray-300" style={{ borderTop: '0.1rem dashed' }} />
                </React.Fragment>
            ))}
            {hotelsRequest.rooms.length < 6 && (
                <Flex className="mt-5" align="middle" justify="center">
                    <ReactSVG
                        src={add}
                        className="fill-bgOrange mt-1 cursor-pointer"
                        onClick={handleAddRoom}
                    />
                    <Typography.Text
                        className="font-bold mt-1 cursor-pointer text-bgOrange ml-1"
                        onClick={handleAddRoom}
                    >
                        Add Another Room
                    </Typography.Text>
                </Flex>
            )}
        </Drawer>
    );
};

export default BookModal;
