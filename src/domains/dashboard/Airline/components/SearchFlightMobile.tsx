import React, { useCallback, useEffect, useState } from 'react';

import { Button, Col, Flex, Grid, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@src/hooks/store';
import { paths } from '@src/routes/paths';

import SearchCardMobile from './adaptive/SearchCardMobile';
import PassengerSelectModal from './PassengerSelectModalMobile';
import SearchCardDesktop from './SearchCardDesktop';
import useHandleAirlineSearch from '../hooks/useHandleAirlineSearch';
import { resetFormState } from '../slices/airlineSlice';
import { ITripData } from '../types/airlineTypes';

const { useBreakpoint } = Grid;
export default function SearchFlight() {
    const navigate = useNavigate();
    const { handleAirlineSearch } = useHandleAirlineSearch();
    const dispatch = useAppDispatch();
    const screens = useBreakpoint();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [tripType, setTripType] = useState<number>(1);
    const [tripData, setTripData] = useState<ITripData>({
        tripType,
        fromLocation: '',
        toLocation: '',
        depart: '',
        departDay: '',
        arrive: '',
        arriveDay: '',
        fromLocation1: 'DEL',
        toLocation1: 'BLR',
        depart1: dayjs().format('DD MM YYYY'),
        departDay1: dayjs().format('dddd'),
        arrive1: '',
        arriveDay1: '',
        adults: 1,
        children: 0,
        infants: 0,
        class: 2,
        originCountryCode: 'IN',
        destinationCountryCode: 'IN',
    });
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        dispatch(resetFormState());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (tripType === 3 && tripData.toLocation1) {
            setTripData((prevTripData: ITripData) => ({
                ...prevTripData,
                fromLocation: tripData.toLocation1,
            }));
        }
    }, [tripData.toLocation1, tripType]);

    useEffect(() => {
        if (tripType === 3) {
            const firstDepartDate = tripData.depart1 || dayjs().format('DD MM YYYY');
            try {
                const firstDate = dayjs(firstDepartDate, 'DD MM YYYY');
                const secondDate = firstDate.add(1, 'day');
                const secondDateStr = secondDate.format('DD MM YYYY');
                const secondDayStr = secondDate.format('dddd');
                
                if (tripData.depart !== secondDateStr) {
                    setTripData((prevTripData: ITripData) => ({
                        ...prevTripData,
                        depart: secondDateStr,
                        departDay: secondDayStr,
                    }));
                }
            } catch (error) {
                console.error('Error parsing date:', error);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tripData.depart1, tripType]);

    const handleSearch = () => {
        const search = handleAirlineSearch(tripData);
        if (search.status) {
            navigate(`${paths.airline.index}/${paths.airline.results}`, {
                state: { flightkey: 'searchFlights' },
            });
        }
    };

    const updateTripData = useCallback(
        (key: string, val: string | number) => {
            setTripData((prevTripData: ITripData) => ({
                ...prevTripData,
                [key]: val,
            }));
        },
        [setTripData]
    );
    return (
        <Col className="md:border xs:border-none xs:p-0 md:p-0 ">
            <Flex vertical gap={20} className="my-3">
                <Flex justify="center" align="center" className="w-full">
                    <Flex justify="center" align="center" className="w-full">
                        <Flex
                            justify="center"
                            align="center"
                            className="bg-[#F5F5F5] border border-solid rounded-2xl"
                        >
                            <Typography.Text
                                className={`py-2 px-3 xs375:px-4 text-xs xs375:text-sm cursor-pointer ${
                                    tripType === 1
                                        ? 'bg-bgOrange z-20 text-white rounded-3xl'
                                        : 'text-black bg-[#F5F5F5] rounded-l-3xl border-r-0'
                                }`}
                                onClick={() => {
                                    setTripType(1);
                                    updateTripData('tripType', 1);
                                }}
                            >
                                One Way
                            </Typography.Text>

                            <Typography.Text
                                className={`py-2 px-3 xs375:px-4 text-xs xs375:text-sm mx-2 cursor-pointer ${
                                    tripType === 2
                                        ? 'bg-bgOrange z-20 text-white rounded-3xl'
                                        : 'text-black bg-[#F5F5F5] border-l-0 border-r-0'
                                }`}
                                onClick={() => {
                                    setTripType(2);
                                    updateTripData('tripType', 2);
                                }}
                            >
                                Round Trip
                            </Typography.Text>

                            <Typography.Text
                                className={`py-2 px-3 xs375:px-4 text-xs xs375:text-sm cursor-pointer ${
                                    tripType === 3
                                        ? 'bg-bgOrange z-20 text-white rounded-3xl'
                                        : 'text-black bg-[#F5F5F5] rounded-r-3xl border-l-0'
                                }`}
                                onClick={() => {
                                    setTripType(3);
                                    updateTripData('tripType', 3);
                                }}
                            >
                                Multi City
                            </Typography.Text>
                        </Flex>
                    </Flex>
                </Flex>

                {screens.xs &&
                    (tripType === 3 ? (
                        <>
                            <SearchCardMobile
                                defaultFromTo={['DEL', 'BLR']}
                                tripData={tripData}
                                setTripData={setTripData}
                                tripType={tripType}
                                multicity={false}
                                showModal={showModal}
                            />
                            <SearchCardMobile
                                tripData={tripData}
                                setTripData={setTripData}
                                multicity
                                tripType={tripType}
                                showModal={showModal}
                            />
                        </>
                    ) : (
                        <SearchCardMobile
                            defaultFromTo={['DEL', 'BLR']}
                            tripData={tripData}
                            setTripData={setTripData}
                            multicity={false}
                            tripType={tripType}
                            showModal={showModal}
                        />
                    ))}
                {screens.xs === false && (
                    <Row>
                        <Col md={24} xl={19} xxl={20}>
                            <Flex
                                className="xs:hidden sm:flex w-full h-full"
                                justify="end"
                                gap="large"
                                align="start"
                                vertical
                            >
                                {tripType === 3 ? (
                                    <>
                                        <SearchCardDesktop
                                            tripData={tripData}
                                            setTripData={setTripData}
                                            tripType={tripType}
                                            multicity={false}
                                            showModal={showModal}
                                            setTripType={setTripType}
                                        />
                                        <SearchCardDesktop
                                            tripData={tripData}
                                            setTripData={setTripData}
                                            tripType={tripType}
                                            showModal={showModal}
                                            setTripType={setTripType}
                                            multicity
                                        />
                                    </>
                                ) : (
                                    <SearchCardDesktop
                                        multicity={false}
                                        tripData={tripData}
                                        setTripData={setTripData}
                                        tripType={tripType}
                                        showModal={showModal}
                                        setTripType={setTripType}
                                    />
                                )}
                            </Flex>
                        </Col>
                        <Col md={24} xl={5} xxl={4} className="mt-9">
                            <Button
                                onClick={handleSearch}
                                danger
                                className="xxl:w-52 md:w-48 h-14 flex justify-center items-center rounded-md"
                                type="primary"
                                size="middle"
                            >
                                <Typography.Text className="text-white text-base">
                                    Search Flights
                                </Typography.Text>
                            </Button>
                        </Col>
                    </Row>
                )}

                <PassengerSelectModal
                    tripData={tripData}
                    setTripData={setTripData}
                    isModalOpen={isModalOpen}
                    handleCancel={handleCancel}
                />
                <Flex className="w-full px-2">
                    <Button
                        onClick={handleSearch}
                        danger
                        className="w-full h-11 my-auto flex justify-center items-center rounded-xl"
                        type="primary"
                        size="large"
                    >
                        Search Flights
                    </Button>
                </Flex>
            </Flex>
        </Col>
    );
}
