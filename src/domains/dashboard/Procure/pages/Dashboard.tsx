import React from 'react';

import { Col, Flex, Row, Typography } from 'antd';

import Browse from '../components/Dashboard/Browse';
import CreateSomethingNew from '../components/Dashboard/CreateSomethingNew';
import POStatusBreakdown from '../components/Dashboard/POStatusBreakdown';
import RecentActivity from '../components/Dashboard/RecentActivity';
import RFQsClosingSoon from '../components/Dashboard/RFQsClosingSoon';
import SpendByCategory from '../components/Dashboard/SpendByCategory';
import { statCards } from '../utils/data';

const { Text } = Typography;

const Dashboard: React.FC = () => (
    <Flex vertical gap={16}>
<Row justify="space-between" align="middle">
            <Text className="text-2xl font-bold">Procure</Text>
            {/* Future: Add date range picker or filters here */}
        </Row>
        {/* ── Stat Cards ── */}
        <Row gutter={[16, 16]}>
            {statCards.map(card => (
                <Col xs={24} sm={12} md={6} key={card.label}>
                    <div
                        className="rounded-xl p-3"
                        style={{ background: card.bg }}
                    >
                        <Flex justify="space-between" align="center">
                            <div className="text-base">
                                <img src={card.icon} alt={card.label} className="w-8 h-8" />
                            </div>
                            <Text className="text-xs font-medium bg-[#ffffff] p-0.5 rounded-md" style={{ color: card.trendColor }}>
                                {card.trend}
                            </Text>
                        </Flex>
                        <Text className="text-2xl font-bold block mt-1">{card.value}</Text>
                        <Text className="text-xs text-gray-500">{card.label}</Text>
                    </div>
                </Col>
            ))}
        </Row>

        <Row gutter={[16, 16]} align="stretch">

            <Col xs={24} lg={16}>
                <Flex vertical gap={14} style={{ height: '100%' }}>
                    <Browse />
                    <CreateSomethingNew />

                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <SpendByCategory />
                        </Col>
                        <Col xs={24} md={12}>
                            <POStatusBreakdown />
                        </Col>
                    </Row>

                    <RFQsClosingSoon />
                </Flex>
            </Col>

            <Col xs={24} lg={8}>
                <RecentActivity />
            </Col>

        </Row>
    </Flex>
);

export default Dashboard;
