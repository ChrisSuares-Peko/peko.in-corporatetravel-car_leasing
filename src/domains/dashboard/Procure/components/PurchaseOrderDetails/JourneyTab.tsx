import React, { useState } from 'react';

import {
    UpOutlined,
    DownOutlined,
} from '@ant-design/icons';
import { Card, Col, Flex, Row, Typography } from 'antd';

import esignInitated from '../../assets/icons/esignInitated.svg';
import poCreated from '../../assets/icons/poCreated.svg';
import poToVendor from '../../assets/icons/poToVendor.svg';
import proposalRecieved from '../../assets/icons/proposalRecieved.svg';
import purchaseRaised from '../../assets/icons/purchaseRaised.svg';
import rfqRaised from '../../assets/icons/rfqRaised.svg';
import signed from '../../assets/icons/signed.svg';
import vendorPayoutTrigg from '../../assets/icons/vendorPayoutTrigg.svg';


const { Text } = Typography;

type JourneyStep = {
    key:         string;
    icon:        React.ReactNode;
    iconBg:      string;
    title:       string;
    description: string;
    date:        string;
    detail?:     React.ReactNode;
};

const DetailCard: React.FC = () => (
    <Card
        className="rounded-lg !border-[#e8e8e8]"
        style={{ background: '#fafafa' }}
        styles={{ body: { padding: '14px 16px' } }}
    >
        <Row gutter={[0, 8]}>
            {[
                { label: 'Requested By:',     value: 'Noura Al Kettle' },
                { label: 'Department:',       value: 'Operations'      },
                { label: 'Estimated Budget:', value: '320,000'         },
                { label: 'Category:',         value: 'Facilities'      },
            ].map(({ label, value }) => (
                <Col key={label} span={24}>
                    <Row>
                        <Col span={5}>
                            <Text style={{ fontSize: 12, color: '#8c8c8c' }}>{label}</Text>
                        </Col>
                        <Col span={6} style={{ textAlign: 'left' }}>
                            <Text style={{ fontSize: 12, fontWeight: 600, color: '#262626' }}>{value}</Text>
                        </Col>
                    </Row>
                </Col>
            ))}
        </Row>
        <Text style={{ fontSize: 12, color: '#ff4d4f', cursor: 'pointer', display: 'block', marginTop: 10 }}>
            View record
        </Text>
    </Card>
);

const steps: JourneyStep[] = [
    {
        key:     '1',
        // icon:    <FileTextOutlined style={{ fontSize: 13, color: '#52c41a' }} />,
        icon:    <img src={purchaseRaised} alt="Purchase Raised" style={{ width: 13, height: 13 }} />,
        iconBg:  '#f6ffed',
        title:   'Purchase request raised',
        description: 'Noura (operations) submitted a purchase request for office furniture for HQ Floor 12.',
        date:    '13 Jan 2024',
        detail:  <DetailCard />,
    },
    {
        key:     '2',
        // icon:    <ReconciliationOutlined style={{ fontSize: 13, color: '#1677ff' }} />,
        icon:    <img src={rfqRaised} alt="RFQ Raised" style={{ width: 13, height: 13 }} />,
        iconBg:  '#e6f4ff',
        title:   'RFQ raised',
        description: 'Noura (operations) submitted a purchase request for office furniture for HQ Floor 12.',
        date:    '13 Jan 2024',
    },
    {
        key:     '3',
        // icon:    <FileDoneOutlined style={{ fontSize: 13, color: '#722ed1' }} />,
        icon:    <img src={proposalRecieved} alt="Proposal Received" style={{ width: 13, height: 13 }} />,
        iconBg:  '#f9f0ff',
        title:   'Proposals received & evaluated',
        description: 'Noura (operations) submitted a purchase request for office furniture for HQ Floor 12.',
        date:    '13 Jan 2024',
    },
    {
        key:     '4',
        // icon:    <ShoppingCartOutlined style={{ fontSize: 13, color: '#fa8c16' }} />,
        icon:    <img src={poCreated} alt="Purchase Order Created" style={{ width: 13, height: 13 }} />,
        iconBg:  '#fff7e6',
        title:   'Purchase order created',
        description: 'Noura (operations) submitted a purchase request for office furniture for HQ Floor 12.',
        date:    '13 Jan 2024',
    },
    {
        key:     '5',
        // icon:    <SendOutlined style={{ fontSize: 13, color: '#13c2c2' }} />,
        icon:    <img src={poToVendor} alt="PO Sent to Vendor" style={{ width: 13, height: 13 }} />,
        iconBg:  '#e6fffb',
        title:   'PO send to vendor',
        description: 'Noura (operations) submitted a purchase request for office furniture for HQ Floor 12.',
        date:    '13 Jan 2024',
    },
    {
        key:     '6',
        // icon:    <EditOutlined style={{ fontSize: 13, color: '#52c41a' }} />,
        icon:    <img src={esignInitated} alt="eSign Initiated" style={{ width: 13, height: 13 }} />,
        iconBg:  '#f6ffed',
        title:   'eSign initiated',
        description: 'Noura (operations) submitted a purchase request for office furniture for HQ Floor 12.',
        date:    '13 Jan 2024',
    },
    {
        key:     '7',
        // icon:    <CheckCircleFilled style={{ fontSize: 13, color: '#52c41a' }} />,
        icon:    <img src={signed} alt="Signed" style={{ width: 13, height: 13 }} />,
        iconBg:  '#f6ffed',
        title:   'Signed by Hessa Al Shami',
        description: 'Noura (operations) submitted a purchase request for office furniture for HQ Floor 12.',
        date:    '13 Jan 2024',
    },
    {
        key:     '8',
        // icon:    <DollarOutlined style={{ fontSize: 13, color: '#fa8c16' }} />,
        icon:    <img src={vendorPayoutTrigg} alt="Vendor Payout Triggered" style={{ width: 13, height: 13 }} />,
        iconBg:  '#fff7e6',
        title:   'Vendor payout triggered',
        description: 'Noura (operations) submitted a purchase request for office furniture for HQ Floor 12.',
        date:    '13 Jan 2024',
    },
    // {
    //     key:     '9',
    //     icon:    <SafetyCertificateOutlined style={{ fontSize: 13, color: '#52c41a' }} />,
    //     iconBg:  '#f6ffed',
    //     title:   'PO closed',
    //     description: 'Noura (operations) submitted a purchase request for office furniture for HQ Floor 12.',
    //     date:    '13 Jan 2024',
    // },
];

const JourneyTab: React.FC = () => {
    const [expanded, setExpanded] = useState<string>('1');

    return (
        <Flex vertical gap={0}>
            <Text style={{ fontSize: 15, fontWeight: 600, color: '#262626', display: 'block', marginBottom: 16 }}>
                Procurement Journey
            </Text>

            {steps.map((step, idx) => (
                // Step container — position:relative so the dotted line spans full height including expanded detail
                <div key={step.key} style={{ position: 'relative' }}>
                    {/* Dotted vertical line from icon bottom to end of step */}
                    {idx < steps.length - 1 && (
                        <div style={{
                            position: 'absolute',
                            left: 11,
                            top: 38,
                            bottom: 0,
                            borderLeft: '1.5px dashed #d9d9d9',
                        }} />
                    )}

                    {/* Step row */}
                    <Flex
                        justify="space-between"
                        align="flex-start"
                        className="py-3 cursor-pointer"
                        onClick={() => setExpanded(prev => prev === step.key ? '' : step.key)}
                    >
                        <Flex gap={10} align="flex-start">
                            {/* Icon */}
                            <Flex
                                align="center"
                                justify="center"
                                className="shrink-0 w-6 h-6 rounded-md"
                                style={{ background: step.iconBg }}
                            >
                                {step.icon}
                            </Flex>
                            {/* Text */}
                            <Flex vertical gap={1}>
                                <Text style={{ fontSize: 13, fontWeight: 600, color: '#262626' }}>{step.title}</Text>
                                <Text style={{ fontSize: 11, color: '#8c8c8c' }}>{step.description}</Text>
                                <Text style={{ fontSize: 11, color: '#8c8c8c' }}>{step.date}</Text>
                            </Flex>
                        </Flex>
                        {/* Chevron */}
                        {expanded === step.key
                            ? <UpOutlined style={{ fontSize: 11, color: '#8c8c8c', marginTop: 4 }} />
                            : <DownOutlined style={{ fontSize: 11, color: '#8c8c8c', marginTop: 4 }} />
                        }
                    </Flex>

                    {/* Expanded detail */}
                    {expanded === step.key && step.detail && (
                        <div className="mb-3" style={{ paddingLeft: 34 }}>{step.detail}</div>
                    )}
                </div>
            ))}
        </Flex>
    );
};

export default JourneyTab;
