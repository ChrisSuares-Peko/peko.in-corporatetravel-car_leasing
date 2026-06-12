import React from 'react';

import { Flex, Typography } from 'antd';

const { Text } = Typography;

interface Props {
    icon: string;
    bg: string;
    title: string;
    subtitle: string;
}

const VendorSectionHeader: React.FC<Props> = ({ icon, bg, title, subtitle }) => (
    <Flex gap={10} align="center" className="mb-4">
        <Flex
            align="center"
            justify="center"
            className="shrink-0 w-8 h-8 rounded-lg border"
            style={{ background: bg, borderColor: bg }}
        >
            <img src={icon} alt={title} style={{ width: 30, height: 30 }} />
        </Flex>
        <Flex vertical gap={1}>
            <Text strong className="text-sm block">{title}</Text>
            <Text className="text-xs text-gray-400">{subtitle}</Text>
        </Flex>
    </Flex>
);

export default VendorSectionHeader;
