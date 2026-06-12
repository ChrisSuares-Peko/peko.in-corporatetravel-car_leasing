import React, { useState } from 'react';

import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Drawer, Row, Select, Space, Typography } from 'antd';

const { Text, Title } = Typography;

interface Invoice {
    key: string;
    invoiceNumber: string;
    customerName: string;
    amount: string;
    dueDate: string;
    invoiceDate: string;
    type: 'Domestic' | 'International';
}

interface PaymentDetailsDrawerProps {
    visible: boolean;
    selectedInvoices: Invoice[];
    onCancel: () => void;
    onProcessPayment: () => void;
}

const accountOptions = [
    { value: 'savings_inr', label: 'Savings Account - INR  •  ₹10,50,000.00', account: 'Savings Account - INR', balance: '₹10,50,000.00' },
    { value: 'current_inr', label: 'Current Account - INR  •  ₹15,50,000.00', account: 'Current Account - INR', balance: '₹15,50,000.00' },
];

const PaymentDetailsDrawer: React.FC<PaymentDetailsDrawerProps> = ({
    visible,
    selectedInvoices,
    onCancel,
    onProcessPayment,
}) => {
    const [selectedAccount, setSelectedAccount] = useState('savings_inr');
    const currentAccount = accountOptions.find(o => o.value === selectedAccount)!;

    return (
    <Drawer
        open={visible}
        onClose={onCancel}
        placement="right"
        width={520}
        closable={false}
        title={
            <Space direction="vertical" size={2}>
                <Title level={4} className="m-0">
                    Add Bill Payout
                </Title>
                <Text type="secondary" style={{ fontSize: 13, fontWeight: 'normal' }}>
                    Fill in the bill details below
                </Text>
            </Space>
        }
        footer={
            <Row justify="end" gutter={12}>
                <Col>
                    <Button onClick={onCancel} style={{ borderRadius: 8 }}>
                        Cancel
                    </Button>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        onClick={onProcessPayment}
                        style={{ borderRadius: 8, background: '#FF4D4F', borderColor: '#FF4D4F' }}
                    >
                        Process Payment <ArrowRightOutlined />
                    </Button>
                </Col>
            </Row>
        }
    >
        <Space direction="vertical" size={20} className="w-full">
            <Space direction="vertical" size={8} className="w-full">
                <Text strong>Select Payment Account</Text>
                <Select
                    value={selectedAccount}
                    onChange={setSelectedAccount}
                    className="w-full"
                    style={{ borderRadius: 8 }}
                    optionLabelProp="label"
                    options={accountOptions}
                    optionRender={option => (
                        <Row justify="space-between">
                            <Col><Text>{option.data.account}</Text></Col>
                            <Col><Text strong>{option.data.balance}</Text></Col>
                        </Row>
                    )}
                />
                <Row
                    justify="space-between"
                    style={{ background: '#f5f5f5', borderRadius: 8, padding: '8px 12px' }}
                >
                    <Col><Text type="secondary" style={{ fontSize: 12 }}>Available Balance</Text></Col>
                    <Col><Text strong style={{ fontSize: 12 }}>{currentAccount.balance}</Text></Col>
                </Row>
            </Space>

            <Space direction="vertical" size={8} className="w-full">
                <Text strong>Payment Mode</Text>
                <Select
                    defaultValue="rtgs"
                    className="w-full"
                    style={{ borderRadius: 8 }}
                    options={[
                        { value: 'rtgs', label: 'RTGS - Real Time Gross Settlement' },
                        { value: 'neft', label: 'NEFT - National Electronic Funds Transfer' },
                        { value: 'imps', label: 'IMPS - Immediate Payment Service' },
                    ]}
                />
            </Space>

            <Space direction="vertical" size={12} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl">
                <Text strong>Payment Details</Text>
                {selectedInvoices.map((invoice, index) => (
                    <Card
                        key={invoice.key}
                        size="small"
                        style={{ borderRadius: 10, border: '1px solid #e5e7eb' }}
                        styles={{ body: { padding: '12px 14px' } }}
                    >
                        <Text strong style={{ fontSize: 13 }}>
                            Bill {index + 1}
                        </Text>
                        <Divider className="my-2" />
                        <Space direction="vertical" size={6} className="w-full">
                            <Row justify="space-between">
                                <Col>
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        Bill
                                    </Text>
                                </Col>
                                <Col>
                                    <Text strong style={{ fontSize: 12 }}>
                                        {invoice.amount}
                                    </Text>
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col>
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        Vendor
                                    </Text>
                                </Col>
                                <Col>
                                    <Text style={{ fontSize: 12 }}>{invoice.customerName}</Text>
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col>
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        Bill Number
                                    </Text>
                                </Col>
                                <Col>
                                    <Text style={{ fontSize: 12 }}>{invoice.invoiceNumber}</Text>
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col>
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        Date
                                    </Text>
                                </Col>
                                <Col>
                                    <Text style={{ fontSize: 12 }}>{invoice.invoiceDate}</Text>
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col>
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        Bank Account
                                    </Text>
                                </Col>
                                <Col>
                                    <Text style={{ fontSize: 12 }}>XXXX XXXX 1234</Text>
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col>
                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                        IFSC Code
                                    </Text>
                                </Col>
                                <Col>
                                    <Text style={{ fontSize: 12 }}>SBIN0001234</Text>
                                </Col>
                            </Row>
                        </Space>
                    </Card>
                ))}
            </Space>
        </Space>
    </Drawer>
    );
};

export default PaymentDetailsDrawer;
