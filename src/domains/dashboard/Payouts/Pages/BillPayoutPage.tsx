import React from 'react';

import { Button, Col, Row, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';

import { paths } from '@src/routes/paths';

const { Title, Text } = Typography;

interface VendorRecord {
    key: number;
    beneficiaryName: string;
    accountType: string;
    status: 'Active' | 'Inactive' | 'Pending';
    dueDate: string;
    vendorLimit: string;
}

const mockVendors: VendorRecord[] = [
    {
        key: 1,
        beneficiaryName: 'Reliance Energy Ltd',
        accountType: 'Current Account',
        status: 'Active',
        dueDate: '31 Mar 2026',
        vendorLimit: '₹5,00,000',
    },
    {
        key: 2,
        beneficiaryName: 'Tata Consultancy Services',
        accountType: 'Savings Account',
        status: 'Active',
        dueDate: '15 Apr 2026',
        vendorLimit: '₹2,50,000',
    },
    {
        key: 3,
        beneficiaryName: 'Infosys Pvt Ltd',
        accountType: 'Current Account',
        status: 'Pending',
        dueDate: '20 Apr 2026',
        vendorLimit: '₹1,00,000',
    },
    {
        key: 4,
        beneficiaryName: 'Wipro Technologies',
        accountType: 'Current Account',
        status: 'Inactive',
        dueDate: '10 May 2026',
        vendorLimit: '₹75,000',
    },
    {
        key: 5,
        beneficiaryName: 'HCL Technologies',
        accountType: 'Savings Account',
        status: 'Active',
        dueDate: '25 Apr 2026',
        vendorLimit: '₹3,00,000',
    },
];

const statusColorMap: Record<VendorRecord['status'], string> = {
    Active: 'success',
    Inactive: 'error',
    Pending: 'warning',
};

const BillPayoutPage: React.FC = () => {
    const navigate = useNavigate();

    const columns: ColumnsType<VendorRecord> = [
        {
            title: 'Beneficiary Name',
            dataIndex: 'beneficiaryName',
            key: 'beneficiaryName',
            render: (name: string) => <Text strong>{name}</Text>,
        },
        {
            title: 'Account Type',
            dataIndex: 'accountType',
            key: 'accountType',
            render: (type: string) => <Text type="secondary">{type}</Text>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: VendorRecord['status']) => (
                <Tag color={statusColorMap[status]}>{status}</Tag>
            ),
        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
        },
        {
            title: 'Vendor Limit',
            dataIndex: 'vendorLimit',
            key: 'vendorLimit',
            render: (limit: string) => <Text strong>{limit}</Text>,
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Typography.Link style={{ color: '#FF4D4F' }}>Pay Now</Typography.Link>
            ),
        },
    ];

    return (
        <Space direction="vertical" size={24} className="w-full p-5 md:p-7">
            <Row justify="space-between" align="middle">
                <Col>
                    <Space direction="vertical" size={4}>
                        <Title level={4} className="m-0">
                            Add Bill Payout
                        </Title>
                        <Text type="secondary">
                            Select a vendor to proceed with the payout
                        </Text>
                    </Space>
                </Col>
                <Col>
                    <Space>
                        <Button onClick={() => navigate(paths.dashboard.payout)}>
                            Back
                        </Button>
                        <Button type="primary">+ Add Beneficiary</Button>
                    </Space>
                </Col>
            </Row>

            <Table
                columns={columns}
                dataSource={mockVendors}
                pagination={false}
                rowKey="key"
                bordered={false}
                style={{ background: '#fff', borderRadius: 12 }}
            />
        </Space>
    );
};

export default BillPayoutPage;
