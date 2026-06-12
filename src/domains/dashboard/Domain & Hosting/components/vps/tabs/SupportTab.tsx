import React from 'react';

import { Flex, Typography } from 'antd';

import MeetingPng from '../../../assets/img/meeting.png';
import { TabLayout } from '../../../utils/vpsTabUtils';

const { Title } = Typography;

const SUPPORT_ITEMS = [
    'Boot, Login, Investigating Network/Hardware related issues',
    'Initial module installation and basic firewall setup',
    'Setup and re-installation of KVM VPS',
    'Core OS Upgrades & Patches',
    'Reverse DNS Setup',
];

const SupportTab: React.FC = () => (
    <TabLayout image={{ src: MeetingPng, alt: 'Support Team' }}>
        <Title level={5} style={{ marginBottom: 6 }}>
            We are available 24/7 to help you with your queries
        </Title>
        <p style={{ margin: '0 0 12px', color: '#4B5563', fontSize: 13 }}>
            Our servers include semi-managed support related to:
        </p>
        <Flex vertical gap={6}>
            {SUPPORT_ITEMS.map(item => (
                <Flex key={item} align="flex-start" gap={8}>
                    <span style={{ color: '#F0655B', fontSize: 16, lineHeight: '20px', flexShrink: 0 }}>•</span>
                    <span style={{ color: '#4B5563', fontSize: 13 }}>{item}</span>
                </Flex>
            ))}
        </Flex>
    </TabLayout>
);

export default SupportTab;
