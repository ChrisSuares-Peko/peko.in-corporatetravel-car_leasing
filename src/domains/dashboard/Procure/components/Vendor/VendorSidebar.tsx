import React from 'react';

import { Card, Col, Flex, Typography } from 'antd';

import newRFQImage from '@src/domains/dashboard/Procure/assets/images/newRFQImage.svg';

const { Title, Text } = Typography;

const VENDOR_TIPS = [
    "Use the exact name on the vendor's trade license.",
    'IBAN format for UAE: AE + 2 digits + 19 digits.',
    'Bank details entered here will auto-fill when creating a payout.',
];

const VENDOR_STEPS = [
    'Vendor is added to your directory.',
    'Select them when creating RFQs or POs.',
    'Bank details flow into the Vendor Payouts service automatically.',
];

const VendorSidebar: React.FC = () => (
    <Col xs={24} lg={8}>
        <Card className="mb-4 rounded-2xl" styles={{ body: { padding: 24 } }}>
            <Card
                className="mb-4 rounded-xl !bg-[#FAF9F6] !border-0"
                styles={{ body: { padding: '20px 16px', display: 'flex', justifyContent: 'center' } }}
            >
                <img src={newRFQImage} alt="tips" style={{ width: 160, opacity: 0.9 }} />
            </Card>

            <Text className="text-lg font-semibold mb-10">Tips</Text>
            <Flex vertical gap={8} className="mb-2">
                {VENDOR_TIPS.map((tip, i) => (
                    <Flex key={i} gap={8} align="flex-start">
                        <span className="shrink-0 w-2 h-2 rounded-full mt-1.5 block" style={{ background: '#ff4d4f' }} />
                        <Text className="text-sm text-gray-600">{tip}</Text>
                    </Flex>
                ))}
            </Flex>
        </Card>

        <Card className="rounded-2xl" styles={{ body: { padding: 24 } }}>
            <Title level={5} className="!mb-4">What happens next?</Title>
            <Flex vertical gap={10}>
                {VENDOR_STEPS.map((step, i) => (
                    <Card
                        key={i}
                        size="small"
                        className="rounded-xl !bg-[#FAF9F6] !border-0"
                        styles={{ body: { padding: '14px 16px' } }}
                    >
                        <Flex gap={16} align="center">
                            <Flex
                                align="center"
                                justify="center"
                                className="shrink-0 w-8 h-8 rounded-full bg-white border border-[#f0f0f0]"
                                style={{ fontWeight: 600, fontSize: 13, color: '#262626' }}
                            >
                                {i + 1}
                            </Flex>
                            <Text className="text-xs" style={{ color: '#595959' }}>{step}</Text>
                        </Flex>
                    </Card>
                ))}
            </Flex>
        </Card>
    </Col>
);

export default VendorSidebar;
