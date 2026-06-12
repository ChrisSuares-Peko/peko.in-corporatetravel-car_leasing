import React from 'react';

import { Flex, Typography } from 'antd';
import { ReactSVG } from 'react-svg';

import AirlineSm from '../assets/icons/AirlineSm.svg';
import hotelsSm from '../assets/icons/hotelsSm.svg';
import TravelESimSm from '../assets/icons/TravelESimSm.svg';

type Props = {
    selectedType: string;
    handleChange: (key: string) => void;
};

const CorporateTravelCard = ({ handleChange, selectedType }: Props) => (
    <Flex justify="space-between" className="mt-5" gap={8}>
        <Flex
            vertical
            className={`rounded-2xl border-solid border ${selectedType === '1' && ' border-b-2 border-b-brandColor'} py-3 px-5 gap-2.5`}
            justify="center"
            align="center"
            onClick={() => handleChange('1')}
        >
            <ReactSVG
                src={AirlineSm}
                beforeInjection={svg => {
                    svg.classList.add('svg-class-name');
                    svg.setAttribute('style', 'width: 35px');
                    svg.setAttribute('style', 'height: 35px');
                }}
            />
            <Typography.Text className="text-xs text-center">Air Ticket</Typography.Text>
        </Flex>
        <Flex
            vertical
            className={`rounded-2xl border-solid border ${selectedType === '2' && ' border-b-2 border-b-brandColor'} py-3 px-5 gap-2.5`}
            justify="center"
            align="center"
            onClick={() => handleChange('2')}
        >
            <ReactSVG
                src={hotelsSm}
                beforeInjection={svg => {
                    svg.classList.add('svg-class-name');
                    svg.setAttribute('style', 'width: 35px');
                    svg.setAttribute('style', 'height: 35px');
                }}
            />
            <Typography.Text className="text-xs text-center">Hotel Booking</Typography.Text>
        </Flex>
        <Flex
            vertical
            className={`rounded-2xl border-solid border ${selectedType === '3' && ' border-b-2 border-b-brandColor'} py-3 px-5 gap-2.5`}
            justify="center"
            align="center"
            onClick={() => handleChange('3')}
        >
            <ReactSVG
                src={TravelESimSm}
                beforeInjection={svg => {
                    svg.classList.add('svg-class-name');
                    svg.setAttribute('style', 'width: 35px');
                    svg.setAttribute('style', 'height: 35px');
                }}
            />
            <Typography.Text className="text-xs text-center">Travel eSIM</Typography.Text>
        </Flex>
    </Flex>
);

export default CorporateTravelCard;
