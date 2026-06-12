import React from 'react';

import { Flex, Typography } from 'antd';

import CloudComputingPng from '../../../assets/img/cloud_computing.png';
import { TabLayout } from '../../../utils/vpsTabUtils';
import { ACRONIS_PRICE_PER_GB } from '../../../utils/vpsUtils';

const { Title } = Typography;

const STORAGE_FEATURES = [
    'Get lightning-fast NVMe volumes starting from 1 GB to 5000 GB',
    'Seamlessly attach multiple high-speed volumes for expanded data capacity',
    'Scale your NVMe storage independently as your requirements grow',
    'Advanced integration with Acronis Backup for complete data protection',
];

const AdditionalStorageTab: React.FC = () => (
    <TabLayout image={{ src: CloudComputingPng, alt: 'Cloud Computing' }}>
        <div style={{ marginBottom: 16 }}>
            <Title level={5} style={{ marginBottom: 6 }}>
                High-performance NVMe SSD Storage Volumes At{' '}
                <span style={{ color: '#F0655B' }}>₹{ACRONIS_PRICE_PER_GB}/GB/month</span>
            </Title>
            <p style={{ margin: 0, color: '#4B5563', fontSize: 13 }}>
                Get up and running instantly! Our servers are provisioned within a few minutes.
            </p>
        </div>
        <div style={{ marginBottom: 16 }}>
            <Title level={5} style={{ marginBottom: 8 }}>Flexible Volumes</Title>
            <Flex vertical gap={6}>
                {STORAGE_FEATURES.map(item => (
                    <Flex key={item} align="flex-start" gap={8}>
                        <span style={{ color: '#F0655B', fontSize: 16, lineHeight: '20px', flexShrink: 0 }}>•</span>
                        <span style={{ color: '#4B5563', fontSize: 13 }}>{item}</span>
                    </Flex>
                ))}
            </Flex>
        </div>
        <div>
            <Title level={5} style={{ marginBottom: 4 }}>Simplified Billing</Title>
            <p style={{ margin: 0, color: '#4B5563', fontSize: 13 }}>
                Available at a flat fee. No hidden costs for Bandwidth or IOPS performance.
            </p>
        </div>
    </TabLayout>
);

export default AdditionalStorageTab;
