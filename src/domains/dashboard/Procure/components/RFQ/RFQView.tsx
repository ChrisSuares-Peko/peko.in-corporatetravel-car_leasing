import React, { useState } from 'react';

import { Button, Card, Flex, Tabs, Tag, Typography } from 'antd';
import { useParams } from 'react-router-dom';

import OverviewTab from './OverviewTab';
import ProposalTab from './ProposalTab';
import { rfqData, RFQStatus } from '../../utils/data';

const { Text, Title } = Typography;

const statusColors: Record<RFQStatus, { color: string; bg: string }> = {
    Active: { color: '#52c41a', bg: '#f6ffed' },
    Open:   { color: '#1677ff', bg: '#e6f4ff' },
    Closed: { color: '#8c8c8c', bg: '#f5f5f5' },
};

const RFQView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [activeTab, setActiveTab] = useState('overview');

    const record = rfqData.find(r => String(r.id) === id);

    if (!record) return <Text className="p-8 block text-gray-400">RFQ not found.</Text>;

    const statusCfg = statusColors[record.status as RFQStatus] ?? { color: '#595959', bg: '#f5f5f5' };

    return (
        <Flex vertical gap={0}>
            {/* Header */}
            <Card className="mb-1 shadow-sm rounded-2xl" styles={{ body: { padding: '18px 24px' } }}>
                <Flex justify="space-between" align="center">
                    <Flex vertical gap={2}>
                        <Title level={5} className="!mb-0 !font-semibold">{record.title}</Title>
                        <Text className="text-xs" style={{ color: '#b0b0b0' }}>{record.ref} · {record.type_label}</Text>
                    </Flex>
                    <Flex gap={8} align="center">
                        <Tag style={{ color: statusCfg.color, background: statusCfg.bg, border: 'none', borderRadius: 6, fontWeight: 500 }}>
                            ● {record.status}
                        </Tag>
                        <Button size="small" danger className="rounded-md">Compare Proposal</Button>
                        <Button size="small" danger className="rounded-md">Send reminder</Button>
                    </Flex>
                </Flex>
            </Card>

            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                className="!mb-2"
                items={[
                    { key: 'overview', label: 'Overview' },
                    { key: 'proposal', label: 'Proposal' },
                ]}
            />

            {activeTab === 'overview' && <OverviewTab record={record} />}
            {activeTab === 'proposal' && <ProposalTab proposals={(record as any).proposals ?? []} />}
        </Flex>
    );
};

export default RFQView;
