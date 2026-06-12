import React from 'react';

import { Button, Tag, Typography } from 'antd';
import type { TableColumnsType } from 'antd';

import { type InvoiceStatus, type PaymentStatus } from './data';

const { Text } = Typography;

const invoiceStatusCfg: Record<InvoiceStatus, { color: string; bg: string }> = {
    'Paid':     { color: '#43B75D', bg: '#ECFDF5' },
    'Pending':  { color: '#fa8c16', bg: '#fff7e6' },
    'Overdue':  { color: '#f5222d', bg: '#fff1f0' },
    'Disputed': { color: '#8c8c8c', bg: '#f5f5f5' },
};

const paymentStatusCfg: Record<PaymentStatus, { color: string; bg: string }> = {
    'Completed':     { color: '#43B75D', bg: '#ECFDF5' },
    'Pending':       { color: '#fa8c16', bg: '#fff7e6' },
    'Failed':        { color: '#f5222d', bg: '#fff1f0' },
    'Partially Paid': { color: '#1677ff', bg: '#e6f4ff' },
};

export const invoicingColumns = (onView: (ref: string) => void): TableColumnsType<any> => [
    {
        title: 'Invoice #', dataIndex: 'invoiceRef', key: 'invoiceRef',
        render: (v) => <Text style={{ fontSize: 13, color: '#262626', fontWeight: 500 }}>{v}</Text>,
    },
    {
        title: 'Vendor', dataIndex: 'vendor', key: 'vendor',
        render: (v) => <Text style={{ fontSize: 13, color: '#262626' }}>{v}</Text>,
    },
    {
        title: 'PO #', dataIndex: 'poRef', key: 'poRef',
        render: (v) => <Text style={{ fontSize: 13, color: '#262626' }}>{v}</Text>,
    },
    {
        title: 'Invoice Date', dataIndex: 'invoiceDate', key: 'invoiceDate',
        render: (v) => <Text style={{ fontSize: 13, color: '#595959' }}>{v}</Text>,
    },
    {
        title: 'Amount', dataIndex: 'amount', key: 'amount',
        render: (v) => <Text style={{ fontSize: 13, color: '#FF4F4F', fontWeight: 600 }}>{v}</Text>,
    },
    {
        title: 'Invoice Status', dataIndex: 'invoiceStatus', key: 'invoiceStatus',
        render: (v: InvoiceStatus) => {
            const cfg = invoiceStatusCfg[v] ?? { color: '#595959', bg: '#f5f5f5' };
            return (
                <Tag style={{ color: cfg.color, background: cfg.bg, border: 'none', borderRadius: 6, fontWeight: 500 }}>
                    {v}
                </Tag>
            );
        },
    },
    {
        title: 'Payment Status', dataIndex: 'paymentStatus', key: 'paymentStatus',
        render: (v: PaymentStatus) => {
            const cfg = paymentStatusCfg[v] ?? { color: '#595959', bg: '#f5f5f5' };
            return (
                <Tag style={{ color: cfg.color, background: cfg.bg, border: 'none', borderRadius: 6, fontWeight: 500 }}>
                    {v}
                </Tag>
            );
        },
    },
    {
        title: 'Actions', key: 'actions',
        render: (_: any, row: any) => (
            <Button size="small" danger variant="outlined" style={{ borderRadius: 6 }} onClick={() => onView(row.invoiceRef)}>
                View
            </Button>
        ),
    },
];
