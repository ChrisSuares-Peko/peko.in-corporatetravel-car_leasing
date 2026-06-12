import { useEffect } from 'react';

import { Button, Card, Flex, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import CorporateTravelCard from '@components/molecular/corporate-travel-card/CorporateTravelCard';
import Bookingfields from '@src/domains/dashboard/Hotels/Components/HotelSearch/Bookingfields';
import BookingfieldsMobile from '@src/domains/dashboard/Hotels/Components/HotelSearch/BookingFieldsMobile';
import { useAppSelector, useAppDispatch } from '@src/hooks/store';
import useScreenSize from '@src/hooks/useScreenSize';
import { updateActiveTab } from '@src/slices/activeTabSlice';

import SearchFlight from '../../Airline/components/SearchFlight';
import SearchFlightMobile from '../../Airline/components/SearchFlightMobile';
import Redirect from '../../esim/components/home/Redirect';
import SearchEsim from '../../esim/components/home/SearchEsim';
import CorporateTravelCardSm from '../components/CorporateTravelCard';
import { links } from '../utils/data';

const CorporateTravel = () => {
    const dispatch = useAppDispatch();
    const { sm, xs } = useScreenSize();
    const location = useLocation();
    const navigate = useNavigate();
    const { corporateTravelActiveTab = '1' } = useAppSelector(state => state.reducer.activeTab);
    const [searchParams] = useSearchParams();
    const isHotels = searchParams.get('isHotels') === 'true';

    useEffect(() => {
        if (isHotels) {
            dispatch(updateActiveTab({ key: 'corporateTravelActiveTab', value: '2' }));
            navigate(location.pathname, { replace: true });
        }
    }, [isHotels, dispatch, navigate, location.pathname]);

    
    useEffect(() => {
        const isHotelsCheck = searchParams.get('isHotels');

        if (isHotelsCheck === 'true') {
            dispatch(
                updateActiveTab({
                    key: 'corporateTravelActiveTab',
                    value: '2', // Hotels tab
                })
            );
        }
    }, [dispatch,searchParams]);

    const handleChange = (key: string) => {
        if (location?.state?.initialActiveTab) {
            navigate(location.pathname, { replace: true, state: null });
        }
        dispatch(updateActiveTab({ key: 'corporateTravelActiveTab', value: key }));
    };
  

    const renderContent = (key: string) => {
        switch (key) {
            case '1':
                return xs ? <SearchFlightMobile /> : <SearchFlight />;
            case '2':
                return xs ? <BookingfieldsMobile /> : <Bookingfields />;
            case '3':
                dispatch(updateActiveTab({ key: 'corporateTravelActiveTab', value: '1' }));
                return <Redirect />;
                return <SearchEsim />;
            default:
                return '';
        }
    };
    const defaultSelectedType =
        location?.state?.initialActiveTab || corporateTravelActiveTab || '1';
    return (
        <Content>
            <Flex vertical className="gap-0 sm:gap-2">
                <Typography.Text className="text-xl text-center md:text-start font-medium">
                    Corporate Travel
                </Typography.Text>
                <Typography.Text className="text-sm text-center md:text-start text-gray-500">
                    Business Travel Simplified
                </Typography.Text>
            </Flex>
            <Content className="xs:hidden sm:block">
                <Flex flex="0 0 auto" className="pt-10 xs:flex md:hidden">
                    <Button
                        danger
                        ghost
                        onClick={() =>
                            navigate(links[Number(defaultSelectedType)], {
                                state: { initialActiveTab: '1' },
                            })
                        }
                    >
                        {defaultSelectedType === '3' ? 'Order History' : 'Manage Booking'}
                    </Button>
                </Flex>
                <Flex justify="space-between" className="">
                    <CorporateTravelCard
                        handleChange={handleChange}
                        selectedType={defaultSelectedType}
                    />
                    <Flex flex="0 0 auto" className="pt-10 xs:hidden md:flex">
                        <Button
                            danger
                            ghost
                            onClick={() =>
                                navigate(links[Number(defaultSelectedType)], {
                                    state: { initialActiveTab: '1' },
                                })
                            }
                        >
                            {defaultSelectedType === '3' ? 'Order History' : 'Manage Booking'}
                        </Button>
                    </Flex>
                </Flex>
                <Card
                    className="md:border xs:border-none xs:p-0 md:py-9 rounded-b-2xl md:rounded-tr-2xl"
                    style={{
                        boxShadow: '0px 1.94px 19.398px 0px rgba(0, 0, 0, 0.10)',
                        // borderRadius: '0 1rem 1rem 1rem',
                    }}
                    bodyStyle={sm ? {} : { padding: 8 }}
                >
                    {renderContent(defaultSelectedType)}
                </Card>
            </Content>
            <Content className="sm:hidden block">
                <CorporateTravelCardSm
                    handleChange={handleChange}
                    selectedType={defaultSelectedType}
                />
                <Card
                    className="border rounded-2xl xs:p-0 md:py-9 mt-4"
                    style={{
                        boxShadow: '0px 3.85px 15.38px 0px rgba(0, 0, 0, 0.1)',

                        // borderRadius: '0 1rem 1rem 1rem',
                    }}
                    bodyStyle={sm ? {} : { padding: 8 }}
                >
                    {renderContent(defaultSelectedType)}
                </Card>
                <Flex className="w-full mt-5" justify="end">
                    <Button
                        danger
                        ghost
                        block
                        className="mx-2 mb-4"
                        onClick={() =>
                            navigate(links[Number(defaultSelectedType)], {
                                state: { initialActiveTab: '1' },
                            })
                        }
                    >
                        {defaultSelectedType === '3' ? 'Order History' : 'Manage Booking'}
                    </Button>
                </Flex>
            </Content>
        </Content>
    );
};

export default CorporateTravel;
