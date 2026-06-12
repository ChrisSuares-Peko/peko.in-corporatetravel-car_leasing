import React, { useCallback, useEffect, useState } from 'react';

import { Button, Col, Flex, Grid, Radio, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@src/hooks/store';
import { paths } from '@src/routes/paths';
import { showToast } from '@src/slices/apiSlice';

import SearchCardMobile from './adaptive/SearchCardMobile';
import PassengerSelectModal from './PassengerSelectModal';
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
        depart1: '',
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
        if (tripType === 3 && screens.xs && tripData.toLocation) {
            setTripData((prevTripData: ITripData) => ({
                ...prevTripData,
                fromLocation1: tripData.toLocation,
            }));
        }
    }, [tripData.toLocation, tripType, screens.xs]);

    useEffect(() => {
        if (tripType === 3 && !screens.xs && tripData.toLocation1) {
            setTripData((prevTripData: ITripData) => ({
                ...prevTripData,
                fromLocation: tripData.toLocation1,
            }));
        }
    }, [tripData.toLocation1, tripType, screens.xs]);

    useEffect(() => {
        if (tripType === 3 && screens.xs) {
            const firstDepartDate = tripData.depart || dayjs().format('DD MM YYYY');
            try {
                const firstDate = dayjs(firstDepartDate, 'DD MM YYYY');
                const secondDate = firstDate.add(1, 'day');
                const secondDateStr = secondDate.format('DD MM YYYY');
                const secondDayStr = secondDate.format('dddd');
                
                if (tripData.depart1 !== secondDateStr) {
                    setTripData((prevTripData: ITripData) => ({
                        ...prevTripData,
                        depart1: secondDateStr,
                        departDay1: secondDayStr,
                    }));
                }
            } catch (error) {
                console.error('Error parsing date:', error);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tripData.depart, tripType, screens.xs]);

    useEffect(() => {
        if (tripType === 3 && !screens.xs) {
            const firstDepartDate = tripData.depart1;
            if (!firstDepartDate) return;
            
            try {
                let firstDate = dayjs(firstDepartDate, 'DD-MM-YYYY', true);
                if (!firstDate.isValid()) {
                    firstDate = dayjs(firstDepartDate, 'DD MM YYYY', true);
                }
                
                if (firstDate.isValid()) {
                    const secondDate = firstDate.add(1, 'day');
                    const secondDateStr = secondDate.format('DD-MM-YYYY');
                    const secondDayStr = secondDate.format('dddd');
                    
                    if (tripData.depart !== secondDateStr) {
                        setTripData((prevTripData: ITripData) => ({
                            ...prevTripData,
                            depart: secondDateStr,
                            departDay: secondDayStr,
                        }));
                    }
                }
            } catch (error) {
                console.error('Error parsing date:', error);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tripData.depart1, tripType, screens.xs]);

    const handleSearch = () => {
        if (tripType === 2 && !tripData.arrive) {
            dispatch(
                showToast({
                    description: 'Please select return date.',
                    variant: 'error',
                })
            );
            return;
        }
        const search = handleAirlineSearch(tripData);
        if (search.status) {
            navigate(`${paths.airline.index}/${paths.airline.results}`, {
                state: { flightkey: 'searchFlights' },
            });
        }
    };

    const updateTripData = useCallback(
        (key: string, val: string) => {
            setTripData((prevTripData: ITripData) => ({
                ...prevTripData,
                [key]: val,
            }));
        },
        [setTripData]
    );

    return (
        <Col className="md:border xs:border-none xs:p-0 md:p-0 ">
            <Flex vertical gap={25}>
                <Radio.Group
                    onChange={e => {
                        setTripType(e.target.value);
                        updateTripData('tripType', e.target.value);
                    }}
                    buttonStyle="outline"
                    size="large"
                    value={tripType}
                    defaultValue={1}
                    className="ms-2"
                >
                    <Radio
                        defaultChecked
                        value={1}
                        className="xs:text-xs md:text-sm md:font-semibold mt-1 me-4"
                    >
                        One Way
                    </Radio>
                    <Radio value={2} className="xs:text-xs md:text-sm md:font-semibold mt-1 me-4">
                        Round Trip
                    </Radio>
                    <Radio value={3} className="xs:text-xs md:text-sm md:font-semibold mt-1">
                        Multi City
                    </Radio>
                </Radio.Group>
                {screens.xs &&
                    (tripType === 3 ? (
                        <>
                            <SearchCardMobile
                                tripData={tripData}
                                setTripData={setTripData}
                                tripType={tripType}
                                multicity
                                showModal={showModal}
                            />
                            <SearchCardMobile
                                tripData={tripData}
                                setTripData={setTripData}
                                multicity={false}
                                tripType={tripType}
                                showModal={showModal}
                            />
                        </>
                    ) : (
                        <SearchCardMobile
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
                                            defaultFromTo={['DEL', 'BLR']}
                                            tripData={tripData}
                                            setTripData={setTripData}
                                            tripType={tripType}
                                            multicity={false}
                                            showModal={showModal}
                                            setTripType={setTripType}
                                        />
                                        <SearchCardDesktop
                                            defaultFromTo={['', '']}
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
                                        defaultFromTo={['DEL', 'BLR']}
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
                        <Col md={24} xl={5} xxl={4} className="mt-9 flex justify-end items-end">
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
                <Button
                    onClick={handleSearch}
                    danger
                    className="w-full sm:hidden sm:w-52 flex justify-center rounded-md"
                    type="primary"
                    size="middle"
                >
                    Search Flights
                </Button>
            </Flex>
        </Col>
    );
}
