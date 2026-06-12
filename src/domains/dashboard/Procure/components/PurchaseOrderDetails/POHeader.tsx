import React from 'react';

import { Button, Flex, Tag, Typography } from 'antd';

import { type ESignStatus, type POStatus } from '../../utils/data';

const { Title, Text } = Typography;

type Props = {
    poRef:  string;
    vendor: string;
    status: POStatus;
    eSign:  ESignStatus;
};

const POHeader: React.FC<Props> = ({ poRef, vendor, status, eSign: _eSign }) => (
    <Flex justify="space-between" align="flex-start" className="mb-4">
        <Flex vertical gap={2}>
            <Title level={4} className="!mb-0">{poRef}</Title>
            <Text className="text-xs text-gray-400">{vendor}</Text>
        </Flex>
        <Flex gap={8} align="center" wrap="wrap">
            <Tag style={{ color: '#43B75D', background: '#ECFDF5', border: 'none', borderRadius: 6, fontWeight: 500 }}>
                {status}
            </Tag>
            <Button size="small" style={{ borderRadius: 6, borderColor: '#fa8c16', color: '#fa8c16' }}>
                Mark In progress
            </Button>
            <Button size="small" style={{ borderRadius: 6 }}>More</Button>
        </Flex>
    </Flex>
);

export default POHeader;
