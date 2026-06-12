import React from 'react';

import { CheckCircleFilled, FilePdfOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Table, Typography } from 'antd';
import type { TableColumnsType } from 'antd';

const { Text, Title } = Typography;

const mockDoc = {
    companyName:    'Peko',
    companyAddress: 'Peko UAE · The Opus by Zaha Hadid, Business Bay, Dubai, UAE',
    lineItems: [
        { key: '1', description: 'Height-adjustable workstation desk (1800x900mm)', qty: '40 Unit', unitPrice: '₹10,000', total: '₹10,000' },
        { key: '2', description: 'Security guard (24/7, 2 guards per shift)',        qty: '6',       unitPrice: '₹10,000', total: '₹10,000' },
        { key: '3', description: 'Security guard (24/7, 2 guards per shift)',        qty: '6',       unitPrice: '₹10,000', total: '₹10,000' },
    ],
    totalAmount:  '₹30,000',
    signedDate:   '27 Jan 2026',
};

const columns: TableColumnsType<any> = [
    { title: 'Description', dataIndex: 'description', key: 'description',width: 200,render: (v) => <Text style={{ fontSize: 13 }}>{v}</Text> },
    { title: 'Qty',        dataIndex: 'qty',         key: 'qty',         width: 100, render: (v) => <Text style={{ fontSize: 13 }}>{v}</Text> },
    { title: 'Unit Price', dataIndex: 'unitPrice',   key: 'unitPrice',   width: 110, render: (v) => <Text style={{ fontSize: 13 }}>{v}</Text> },
    { title: 'Total',      dataIndex: 'total',       key: 'total',       width: 100, render: (v) => <Text style={{ fontSize: 13, fontWeight: 600 }}>{v}</Text> },
];

const DocumentsTab: React.FC = () => (
    <Flex vertical gap={16}>
       
            {/* Header */}
            <Flex justify="space-between" align="center" className="px-0 py-3 ">
                <Text className="text-sm font-medium text-[#000000]">Purchase Order Document</Text>
                <Button
                    size="small"
                    danger
                    variant="outlined"
                    icon={<FilePdfOutlined />}
                    style={{ borderRadius: 6 }}
                >
                    Download PDF
                </Button>
            </Flex>
 <Card className="rounded-xl border border-[#f0f0f0]" styles={{ body: { padding: 0 } }}>
            {/* Company info */}
            <Flex vertical gap={2} className="px-4 py-4">
                <Title level={5} className="!mb-0">{mockDoc.companyName}</Title>
                <Text className="text-xs text-gray-400">{mockDoc.companyAddress}</Text>
            </Flex>

            {/* Line items table */}
            <Table
                columns={columns}
                dataSource={mockDoc.lineItems}
                rowKey="key"
                size="small"
                pagination={false}
                className="[&_.ant-table]:!rounded-none [&_.ant-table-container]:!rounded-none"
                summary={() => (
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0} colSpan={3}>
                            <Text className="text-sm font-semibold text-right block pr-2">Total</Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1}>
                            <Text style={{ fontSize: 13, fontWeight: 700, color: '#ff4d4f' }}>
                                {mockDoc.totalAmount}
                            </Text>
                        </Table.Summary.Cell>
                    </Table.Summary.Row>
                )}
            />

            {/* Signed banner */}
            <Flex gap={10} align="center" className="mx-4 my-4 px-4 py-3 rounded-lg bg-[#ECFDF5] border border-[#43B756]">
                <CheckCircleFilled style={{ color: '#43B756', fontSize: 18 }} />
                <Flex vertical gap={1}>
                    <Text style={{ fontSize: 13, fontWeight: 600, color: '#262626' }}>Electronically Signed</Text>
                    <Text style={{ fontSize: 12, color: '#43B756' }}>
                        All parties signed on {mockDoc.signedDate}
                    </Text>
                </Flex>
            </Flex>
        </Card>
    </Flex>
);

export default DocumentsTab;
