import React from 'react';

import { Card, Flex, Image, Typography } from 'antd';

import { recentActivityItems } from '../../utils/data';

const { Text, Title } = Typography;

const RecentActivity: React.FC = () => (
        <Card
            className="!rounded-xl h-full !border-gray-100"
            style={{ background: '#F9F9F9' }}
            styles={{ body: { padding: 19 } }}
        >
            <Flex justify="space-between" align="center" className="!mb-4">
                <Title level={5} className="!mb-0">Recent Activity</Title>
                <Text className="text-xs text-iconRed cursor-pointer">View all</Text>
            </Flex>
            <Flex vertical gap={14}>
                {recentActivityItems.map(item => (
                    <Flex key={item.id} gap={10} align="center" className='bg-white p-4 rounded-lg'>
                        <Image
                            src={item.icon}
                            preview={false}
                            width={36}
                            height={36}
                            style={{ objectFit: 'contain' }}
                            wrapperClassName="shrink-0 !rounded-lg flex items-center justify-center"
                        />
                        <Flex vertical style={{ minWidth: 0 }}>
                            <Text className="text-xs text-[#2F2B2A] block leading-4">{item.text}</Text>
                            <Text className="text-xs text-[#000000] mt-0.5 block">{item.date}</Text>
                        </Flex>
                    </Flex>
                ))}
            </Flex>
        </Card>
    );

export default RecentActivity;
