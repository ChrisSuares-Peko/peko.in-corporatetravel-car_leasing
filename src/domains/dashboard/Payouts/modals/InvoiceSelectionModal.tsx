import React, { useEffect, useState } from 'react';

import { ArrowLeftOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Flex, Input, Row, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

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

const mockInvoices: Invoice[] = [
    {
        key: 'CUST-001',
        invoiceNumber: 'CUST-001',
        customerName: 'Acme Corp',
        amount: '₹80,000.00',
        dueDate: '2026-03-15',
        invoiceDate: '2026-03-13',
        type: 'Domestic',
    },
    {
        key: 'CUST-002',
        invoiceNumber: 'CUST-002',
        customerName: 'Tech Solutions',
        amount: '₹1,250.00',
        dueDate: '2026-03-15',
        invoiceDate: '2026-03-13',
        type: 'International',
    },
    {
        key: 'CUST-003',
        invoiceNumber: 'CUST-003',
        customerName: 'Innovative Designs',
        amount: '₹42,900.00',
        dueDate: '2026-03-15',
        invoiceDate: '2026-03-13',
        type: 'Domestic',
    },
    {
        key: 'CUST-004',
        invoiceNumber: 'CUST-004',
        customerName: 'Green Energy Co.',
        amount: '₹42,500.00',
        dueDate: '2026-03-15',
        invoiceDate: '2026-03-13',
        type: 'Domestic',
    },
    {
        key: 'CUST-005',
        invoiceNumber: 'CUST-005',
        customerName: 'Smart Home Systems',
        amount: '₹42,500.00',
        dueDate: '2026-03-15',
        invoiceDate: '2026-03-13',
        type: 'International',
    },
];

interface InvoiceSelectionModalProps {
    visible: boolean;
    onCancel: () => void;
    onBack: () => void;
    onMakePayment: (selected: Invoice[]) => void;
}

const InvoiceSelectionModal: React.FC<InvoiceSelectionModalProps> = ({
    visible,
    onCancel,
    onBack,
    onMakePayment,
}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (visible) {
            setSelectedRowKeys([]);
            setSearch('');
        }
    }, [visible]);

    const filteredInvoices = mockInvoices.filter(
        inv =>
            inv.customerName.toLowerCase().includes(search.toLowerCase()) ||
            inv.invoiceNumber.toLowerCase().includes(search.toLowerCase())
    );

    const selectedInvoices = mockInvoices.filter(inv => selectedRowKeys.includes(inv.key));

    const columns: ColumnsType<Invoice> = [
        {
            title: 'Invoice Number',
            dataIndex: 'invoiceNumber',
            key: 'invoiceNumber',
            render: (val: string) => <Text strong>{val}</Text>,
        },
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (val: string) => <Text strong>{val}</Text>,
        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
        },
        {
            title: 'Invoice Date',
            dataIndex: 'invoiceDate',
            key: 'invoiceDate',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type: Invoice['type']) => (
                <Tag color={type === 'Domestic' ? '#ECEDFD' : '#F6EBFF'} style={{ borderRadius: '12px', color: type === 'Domestic' ? '#5443B7' : '#900BF5' }}>{type}</Tag>
            ),
        },
    ];

    const handleMakePayment = () => {
        onMakePayment(selectedInvoices);
    };

    return (
        <Drawer
            open={visible}
            onClose={onCancel}
            placement="right"
            width={900}
            closable={false}
            title={
                <Flex align="center" justify="space-between">
                    <Space>
                        <Button
                            type="text"
                            icon={<ArrowLeftOutlined />}
                            onClick={onBack}
                            size="small"
                        />
                        <Space direction="vertical" size={2}>
                            <Title level={4} className="m-0">
                                Add Bill Payout
                            </Title>
                            <Text type="secondary" style={{ fontSize: 13, fontWeight: 'normal' }}>
                                Fill in the bill details below
                            </Text>
                        </Space>
                    </Space>
                    <Button type="text" icon={<CloseOutlined />} onClick={onCancel} />
                </Flex>
            }
            footer={
                <Row justify="space-between" align="middle">
                    <Col>
                        <Text type="secondary">
                            Total Selected: <Text strong>{selectedRowKeys.length}</Text>
                        </Text>
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            disabled={selectedRowKeys.length === 0}
                            onClick={handleMakePayment}
                            style={{ borderRadius: 8, background: '#FF4D4F', borderColor: '#FF4D4F' }}
                        >
                            Make Payment ({selectedRowKeys.length})
                        </Button>
                    </Col>
                </Row>
            }
        >
            <Space direction="vertical" size={16} className="w-full">
                <Text strong>Invoice Payout Details</Text>

                <Input
                    prefix={<SearchOutlined style={{ color: '#9ca3af' }} />}
                    placeholder="Search invoices"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    allowClear
                    style={{ borderRadius: 8 }}
                />

                <Table
                    rowSelection={{
                        selectedRowKeys,
                        onChange: keys => setSelectedRowKeys(keys),
                        hideSelectAll: true,
                    }}
                    columns={columns}
                    dataSource={filteredInvoices}
                    pagination={false}
                    size="small"
                    rowKey="key"
                />
            </Space>
        </Drawer>
    );
};

export default InvoiceSelectionModal;
