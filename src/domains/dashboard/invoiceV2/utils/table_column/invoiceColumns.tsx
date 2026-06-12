import type { CSSProperties } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Flex, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { InvoiceRow } from '../../types/invoice';
import { formatAmount, formatDate, toTitleCase } from '../helperFunctions';

export const TABLE_HEADER_STYLE: CSSProperties = {
    backgroundColor: '#FAFBFB',
    color: '#42526D',
    fontWeight: 600,
    fontSize: '14px',
    borderBottom: '1.24px solid #EAECF0',
};

const STATUS_STYLE: Record<string, string> = {
    Paid: 'bg-[#ECFDF5] text-[#43B75D]',
    Pending: 'bg-[#FFF7ED] text-[#F97316]',
    Overdue: 'bg-[#FEF2F2] text-[#EF4444]',
};

const getInvoiceColumns = (
    onEdit: (row: InvoiceRow) => void,
    onDelete: (row: InvoiceRow) => void,
    onView: (id: string) => void,
    statusFilter?: string[]
): ColumnsType<InvoiceRow> => [
    {
        title: 'Invoice ID',
        dataIndex: 'invoiceNumber',
        key: 'invoiceNumber',
        render: (invoiceNumber, record) => (
            <Typography.Text className="text-[#42526D] text-sm">
                {record.prefix ? `${record.prefix}${invoiceNumber}` : invoiceNumber}
            </Typography.Text>
        ),
    },
    {
        title: 'Customer',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        render: name => (
            <Typography.Text className="text-[#42526D] text-sm">{name}</Typography.Text>
        ),
    },
    {
        title: 'Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        sorter: true,
        render: createdAt => (
            <Typography.Text className="text-[#42526D] text-sm">
                {formatDate(createdAt)}
            </Typography.Text>
        ),
    },
    {
        title: 'Amount',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        sorter: true,
        render: totalAmount => (
            <Typography.Text className="text-[#42526D] text-sm">
                {formatAmount(Number(totalAmount))}
            </Typography.Text>
        ),
    },
    {
        title: 'Type',
        dataIndex: 'invoiceType',
        key: 'invoiceType',
        sorter: true,
        render: invoiceType => (
            <Typography.Text className="text-[#42526D] text-sm">
                {toTitleCase(invoiceType ?? '')}
            </Typography.Text>
        ),
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        filteredValue: statusFilter ?? null,
        filters: [
            { text: 'Paid', value: 'Paid' },
            { text: 'Pending', value: 'Pending' },
            { text: 'Overdue', value: 'Overdue' },
        ],
        render: (status: InvoiceRow['status']) => {
            const key = status ? toTitleCase(status) : '';
            return (
                <Tag
                    className={`rounded-full text-xs font-medium border-0 px-3 py-1 ${STATUS_STYLE[key] ?? 'bg-[#F4F4F5] text-[#71717A]'}`}
                >
                    {key}
                </Tag>
            );
        },
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (_, row) => (
            <Flex align="center" gap={20}>
                <EditOutlined
                    className="text-[#A1A1AA] cursor-pointer hover:text-[#475569] text-base"
                    onClick={() => onEdit(row)}
                />
                <DeleteOutlined
                    className="text-[#A1A1AA] cursor-pointer hover:text-red-500 text-base"
                    onClick={() => onDelete(row)}
                />
                <Button size="small" onClick={() => onView(row.id)}>
                    View
                </Button>
            </Flex>
        ),
    },
];

export default getInvoiceColumns;
