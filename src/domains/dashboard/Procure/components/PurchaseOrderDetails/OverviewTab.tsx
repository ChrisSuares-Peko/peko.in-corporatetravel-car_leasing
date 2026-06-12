import React from 'react';

import { CheckCircleFilled } from '@ant-design/icons';
import { Button, Card, Col, Flex, Row, Table, Tag, Typography } from 'antd';
import type { TableColumnsType } from 'antd';

import uploadButtonIcon from '../../assets/icons/uploadButtonIcon.svg';
import { type ESignStatus } from '../../utils/data';

const { Text } = Typography;

const mockPO = {
    totalAmount:  '₹17,200',
    paymentTerms: 'Net 45',
    deliveryDate: '15 Apr 2026',
    currency:     '₹',
    deliveryAddress: 'Peko HQ, Floor 12, The Opus by Zaha Hadid, Business Bay, Dubai, UAE',
    notes:           'Please coordinate delivery with our facilities team: Noura Al Ketbi (+971 55 123 4567). Floor 12 access via service elevator only.',
    lineItems: [
        { key: '1', description: 'Security guard (24/7, 2 guards per shift)', qty: 6, unit: 'License', unitPrice: '₹3,000', total: '₹18,000' },
        { key: '2', description: 'Security guard (24/7, 2 guards per shift)', qty: 6, unit: 'License', unitPrice: '₹3,000', total: '₹18,000' },
        { key: '3', description: 'Security guard (24/7, 2 guards per shift)', qty: 6, unit: 'License', unitPrice: '₹3,000', total: '₹18,000' },
        { key: '4', description: 'Security guard (24/7, 2 guards per shift)', qty: 6, unit: 'License', unitPrice: '₹3,000', total: '₹18,000' },
    ],
    invoices: [
        { key: '1', ref: 'INV-006-2002-110', date: '6 Mar 2026 ₹11,000', status: 'Approved' },
        { key: '2', ref: 'INV-006-2002-110', date: '6 Mar 2026 ₹11,000', status: 'Approved' },
        { key: '3', ref: 'INV-006-2002-119', date: '6 Mar 2026 ₹11,000', status: 'Approved' },
    ],
    signatories: [
        { name: 'Khalid Al Khasman',  email: 'khalid.khasman@example.ae', status: 'Signed', date: '25 Jan 2024' },
        { name: 'Khalid Al Mansouri', email: 'khalid.mansouri@example.ae', status: 'Signed', date: '25 Jan 2024' },
    ],
};

const lineItemColumns: TableColumnsType<any> = [
    { title: 'Description', dataIndex: 'description', key: 'description', render: (v) => <Text style={{ fontSize: 13 }}>{v}</Text> },
    { title: 'Qty',        dataIndex: 'qty',        key: 'qty',        width: 60,  render: (v) => <Text style={{ fontSize: 13 }}>{v}</Text> },
    { title: 'Unit',       dataIndex: 'unit',       key: 'unit',       width: 80,  render: (v) => <Text style={{ fontSize: 13 }}>{v}</Text> },
    { title: 'Unit Price', dataIndex: 'unitPrice',  key: 'unitPrice',  width: 100, render: (v) => <Text style={{ fontSize: 13 }}>{v}</Text> },
    { title: 'Total',      dataIndex: 'total',      key: 'total',      width: 90,  render: (v) => <Text style={{ fontSize: 13, fontWeight: 600 }}>{v}</Text> },
];

type Props = {
    eSign: ESignStatus;
};

const OverviewTab: React.FC<Props> = ({ eSign }) => (
    <Flex vertical gap={16}>
        {/* Meta row */}
        <Row gutter={16}>
            {[
                { label: 'Total Amount',  value: mockPO.totalAmount },
                { label: 'Payment Terms', value: mockPO.paymentTerms },
                { label: 'Delivery Date', value: mockPO.deliveryDate },
                { label: 'Currency',      value: mockPO.currency },
            ].map(({ label, value }) => (
                <Col key={label} xs={12} sm={6}>
                    <Text className="text-xs text-gray-400 block">{label}</Text>
                    <Text className="text-sm font-medium text-[#262626]">{value}</Text>
                </Col>
            ))}
        </Row>

        {/* Delivery address */}
        <Flex vertical gap={2}>
            <Text className="text-xs text-gray-400">Delivery Address</Text>
            <Text className="text-xs text-[#262626]">{mockPO.deliveryAddress}</Text>
        </Flex>

        {/* Notes */}
        <Flex vertical gap={2}>
            <Text className="text-xs text-gray-400">Notes to Vendor</Text>
            <Text className="text-xs text-[#262626]">{mockPO.notes}</Text>
        </Flex>

        {/* Line Items */}
        <Card className="rounded-xl border border-[#f0f0f0]" styles={{ body: { padding: 0 } }}>
            <Text className="text-sm font-medium text-[#262626] block px-4 py-5">Line Items</Text>
            <Table
                columns={lineItemColumns}
                dataSource={mockPO.lineItems}
                rowKey="key"
                size="small"
                pagination={false}
                className="[&_.ant-table]:!rounded-none [&_.ant-table-container]:!rounded-none"
                summary={() => (
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0} colSpan={4}>
                            <Text className="text-sm font-medium text-right block pr-2 py-5">Total:</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1}>
                            <Text style={{ fontSize: 13, fontWeight: 700, color: '#ff4d4f' }}>₹18,000</Text>
                        </Table.Summary.Cell>
                    </Table.Summary.Row>
                )}
            />
        </Card>

        {/* Related Invoices */}
         <Card className="rounded-xl border border-[#f0f0f0] py-4 px-3" >
        <Flex vertical gap={10}>
            <Flex justify="space-between" align="center">
                <Flex vertical gap={2}>
                    <Text className="text-sm font-medium text-[#262626]">Related Invoices</Text>
                    <Text className="text-xs text-gray-400">
                        Track vendor billing against this PO. Multiple invoices can be attached over time.
                    </Text>
                </Flex>
                <Button size="small" danger variant="outlined" icon={<img src={uploadButtonIcon} alt="Upload" />} style={{ borderRadius: 6 }}>
                    Upload Invoice
                </Button>
            </Flex>
            <Flex vertical gap={6}>
                {mockPO.invoices.map(inv => (
                    <Flex key={inv.key} justify="space-between" align="center"
                        className="rounded-lg px-3 py-5  border border-[#CBD5E1]">
                        <Flex vertical gap={1}>
                            <Text style={{ fontSize: 13, color: '#000000', fontWeight: 500 }}>{inv.ref}</Text>
                            <Text className="text-xs text-gray-400">{inv.date}</Text>
                        </Flex>
                        <Flex gap={8} align="center">
                            <Tag style={{ color: '#03A254', background: '#ECFDF5', border: 'none', borderRadius: 6 }}>
                                {inv.status}
                            </Tag>
                            <Text style={{ fontSize: 13, color: '#03A254', cursor: 'pointer' }}>Paid</Text>
                        </Flex>
                    </Flex>
                ))}
            </Flex>
            <Text style={{ fontSize: 12, color: '#ff4d4f', cursor: 'pointer' }}>View all Invoices</Text>
        </Flex>
        </Card>

        {/* eSign Status */}
        <Card className="rounded-xl border border-[#f0f0f0] py-4 px-3" >
        <Flex vertical gap={8}>
            <Flex justify="space-between" align="center">
                <Text className="text-sm font-medium text-[#000000]">eSign Status</Text>
                <Tag style={{ color: '#43B75D', background: '#ECFDF5', border: 'none', borderRadius: 6, fontWeight: 500 }}>
                    {eSign}
                </Tag>
            </Flex>
            <Text className="text-sm text-gray-400">
               This reflects the document signing workflow only. It does not automatically close the PO operationally.
            </Text>
            <Flex vertical gap={6}>
                {mockPO.signatories.map((s, i) => (
                    <Flex key={i} justify="space-between" align="center"
                        className="rounded-lg border border-[#f0f0f0] px-3 py-2">
                        <Flex gap={8} align="center">
                            <Flex align="center" justify="center"
                                className="w-8 h-8 rounded-full bg-[#f0f5ff] text-xs font-medium text-[#1677ff]">
                                {s.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                            </Flex>
                            <Flex vertical gap={1}>
                                <Text style={{ fontSize: 13, color: '#262626', fontWeight: 500 }}>{s.name}</Text>
                                <Text className="text-xs text-gray-400">{s.email}</Text>
                            </Flex>
                        </Flex>
                        <Flex gap={8} align="center">
                            <Text style={{ fontSize: 12, color: '#43B75D', fontWeight: 500 }}>
                                <CheckCircleFilled className="mr-1" />{s.status}
                            </Text>
                            <Text className="text-xs text-gray-400">{s.date}</Text>
                        </Flex>
                    </Flex>
                ))}
            </Flex>
        </Flex>
        </Card>
    </Flex>
    
);

export default OverviewTab;
