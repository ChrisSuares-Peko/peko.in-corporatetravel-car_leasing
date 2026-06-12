import React, { useCallback, useEffect, useState } from 'react';

import { Col, Flex, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';

import useDebounce from '@src/hooks/useDebounce';

import Autocomplete from './autocomplete/AutoCompleteSelection';
import DatePicker from './DatePicker';
import SwapSVG from '../assets/icons/swap.svg';
import { useGetSearchAirport } from '../hooks/useSearchAirport';
import { ITripData } from '../types/airlineTypes';
import { ISearchData } from '../types/searchAirports';
import { retrieveAirport } from '../utils/airlineData';
import '../assets/style.css';
import { retrieveFlightClass } from '../utils/getFlightClass';

const { Paragraph, Text } = Typography;

interface SearchCardMobileProps {
    showModal: () => void;
    tripData: ITripData;
    setTripData: any;
    tripType: number;
    multicity: boolean;
    setTripType: (trip: number) => void;
    defaultFromTo?: string[];
}

type dateTime = {
    date: string;
    day: string;
};

const SearchCardDesktop: React.FC<SearchCardMobileProps> = ({
    showModal,
    tripData,
    tripType,
    setTripData,
    multicity,
    setTripType,
    defaultFromTo = ['', ''],
}) => {
    const dispatch = useDispatch();

    const [searchKey, setSearchKey] = useState<string>(defaultFromTo[0] || '');
    const [searchKeyTo, setSearchKeyTo] = useState<string>(defaultFromTo[1] || '');

    const [searchData, setSearchData] = useState<ISearchData[]>();
    const [searchDataTo, setSearchDataTo] = useState<ISearchData[]>();

    const debounceSearchText = useDebounce(searchKey, 200);
    const debounceSearchTextTo = useDebounce(searchKeyTo, 200);

    const getInitialDepartureDate = () => {
        if (multicity) {
            if (tripData.depart) {
                let parsed = dayjs(tripData.depart, 'DD-MM-YYYY', true);
                if (!parsed.isValid()) {
                    parsed = dayjs(tripData.depart, 'DD MM YYYY', true);
                }
                return parsed.isValid() ? parsed.format('DD-MM-YYYY') : dayjs().add(1, 'day').format('DD-MM-YYYY');
            }
            if (tripData.depart1) {
                let parsed = dayjs(tripData.depart1, 'DD-MM-YYYY', true);
                if (!parsed.isValid()) {
                    parsed = dayjs(tripData.depart1, 'DD MM YYYY', true);
                }
                return parsed.isValid() ? parsed.add(1, 'day').format('DD-MM-YYYY') : dayjs().add(1, 'day').format('DD-MM-YYYY');
            }
            return dayjs().add(1, 'day').format('DD-MM-YYYY');
        } 
            if (tripData.depart1) {
                let parsed = dayjs(tripData.depart1, 'DD-MM-YYYY', true);
                if (!parsed.isValid()) {
                    parsed = dayjs(tripData.depart1, 'DD MM YYYY', true);
                }
                return parsed.isValid() ? parsed.format('DD-MM-YYYY') : dayjs().add(1, 'day').format('DD-MM-YYYY');
            }
            return dayjs().add(1, 'day').format('DD-MM-YYYY');
        
    };

    const initialDate = getInitialDepartureDate();
    const [departureData, setDepartureData] = useState<dateTime>({
        date: initialDate,
        day: (() => {
            let parsed = dayjs(initialDate, 'DD-MM-YYYY', true);
            if (!parsed.isValid()) {
                parsed = dayjs(initialDate, 'DD MM YYYY', true);
            }
            return parsed.isValid() ? parsed.format('dddd') : dayjs().format('dddd');
        })(),
    });
    const [arrivalData, setArrivalData] = useState<dateTime>({
        date: '',
        day: '',
    });

    const { data } = useGetSearchAirport(debounceSearchText);
    const { data: dataTo } = useGetSearchAirport(debounceSearchTextTo);

    const updateTripData = useCallback(
        (key: string, val: string | number) => {
            setTripData((prevTripData: ITripData) => ({
                ...prevTripData,
                [key]: val,
            }));
        },
        [setTripData]
    );

    const updateTripDetails = (key: string) => (value: string) => {
        setTripData((state: ITripData) => ({
            ...state,
            [key]: value,
        }));
    };

    useEffect(() => {
        // if (tripType === 2) {
        //     const dep = dayjs(departureData.date, 'DD MM YYYY');
        //     const arr = dayjs(arrivalData.date, 'DD MM YYYY');
        //     if (dep.isAfter(arr)) {
        //         dispatch(
        //             showToast({
        //                 description:
        //                     'The return date must be the same as or later than the departure date. Please adjust your itinerary.',
        //                 variant: 'error',
        //             })
        //         );
        //     }
        // }
        updateTripData(`${multicity === true ? 'depart' : 'depart1'}`, departureData.date);
        updateTripData(`${multicity === true ? 'departDay' : 'departDay1'}`, departureData.day);
    }, [departureData, updateTripData, multicity, arrivalData.date, dispatch]);

    useEffect(() => {
        updateTripData('arrive', arrivalData.date);
        updateTripData('arriveDay', arrivalData.day);
    }, [arrivalData, updateTripData]);

    useEffect(() => {
        setSearchData(data);
    }, [data]);
    useEffect(() => {
        setSearchDataTo(dataTo);
    }, [dataTo]);

    // Sync departureData state when tripData changes (for multi-city date sync)
    useEffect(() => {
        const currentDate = multicity ? tripData.depart : tripData.depart1;
        if (currentDate && currentDate !== departureData.date) {
            try {
                // Try parsing with both formats (DD-MM-YYYY from DatePicker or DD MM YYYY)
                let parsedDate = dayjs(currentDate, 'DD-MM-YYYY', true);
                if (!parsedDate.isValid()) {
                    parsedDate = dayjs(currentDate, 'DD MM YYYY', true);
                }
                
                if (parsedDate.isValid()) {
                    // DatePicker expects DD-MM-YYYY format
                    const formattedDate = parsedDate.format('DD-MM-YYYY');
                    setDepartureData({
                        date: formattedDate,
                        day: parsedDate.format('dddd'),
                    });
                }
            } catch (error) {
                console.error('Error parsing date:', error);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [multicity ? tripData.depart : tripData.depart1, multicity]);

    const handleLocationSwap = (index: number) => {
        if (index === 0) {
            const fromLocation = tripData.fromLocation1;
            const toLocation = tripData.toLocation1;
            updateTripData('fromLocation1', toLocation);
            updateTripData('toLocation1', fromLocation);
        }
        if (index === 1) {
            const { fromLocation, toLocation } = tripData;
            updateTripData('fromLocation', toLocation);
            updateTripData('toLocation', fromLocation);
        }
        setSearchData(searchDataTo);
        setSearchDataTo(searchData);
        setSearchKey(searchKeyTo);
        setSearchKeyTo(searchKey);
    };

    const { adults, children, infants } = tripData;
    const passengerCount = adults + children + infants;

    const disabledEndDate = (current: any) => {
        if (!tripData.depart1) return false;
        // Try parsing with both formats
        let parsedDepart1 = moment(tripData.depart1, 'DD-MM-YYYY', true);
        if (!parsedDepart1.isValid()) {
            parsedDepart1 = moment(tripData.depart1, 'DD MM YYYY', true);
        }
        return current && parsedDepart1.isValid() && current < parsedDepart1.startOf('day');
    };

    const disabledStartDate = (current: any) => {
        // if one way don't need to check depart date
        if (tripData.tripType === 1) {
            return current && current < moment().startOf('day');
        }
        if (multicity && tripData.depart1) {
            // Try parsing with both formats
            let minDate = moment(tripData.depart1, 'DD-MM-YYYY', true);
            if (!minDate.isValid()) {
                minDate = moment(tripData.depart1, 'DD MM YYYY', true);
            }
            return current && minDate.isValid() && current < minDate.startOf('day');
        }
        return current && current < moment().startOf('day');
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleOpenChange = () => {
        if (!arrivalData.date) {
            const nextDayOfDeparture = dayjs(departureData.date, 'DD MM YYYY').add(1, 'day'); // Adds one day
            const formattedDate = nextDayOfDeparture.format('DD-MM-YYYY');
            const dayOfWeek = nextDayOfDeparture.format('dddd');
            setArrivalData({
                date: formattedDate,
                day: dayOfWeek,
            });
        }
    };

    useEffect(() => {
        if (tripType) {
            setArrivalData({
                date: '',
                day: '',
            });
        }
    }, [tripType]);

    return (
        <Row className="w-full p-0 m-0" gutter={[10, 10]}>
            <Col md={5} xxl={5} className="w-full pt-4">
                <Paragraph className="flex-none text-sm text-gray-500 ms-3">From</Paragraph>
                <Autocomplete
                    options={searchData}
                    onSelect={updateTripData}
                    searchKey={searchKey}
                    setSearchKey={setSearchKey}
                    tripData={tripData}
                    location={multicity ? 'fromLocation' : 'fromLocation1'}
                    updateTripDetails={updateTripDetails('originCountryCode')}
                />
                <Flex className="h-5">
                    <Typography.Text className="text-xs text-start text-gray-500 mt-1 ms-3 line-clamp-1">
                        {retrieveAirport(tripData[multicity ? 'fromLocation' : 'fromLocation1']) ??
                            ''}
                    </Typography.Text>
                </Flex>
                <Col className="border-b-2 ms-3 mt-[.6rem]" />
            </Col>

            <Col md={1} lg={1} className="w-full">
                <Flex className="w-full h-full mt-2 ms-1" justify="center" align="center">
                    <ReactSVG src={SwapSVG} onClick={() => handleLocationSwap(multicity ? 1 : 0)} />
                </Flex>
            </Col>

            <Col md={5} xxl={4} className="w-full  pt-4">
                <Paragraph className="flex-none text-sm text-gray-500 ms-3">To</Paragraph>
                <Autocomplete
                    options={searchDataTo}
                    onSelect={updateTripData}
                    searchKey={searchKeyTo}
                    setSearchKey={setSearchKeyTo}
                    tripData={tripData}
                    location={multicity ? 'toLocation' : 'toLocation1'}
                    updateTripDetails={updateTripDetails('destinationCountryCode')}
                />
                <Flex className="h-5">
                    <Typography.Text className="text-xs text-start text-gray-500 mt-1 ms-3 line-clamp-1">
                        {retrieveAirport(tripData[multicity ? 'toLocation' : 'toLocation1']) ?? ''}
                    </Typography.Text>
                </Flex>
                <Col className="border-b-2 ms-3 mt-[.6rem]" />
            </Col>

            <Col md={4} xxl={4} className="w-full pt-4">
                <Paragraph className="flex-none text-sm text-gray-500 ms-3 line-clamp-1">
                    Departure Date
                </Paragraph>
                <Typography.Paragraph className="text-2xl font-black">
                    <DatePicker
                        defaultDate={multicity ? tripData.depart : tripData.depart1}
                        disabledDate={disabledStartDate}
                        dateData={setDepartureData}
                        style={{ border: 0 }}
                        defaultPickerValue={(() => {
                            const dateStr = multicity ? tripData.depart : tripData.depart1;
                            if (!dateStr) return dayjs();
                            // Try parsing with both formats
                            let parsed = dayjs(dateStr, 'DD-MM-YYYY', true);
                            if (!parsed.isValid()) {
                                parsed = dayjs(dateStr, 'DD MM YYYY', true);
                            }
                            return parsed.isValid() ? parsed : dayjs();
                        })()}
                    />
                </Typography.Paragraph>
                <Flex className="h-4">
                    <Typography.Text className="text-xs text-gray-500 ms-3 line-clamp-1">
                        {departureData.day !== '' ? departureData.day : ' '}
                    </Typography.Text>
                </Flex>
                <Col className="border-b-2 ms-3 mt-[.6rem]" />
            </Col>
            <Col md={4} xxl={4} className={`w-full pt-4 ${tripType === 3 ? 'hidden' : ''}`}>
                <Paragraph className="flex-none text-sm text-gray-500 ms-3 line-clamp-1">
                    Return Date
                </Paragraph>
                {tripType === 1 ? (
                    <Flex gap={5} vertical>
                        <Typography.Text
                            className="text-lg font-medium text-iconRed cursor-pointer mt-2 line-clamp-1 ms-3"
                            onClick={() => {
                                setTripType(2);
                                updateTripData('tripType', 2);
                            }}
                        >
                            + Add Return
                        </Typography.Text>
                        <Flex className="h-4">
                            <Typography.Text className="text-xs text-gray-500 ms-3">
                                {' '}
                            </Typography.Text>
                        </Flex>
                        <Col className="border-b-2 ms-3" />
                    </Flex>
                ) : (
                    <>
                        <Typography.Paragraph className="text-2xl font-black">
                            <DatePicker
                                disabledData={tripData.tripType === 3}
                                dateData={setArrivalData}
                                defaultDate={arrivalData.date !== '' ? arrivalData.date : ''}
                                style={{ border: 0 }}
                                disabledDate={disabledEndDate}
                                defaultPickerValue={dayjs(tripData.depart1, 'DD-MM-YYYY')}
                                // handleOpenChange={handleOpenChange}
                            />
                        </Typography.Paragraph>
                        <Flex className="h-4">
                            <Typography.Text className="text-xs text-gray-500 ms-3 line-clamp-1">
                                {arrivalData.day !== '' ? arrivalData.day : ' '}
                            </Typography.Text>
                        </Flex>
                        <Col className="border-b-2 ms-3 mt-2" />
                    </>
                )}
            </Col>
            {multicity ? (
                ' '
            ) : (
                <Col md={5} xxl={5} className="w-full pt-5 flex flex-col" onClick={showModal}>
                    <Text className="text-sm text-gray-500 line-clamp-1 ms-3">
                        Travellers & Cabin Class
                    </Text>
                    <Flex className="p-0 m-0 ms-3" justify="start">
                        <Text className="text-valueText font-semibold text-lg line-clamp-1">
                            {tripData.adults + tripData.children + tripData.infants}
                        </Text>
                        <Text className="text-valueText font-semibold text-lg line-clamp-1 ms-1">
                            Passenger{passengerCount > 1 && 's'}
                        </Text>
                    </Flex>
                    <Flex className="h-5">
                        <Text className="text-xs text-gray-500 line-clamp-1 mt-1 ms-3">
                            {retrieveFlightClass(tripData.class)}
                        </Text>
                    </Flex>
                    <Col className="border-b-2 ms-3 mt-[.6rem]" />
                </Col>
            )}
        </Row>
    );
};
export default SearchCardDesktop;
