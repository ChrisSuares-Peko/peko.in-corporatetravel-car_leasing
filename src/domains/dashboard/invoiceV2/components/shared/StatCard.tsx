import React from 'react';

import { Flex, Typography } from 'antd';
import { ReactSVG } from 'react-svg';

interface Props {
    value: string;
    label: string;
    bgColor: string;
    icon: string;
}

const StatCard: React.FC<Props> = ({ value, label, bgColor, icon }) => (
    <Flex
        vertical
        gap={10}
        className="flex-1 rounded-xl px-5 py-4"
        style={{ backgroundColor: bgColor }}
    >
        <Flex align="center" justify="center" className="w-6 h-6">
            <ReactSVG src={icon} />
        </Flex>
        <Flex vertical gap={2}>
            <Typography.Text className="text-[#1E293B] text-xl font-semibold leading-7">
                {value}
            </Typography.Text>
            <Typography.Text className="text-[#475569] text-sm font-normal leading-5">
                {label}
            </Typography.Text>
        </Flex>
    </Flex>
);

export default React.memo(StatCard);
