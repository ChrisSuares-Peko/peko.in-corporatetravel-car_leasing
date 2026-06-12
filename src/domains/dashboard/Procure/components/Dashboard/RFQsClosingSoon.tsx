import React from 'react';

import { Button, Flex, Tag, Typography } from 'antd';

const { Text, Title } = Typography;

const rfqsClosing = [
    { id: 1, title: 'Network Infrastructure Upgrade – Floors 11–13', sub: 'Lead items due to two RFQs', days: 2 },
    { id: 2, title: 'Network Infrastructure Upgrade – Floors 11–13', sub: 'Lead items due to two RFQs', days: 2 },
    { id: 3, title: 'Network Infrastructure Upgrade – Floors 11–13', sub: 'Lead items due to two RFQs', days: 2 },
];

const RFQsClosingSoon: React.FC = () => (
        <div className="rounded-xl p-4 bg-white border border-gray-100">
            <Title level={5} className="!mb-3">RFQs Closing Soon</Title>
            <Flex vertical gap={6}>
                {rfqsClosing.map(rfq => (
                    <Flex key={rfq.id} justify="space-between" align="center" className="py-2 border-b border-gray-50 last:border-0">
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <Text className="text-xs font-semibold block">{rfq.title}</Text>
                            <Text className="text-xs text-gray-400">{rfq.sub}</Text>
                        </div>
                        <Flex align="center" gap={6} className="ml-2 shrink-0">
                            <Tag color="orange" className="!text-xs !m-0 !px-1.5">{rfq.days}d</Tag>
                            <Button size="small">View</Button>
                        </Flex>
                    </Flex>
                ))}
            </Flex>
        </div>
    );

export default RFQsClosingSoon;
