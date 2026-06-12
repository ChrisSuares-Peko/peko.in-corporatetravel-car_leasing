import React from 'react';

import { Flex, Typography } from 'antd';

const { Text, Title } = Typography;

const poStatuses = [
    { label: 'In Progress', pct: 61, color: '#4338ca' },
    { label: 'Sent', pct: 45, color: '#ec4899' },
    { label: 'Acknowledged', pct: 38, color: '#b45309' },
    { label: 'Draft', pct: 25, color: '#f59e0b' },
    { label: 'Completed', pct: 80, color: '#22c55e' },
];

const POStatusBreakdown: React.FC = () => (
    <div className="rounded-xl p-4 bg-white border border-gray-100 h-full">
        <Title level={5} className="!mb-4">PO Status Breakdown</Title>
        <Flex vertical gap={16}className='mt-5'>
            {poStatuses.map(s => (
                <Flex key={s.label} align="center" gap={12}>
                    <Text className="text-xs text-gray-700 w-28 shrink-0">{s.label}</Text>
                    <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                        <div
                            className="h-2.5 rounded-full"
                            style={{ width: `${s.pct}%`, background: s.color }}
                        />
                    </div>
                    <Text className="text-xs text-gray-500 w-8 text-right shrink-0">{s.pct}%</Text>
                </Flex>
            ))}
        </Flex>
    </div>
);

export default POStatusBreakdown;