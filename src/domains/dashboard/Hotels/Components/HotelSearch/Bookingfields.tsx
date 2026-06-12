/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { Button, Col, DatePicker, Flex, Row, Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import dayjs from 'dayjs';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import location from '@domains/dashboard/Hotels/Assets/icons/locationIcon.svg';
import BookModal from '@src/domains/dashboard/Hotels/Components/GuestInfoModal/Modal';
import '@domains/dashboard/Hotels/styles/home.css';
import { useAppDispatch, useAppSelector } from '@src/hooks/store';
import useDebounce from '@src/hooks/useDebounce';
import { paths } from '@src/routes/paths';
import { showToast } from '@src/slices/apiSlice';

import useDateFields from '../../hooks/useDateField';
import useSearchApi from '../../hooks/useSearchApi';
import useSearchCityApi from '../../hooks/useSearchCityApi';
import useSearchCountryApi from '../../hooks/useSearchCountryApi';
import useTimeConvert from '../../hooks/useTimeConvertHook';
import {
    getHotels,
    resetData,
    resetRoomResponse,
    resetGetHotels,
    resetHotelArr,
    resetNationality,
    resetResidence,
    setSearchKey,
    resetSearchKey,
    resetUserData,
    resetTotalForms,
} from '../../slices/getHotelSlice';
import SelectCity from '../AutoComplete/SelectCity';
import '../../Assets/style.css';
import SelectCountry from '../AutoComplete/SelectCountry';

const Bookingfields = () => {
    const dispatch = useAppDispatch();
    const {
        showModal,

        handleCancel,

        isModalOpen,
    } = useDateFields();

    const { hotelsRequest } = useAppSelector(state => state.reducer.hotels);
    const { rooms } = hotelsRequest;
    const { convertToDateString } = useTimeConvert();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [roomData, setRoomData] = useState([]);

    const [searchText, setSearchText] = useState<string>('');
    const debounceSearchText = useDebounce(searchText, 300);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [nationalityText, setNationalityText] = useState<string>('IN');
    const debounceNationalityText = useDebounce(nationalityText, 300);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [residenceText, setResidenceText] = useState<string>('');
    const debounceResidenceText = useDebounce(residenceText, 300);

    const [selectedCityName, setSelectedCityName] = useState<string | undefined>('144306');
    const [defaultCityName, setDefaultCityName] = useState<string | undefined>(
        'Mumbai, Maharashtra'
    );

    const [selectedCountryName, setSelectedCountryName] = useState<string>('IN');
    const tomorrow = dayjs().add(1, 'day');
    const dayAfterTomorrow = tomorrow.add(1, 'day');
    const [checkInDate, setCheckInDate] = useState<any>(tomorrow);
    const [checkOutDate, setCheckOutDate] = useState<any>(dayAfterTomorrow);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [nationality, selectedNationality] = useState<string>('IN');
  
    const { hotelsList } = useSearchApi();

    const disabledDate = (current: any) => current && current < moment().startOf('day');
    const disabledEndDate = (current: any) =>
        current && current < moment(checkInDate).startOf('day');

    const checkInData = convertToDateString(checkInDate);
    const checkoutData = convertToDateString(checkOutDate);

    const { cityList, cityOptions, isLoading: isCityLoading } = useSearchCityApi();
    const { countryList, countryOptions } = useSearchCountryApi();

    const handleCountrySelect = (value: string) => {
        setSelectedCountryName(value);
        setSelectedCityName('');
        setDefaultCityName('');
        cityList(value);
    };

    const handlecitySelect = (value: string, name: string) => {
        // const [cityName, countryName] = value.split(', ');
        // setSelectedCityName(cityName);
        setSelectedCityName(value);
        setDefaultCityName(name);
    };

    useEffect(() => {
        if (selectedCountryName) {
            cityList(selectedCountryName);
        }
    }, []);


    let totalCount = 0;

    rooms.forEach((count: { adult: number; child: number }) => {
        totalCount += count.adult + count.child;
    });

    const getWeekday = (date: any) => dayjs(date).format('dddd');

    useEffect(() => {
        // cityList(debounceSearchText);
        dispatch(resetGetHotels());
        dispatch(resetSearchKey());
    }, [debounceSearchText, dispatch]);

    useEffect(() => {
        countryList(debounceNationalityText);
    }, [debounceNationalityText, countryList]);

    useEffect(() => {
        countryList(debounceResidenceText);
    }, [debounceResidenceText, countryList]);

    const navigate = useNavigate();

    const handleClick = () => {
        dispatch(resetTotalForms());
        dispatch(resetUserData());
        dispatch(resetNationality());
        dispatch(resetResidence());
        dispatch(resetData());
        dispatch(resetRoomResponse());
        dispatch(resetHotelArr());

        if (selectedCountryName === '' || selectedCountryName === undefined) {
            dispatch(
                showToast({
                    description: 'Location field cannot be empty. Enter a valid location.',
                    variant: 'error',
                })
            );
        } else if (selectedCityName === '' || selectedCityName === undefined) {
            dispatch(
                showToast({
                    description: 'City field cannot be empty. Enter a valid city.',
                    variant: 'error',
                })
            );
        } else if (checkInDate === '') {
            dispatch(
                showToast({
                    description: 'CheckIn date should not be empty',
                    variant: 'error',
                })
            );
        } else if (checkOutDate === '') {
            dispatch(
                showToast({
                    description: 'Checkout date should not be empty',
                    variant: 'error',
                })
            );
        }
     
        else {
            const payload = {
                City: selectedCityName,
                CheckIn: checkInData,
                CheckOut: checkoutData,
                GuestNationality: nationality,
            };
            dispatch(
                getHotels({
                    City: selectedCityName,
                    CheckIn: checkInData,
                    CheckOut: checkoutData,
                    GuestNationality: nationality,
                    country: selectedCountryName,
                    cityName: defaultCityName,
                })
            );
            hotelsList(payload);
            dispatch(setSearchKey('searchHotel'));
            navigate(`${paths.hotels.index}/${paths.hotels.details}`, {
                state: { key: 'searchHotels' },
            });
        }
    };

    return (
        <>
            {/* <style>
                {`
               
               
                :where(.css-dev-only-do-not-override-9hcf67).ant-select-single .ant-select-selector{
                    font-size: 18px !important;
                }
                :where(.css-dev-only-do-not-override-9hcf67).ant-select .ant-select-selection-item {
                    font-weight: 500 !important;
                }
               
                `}
            </style> */}
            <Row className="w-full">
                <Col xs={24} sm={24} md={6} lg={7} className="w-full m-2 py-0">
                    <Flex className="flex-none text-xs text-gray-500 mt-1 ml-3">
                        <ReactSVG src={location} className="" />
                        <Paragraph className="text-xs ml-1 text-gray-500">Country </Paragraph>
                    </Flex>
                    <SelectCountry
                        options={countryOptions}
                        onSelect={handleCountrySelect}
                        searchKey={searchText}
                        setSearchKey={setSearchText}
                        defaultvalue={selectedCountryName}
                        textSize="text-xl"
                        placeholder="Enter Country"
                    />

                    <Flex className="h-2">
                        <Typography.Text className="text-xs text-start text-gray-500 mt-1 ms-3" />
                    </Flex>
                    <Col className="border-b-2 md:ms-3 mt-2 mr-3 md:mr-0" />
                </Col>
                <Col xs={10} sm={10} md={4} lg={4} className="w-full m-2">
                    <Typography.Text className="text-xs text-gray-500 md:ml-4 ml-2 mt-1">
                        Check-in
                    </Typography.Text>
                    <Typography.Title level={4} className="text-sm text-gray-500 py-0 px-0">
                        <DatePicker
                            disabledDate={disabledDate}
                            onChange={(date: any) => {
                                const checkIn = date.format('YYYY-MM-DD');
                                const checkOut = dayjs(checkIn).add(1, 'day').format('YYYY-MM-DD');
                                setCheckInDate(checkIn);
                                setCheckOutDate(checkOut);
                            }}
                            value={dayjs(checkInDate)}
                            style={{ border: 0 }}
                            className="custom_date text-lg md:ml-2 font-bold"
                            format="DD MMM YYYY"
                            suffixIcon={null}
                            size="small"
                            defaultValue={tomorrow}
                            allowClear={false}
                            inputReadOnly
                        />
                    </Typography.Title>
                    <Flex className="h-4 ml-1">
                        <Typography.Text className="text-xs text-gray-500 md:ms-3 ms-1 line-clamp-1">
                            {/* {tomorrow?getWeekday(tomorrow):getWeekday(checkInDate)} */}
                            {checkInDate && getWeekday(checkInDate)}
                        </Typography.Text>
                    </Flex>
                    <Col className="border-b-2 md:ms-3 mt-[10px]" />
                </Col>

                <Col xs={10} sm={10} md={4} lg={4} className="w-full m-2 ">
                    <Typography.Text className="text-xs text-gray-500 ml-4 mt-1">
                        Check-out
                    </Typography.Text>
                    <Typography.Title level={4} className="text-sm text-gray-500 py-0 px-0">
                        <DatePicker
                            disabledDate={disabledEndDate}
                            value={dayjs(checkOutDate)}
                            onChange={(date: any) => setCheckOutDate(date.format('YYYY-MM-DD'))}
                            style={{ border: 0 }}
                            className="custom_date text-lg ml-2 font-bold"
                            format="DD MMM YYYY "
                            suffixIcon={null}
                            size="small"
                            defaultValue={dayAfterTomorrow}
                            allowClear={false}
                            inputReadOnly
                        />
                    </Typography.Title>
                    <Flex className="h-4 ml-1">
                        <Typography.Text className="text-xs text-gray-500 ms-3 line-clamp-1">
                            {checkOutDate && getWeekday(checkOutDate)}
                        </Typography.Text>
                    </Flex>
                    <Col className="border-b-2 ms-3 mt-[10px]" />
                </Col>

                <Col xs={24} sm={24} md={6} lg={7} className="w-full m-2 py-0" onClick={showModal}>
                    <Typography.Text className="text-xs text-gray-500 mx-1 mt-1 md:ml-3 ml-2">
                        Guests
                    </Typography.Text>
                    <Flex className="ml-2">
                        <Typography.Text
                            className=" font-medium md:mx-1 md:ml-1  w-full mt-2"
                            style={{ fontSize: '19px' }}
                        >
                            {rooms.length} {rooms.length === 1 ? 'Room' : 'Rooms'},&nbsp;
                            {totalCount} {totalCount === 1 ? 'Guest' : 'Guests'}
                            <br />
                        </Typography.Text>
                    </Flex>
                    <Flex className="h-1">
                        <Typography.Text className="text-xs text-start text-gray-500  ms-3 " />
                    </Flex>
                    <Col className="border-b-2 md:ms-3 mt-3 mr-3 md:mr-0" />
                </Col>

                {/* <Col xs={24} sm={24} md={4} lg={4} className="w-full m-2 lg:ml-4 ml-0">
                    <Button
                        danger
                        type="primary"
                        className="w-full h-12 font-medium mt-6 text-center px-4 lg:px-6 whitespace-nowrap"
                        onClick={handleClick}
                    >
                        Search Hotels
                    </Button>
                </Col> */}
                <Col xs={24} sm={24} md={7} className="w-full m-2 py-0 ">
                    <Flex className="flex-none text-xs text-gray-500 mt-1 ml-3">
                        <ReactSVG src={location} className="" />
                        <Paragraph className="text-xs ml-1 text-gray-500">City </Paragraph>
                    </Flex>
                    <SelectCity
                        options={cityOptions}
                        onSelect={handlecitySelect}
                        searchKey={searchText}
                        setSearchKey={setSearchText}
                        defaultvalue={defaultCityName}
                        textSize="xs:text-lg md:text-xl"
                        isCityLoading={isCityLoading}
                    />

                    <Flex className="h-2">
                        <Typography.Text className="text-xs text-start text-gray-500 mt-1 ms-3" />
                    </Flex>
                    <Col className="border-b-2 md:ms-3 mt-1 mr-3 md:mr-0" />
                </Col>
                {/* <Col xs={24} sm={24} md={8} className="w-full m-2 py-0 ">
                    <Flex className="flex-none text-xs text-gray-500 mt-1 ml-3">
                        <ReactSVG src={location} className="" />
                        <Paragraph className="text-xs ml-1 text-gray-500">
                            Traveller Nationality{' '}
                        </Paragraph>
                    </Flex>
                  
                    <Input
                        type="text"
                        placeholder="Enter Nationality"
                        value="India"
                        maxLength={20}
                        variant="borderless"
                        className="w-full font-medium text-black h-10 md:ml-1 text-xl"
                        readOnly
                        disabled
                    />

                    <Flex className="h-2">
                        <Typography.Text className="text-xs text-start text-gray-500 mt-1 ms-3" />
                    </Flex>
                    <Col className="border-b-2 md:ms-3 mt-1 mr-3 md:mr-0" />
                </Col> */}

                <Col md={5} xxl={4} className="mt-9">
                    <Button
                        onClick={handleClick}
                        danger
                        className="xxl:w-52 md:w-48 h-12 flex justify-center md:ml-9 items-center rounded-md"
                        type="primary"
                        size="middle"
                    >
                        <Typography.Text className="text-white text-base">
                            Search Hotels
                        </Typography.Text>
                    </Button>
                </Col>
            </Row>
            {/* {
                screens.md?(
                    <></>
                ):(
                    <HotelsSmall/>
                )
            } */}
            {isModalOpen && (
                <BookModal
                    isModalOpen={isModalOpen}
                    handleCancel={handleCancel}
                    setRoomData={setRoomData}
                />
            )}
        </>
    );
};
export default Bookingfields;
