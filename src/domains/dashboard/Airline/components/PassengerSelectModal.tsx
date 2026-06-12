import React, { useCallback, useEffect, useState } from 'react';

import { Button, Flex, Modal, Radio, Typography } from 'antd';

import useScreenSize from '@src/hooks/useScreenSize';

import { ITripData } from '../types/airlineTypes';

interface ModalProps {
    isModalOpen: boolean;
    handleCancel: () => void;
    tripData: ITripData;
    setTripData: any;
}

const PassengerSelectModal: React.FC<ModalProps> = ({
    isModalOpen,
    handleCancel,
    tripData,
    setTripData,
}) => {
    const { md } = useScreenSize();
    const [tempTripData, setTempTripData] = useState<any>({ ...tripData });

    useEffect(() => {
        if (isModalOpen) {
            setTempTripData({ ...tripData });
        }
    }, [isModalOpen, tripData]);

    const updateTripData = useCallback(
        (key: string, val: number) => {
            if (
                tempTripData.adults + tempTripData.children + tempTripData.infants === 9 &&
                val >= Number(tempTripData[key])
            )
                return;

            if (key === 'adults' && val === 0) return;

            setTempTripData((prevTripData: any) => {
                const newValue = {
                    ...prevTripData,
                    [key]: val,
                };
                const { infants } = prevTripData;
                if (infants > newValue.adults) {
                    newValue.infants = newValue.adults;
                }
                return newValue;
            });
        },
        [tempTripData]
    );

    const updateTripClass = useCallback((key: string, val: string) => {
        setTempTripData((prevTripData: object) => ({
            ...prevTripData,
            [key]: val,
        }));
    }, []);

    const handleSubmit = () => {
        setTripData(tempTripData);
        handleCancel();
    };

    return (
        <Modal
            closeIcon={false}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
                <Flex className="w-full" justify="flex-end" gap={10} key="">
                    <Button
                        key="submit"
                        type="primary"
                        danger
                        onClick={handleSubmit}
                        className="rounded-sm"
                    >
                        Submit
                    </Button>

                    <Button key="back" onClick={handleCancel} className="rounded-sm ">
                        Cancel
                    </Button>
                </Flex>,
            ]}
            width={370}
        >
            <Flex vertical gap={20} className="my-5">
                <Flex vertical gap={10}>
                    <Typography.Text className="text-base font-semibold ">
                        Travellers
                    </Typography.Text>
                    <Flex vertical>
            <Flex justify="space-between">
                <Flex vertical>
                     {/* Adults Section */}
                    <Typography.Text className=" font-bold">Adults</Typography.Text>
                    <Typography.Text className=" text-xs">12+ years on travel date</Typography.Text>
                </Flex>
                <Flex className="w-28" justify="space-between" align="flex-start">
                    <Button
                        shape="circle"
                        onClick={() =>
                            updateTripData(
                                'adults',
                                tempTripData.adults > 1 ? tempTripData.adults - 1 : 0
                            )
                        }
                        className="text-xl flex justify-center items-center font-light text-gray-400 p-0 m-0"
                        disabled={tempTripData.adults === 1}
                    >
                        -
                    </Button>

                    <Typography.Text className=" text-sm mt-2">
                        {tempTripData.adults}
                    </Typography.Text>
                    <Button
                        shape="circle"
                        onClick={() => updateTripData('adults', tempTripData.adults + 1)}
                        className="text-xl flex justify-center items-center  font-light text-gray-400"
                    >
                        +
                    </Button>
                </Flex>
            </Flex>
                        {/* Children Section */}

            <Flex className="mt-5" justify="space-between">
                <Flex vertical>
                    <Typography.Text className=" font-bold">Children</Typography.Text>
                    <Typography.Text className=" text-xs">
                        2-12 years on travel date
                    </Typography.Text>
                </Flex>
                <Flex className="w-28" justify="space-between" align="flex-start">
                    <Button
                        shape="circle"
                        onClick={() =>
                            updateTripData(
                                'children',
                                tempTripData.children > 0 ? tempTripData.children - 1 : 0
                            )
                        }
                        className="text-xl flex justify-center items-center font-light text-gray-400 p-0 m-0"
                        disabled={tempTripData.children === 0}
                    >
                        -
                    </Button>
                    <Typography.Text className=" text-sm mt-2">
                        {tempTripData.children}
                    </Typography.Text>
                    <Button
                        shape="circle"
                        onClick={() => updateTripData('children', tempTripData.children + 1)}
                        className="text-xl flex justify-center items-center  font-light text-gray-400"
                    >
                        +
                    </Button>
                </Flex>
            </Flex>
            {/* Infants Section */}
            <Flex className="mt-5" justify="space-between">
                <Flex vertical>
                    <Typography.Text className=" font-bold">Infants</Typography.Text>
                    <Typography.Text className=" text-xs">
                        Below 2 years on travel date
                    </Typography.Text>
                </Flex>
                <Flex className="w-28" justify="space-between" align="flex-start">
                    <Button
                        shape="circle"
                        onClick={() =>
                            updateTripData(
                                'infants',
                                tempTripData.infants > 0 ? tempTripData.infants - 1 : 0
                            )
                        }
                        className="text-xl flex justify-center items-center font-light text-gray-400 p-0 m-0"
                        disabled={tempTripData.infants === 0}
                    >
                        -
                    </Button>
                    <Typography.Text className=" text-sm mt-2">
                        {tempTripData.infants}
                    </Typography.Text>
                    <Button
                        shape="circle"
                        onClick={() => updateTripData('infants', tempTripData.infants + 1)}
                        className="text-xl flex justify-center items-center  font-light text-gray-400"
                        disabled={tempTripData.infants >= tempTripData.adults}
                    >
                        +
                    </Button>
                </Flex>
            </Flex>
            </Flex>
            </Flex>
            {/* <Divider dashed className="border-t-2" /> */}
            <Flex vertical gap={10}>
                    <Typography.Text className="text-base font-semibold  ">Class</Typography.Text>
                    {/* Radio button for class selection */}
                    <Flex>
            <Radio.Group
                onChange={e => updateTripClass('class', e.target.value)}
                className="rounded-none"
                style={{ borderRadius: 0 }}
                value={tempTripData.class}
                size="middle"
            >
                {md ? (
                    <Flex gap={8} wrap='wrap'>
                        <Radio.Button
                    className="rounded-none mr-2 mb-2"
                    style={{ borderRadius: 0 }}
                    value={2}
                >
                    Economy
                </Radio.Button>
                <Radio.Button
                    className="rounded-none mr-2 mb-2"
                    style={{ borderRadius: 0 }}
                    value={4}
                >
                    Business Class
                </Radio.Button>
                <Radio.Button
                    className="rounded-none mr-2 mb-2"
                    style={{ borderRadius: 0 }}
                    value={6}
                >
                    First Class
                </Radio.Button>
                <Radio.Button
                    className="rounded-none mr-2 mb-2"
                    style={{ borderRadius: 0 }}
                    value={3}
                >
                    Premium Economy
                </Radio.Button>
                        </Flex>
                ): (
                    <Flex vertical gap={15}>
                        <Radio value={2}>Economy</Radio>
                        <Radio value={4}>Business Class</Radio>
                        <Radio value={6}>First Class</Radio>
                        <Radio value={3}>Premium Economy</Radio>
                    </Flex>
                )}
                
            </Radio.Group>
            </Flex>
                </Flex>
            </Flex>
        </Modal>
    );
};

export default PassengerSelectModal;
