import React from 'react';

import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Pagination, Select, Spin, Tag, Typography } from 'antd';
import dayjs from 'dayjs';

import GenericTable from '@components/atomic/GenericTable';

import { type Order } from '../../types/index';
import { capitalize, MONTH_OPTIONS, statusColor } from '../../utils/manageSubscriptionUtils';

const { Title } = Typography;

interface Props {
    loading: boolean;
    filteredOrders: Order[];
    totalRecords: number;
    page: number;
    onPageChange: (p: number) => void;
    txnSearch: string;
    onTxnSearch: (v: string) => void;
    filterMonth: number | null;
    filterYear: number | null;
    onMonthChange: (v: number | null) => void;
    onYearChange: (v: number | null) => void;
    availableYears: number[];
    downloadingId: string | null;
    onDownload: (corporateTxnId: string) => void;
}

const TransactionHistoryTable: React.FC<Props> = ({
    loading,
    filteredOrders,
    totalRecords,
    page,
    onPageChange,
    txnSearch,
    onTxnSearch,
    filterMonth,
    filterYear,
    onMonthChange,
    onYearChange,
    availableYears,
    downloadingId,
    onDownload,
}) => {
    const columns = [
        { title: 'Order ID', dataIndex: 'corporateTxnId' },
        {
            title: 'Billing Date',
            dataIndex: 'transactionDate',
            render: (v: string) => dayjs(v).format('MMM DD, YYYY hh:mm A'),
        },
        {
            title: 'Product Category',
            dataIndex: 'items',
            render: (items: Order['items']) =>
                [...new Set((items ?? []).map(i => capitalize(i.itemType)))].join(', ') || '-',
        },
        {
            title: 'Product Name',
            dataIndex: 'items',
            render: (items: Order['items']) =>
                (items ?? []).map(i => i.productName).join(', ') || '-',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status: string) => (
                <Tag color={statusColor(status)} className="rounded-full px-3 py-1 text-xs font-medium">
                    {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
                </Tag>
            ),
        },
        {
            title: 'Action',
            render: (_: unknown, record: Order) => (
                <Button
                    size="small"
                    icon={<DownloadOutlined />}
                    loading={downloadingId === record.corporateTxnId}
                    onClick={() => onDownload(record.corporateTxnId)}
                    className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                >
                    Download
                </Button>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Title level={5} style={{ margin: 0 }}>Transaction History</Title>
            </div>
            <Flex justify="space-between" align="center" wrap="wrap" gap={12} className="mb-4">
                <Input
                    placeholder="Search"
                    prefix={<SearchOutlined />}
                    className="max-w-xs"
                    value={txnSearch}
                    onChange={e => onTxnSearch(e.target.value)}
                    allowClear
                />
                <Flex gap={8}>
                    <Select
                        placeholder="Month"
                        allowClear
                        value={filterMonth}
                        onChange={v => onMonthChange(v ?? null)}
                        className="w-36"
                        options={MONTH_OPTIONS}
                    />
                    <Select
                        placeholder="Year"
                        allowClear
                        value={filterYear}
                        onChange={v => onYearChange(v ?? null)}
                        className="w-24"
                        options={availableYears.map(y => ({ value: y, label: String(y) }))}
                    />
                </Flex>
            </Flex>
            <Spin spinning={loading}>
                <div className="border border-gray-200 rounded-xl overflow-x-auto">
                    <GenericTable
                        rowKey={(record: Order) => record.corporateTxnId}
                        columns={columns}
                        dataSource={filteredOrders}
                        pagination={false}
                    />
                </div>
            </Spin>
                <Flex justify="end" className="pt-4">
                    <Pagination
                        current={page}
                        onChange={onPageChange}
                        total={totalRecords}
                        pageSize={10}
                        showSizeChanger={false}
                    />
                </Flex>
        </div>
    );
};

export default TransactionHistoryTable;
