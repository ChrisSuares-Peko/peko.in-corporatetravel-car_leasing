import { Col, Flex, Typography } from 'antd';
import { ReactSVG } from 'react-svg';

import useScreenSize from '@src/hooks/useScreenSize';

import FlightSVG from './assets/icons/airplane-card.svg';
import EsimSVG from './assets/icons/esim-card.svg';
import HotelSVG from './assets/icons/hotel-card.svg';

import './assets/style.css';

type Props = {
    selectedType: string;
    handleChange: (key: string) => void;
};

const { Text } = Typography;
const CorporateTravelCard = ({ selectedType, handleChange }: Props) => {
    const { xs } = useScreenSize();

    return (
        <Col
            className="rounded-t-2xl w-fit px-6 m-0 mt-8"
            style={{ boxShadow: '0px 2.248px 18.19px 0px rgba(0, 0, 0, 0.10)' }}
        >
            <Flex
                justify="space-between"
                align="center"
                className="xs:flex-col xs:mx-6 sm:mx-0 sm:flex-row xs:gap-4 sm:gap-4 h-full"
            >
                <Flex className="xs:ms-4 md:ms-0 sm:me-2 pt-2" gap={25}>
                    <Flex
                        className={`flex xs:flex-col md:flex-row cursor-pointer gap-2 items-center py-4 p-2 ${selectedType === '1' && 'border-red-500 border-b-2'}`}
                        onClick={() => handleChange('1')}
                    >
                        <ReactSVG
                            src={FlightSVG}
                            className={`${selectedType === '1' && 'selected-svg'}`}
                        />
                        <Text
                            className={`text-sm font-medium text-center ${selectedType === '1' && 'text-red-500'}`}
                        >
                            Air <br className="sm:hidden" /> Ticket
                        </Text>
                    </Flex>
                    <Flex
                        className={`flex xs:flex-col md:flex-row cursor-pointer justify-between items-center py-4 p-2 w-34 gap-2 ${selectedType === '2' && 'border-red-500 border-b-2'}`}
                        onClick={() => handleChange('2')}
                    >
                        <ReactSVG
                            src={HotelSVG}
                            className={`${selectedType === '2' && 'selected-svg'} mb-2`}
                        />
                        <Text
                            className={`text-sm font-medium text-center ${selectedType === '2' && 'text-red-500'}`}
                        >
                            Hotel Booking
                        </Text>
                    </Flex>
                    <Flex
                        className={`flex xs:flex-col md:flex-row cursor-pointer justify-between items-center py-4 p-2  ${xs ? 'w-32' : ''} gap-2 ${selectedType === '3' && 'border-red-500 border-b-2'}`}
                        onClick={() => handleChange('3')}
                    >
                        <ReactSVG
                            src={EsimSVG}
                            className={`${selectedType === '3' && 'selected-svg'}`}
                        />
                        <Text
                            className={`text-sm font-medium text-center ${selectedType === '3' && 'text-red-500'} `}
                        >
                            Travel <br className="sm:hidden" /> eSIM
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Col>
    );
};
export default CorporateTravelCard;
