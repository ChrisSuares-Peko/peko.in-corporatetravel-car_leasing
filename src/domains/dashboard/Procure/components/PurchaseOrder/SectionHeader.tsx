import React from 'react';

import { Flex, Image, Typography } from 'antd';

const { Text } = Typography;

type Props = {
    icon: string;
    title: string;
    subtitle: string;
    action?: React.ReactNode;
};

const SectionHeader: React.FC<Props> = ({ icon, title, subtitle, action }) => (
    <Flex gap={10} align="center" className="mb-4">
        <Flex align="center" justify="center" className="w-7 h-7 bg-red-50 shrink-0 rounded-lg">
            <Image src={icon} alt={title} width={16} height={16} preview={false} />
        </Flex>
        <Flex vertical className="flex-1">
            <Text strong className="text-sm">{title}</Text>
            <Text className="text-xs text-[#000000]">{subtitle}</Text>
        </Flex>
        {action}
    </Flex>
);

export default SectionHeader;
