import React from 'react';

import { Button, Tag, Typography } from 'antd';
import type { TableColumnsType } from 'antd';

import { type ESignStatus, type POStatus } from './data';

const { Text } = Typography;

const statusCfg: Record<POStatus, { color: string; bg: string }> = {
    'Acknowledged & Signed': { color: '#43B75D', bg: '#ECFDF5' },
    'Sent':                  { color: '#1677ff', bg: '#e6f4ff' },
    'In Progress':           { color: '#fa8c16', bg: '#fff7e6' },
    'Draft':                 { color: '#8c8c8c', bg: '#f5f5f5' },
    'Delivered':             { color: '#13c2c2', bg: '#e6fffb' },
};

const eSignCfg: Record<ESignStatus, { color: string; bg: string }> = {
    'Completed':        { color: '#43B75D', bg: '#ECFDF5' },
    'Partially Signed': { color: '#fa8c16', bg: '#fff7e6' },
    'Pending':          { color: '#8c8c8c', bg: '#f5f5f5' },
    'Not Required':     { color: '#bfbfbf', bg: '#fafafa' },
};

export const purchaseOrdersColumns = (onView: (ref: string) => void): TableColumnsType<any> => [
    {
        title: 'PO #', dataIndex: 'ref', key: 'ref',
        render: (v) => <Text style={{ fontSize: 13, color: '#262626', fontWeight: 500 }}>{v}</Text>,
    },
    {
        title: 'Vendor', dataIndex: 'vendor', key: 'vendor',
        render: (v) => <Text style={{ fontSize: 13, color: '#262626' }}>{v}</Text>,
    },
    {
        title: 'Total', dataIndex: 'total', key: 'total',
        render: (v) => <Text style={{ fontSize: 13, color: '#FF4F4F', fontWeight: 600 }}>{v}</Text>,
    },
    {
        title: 'Created', dataIndex: 'created', key: 'created',
        render: (v) => <Text style={{ fontSize: 13, color: '#595959' }}>{v}</Text>,
    },
    {
        title: 'Status', dataIndex: 'status', key: 'status',
        render: (v: POStatus) => {
            const cfg = statusCfg[v] ?? { color: '#595959', bg: '#f5f5f5' };
            return (
                <Tag style={{ color: cfg.color, background: cfg.bg, border: 'none', borderRadius: 6, fontWeight: 500 }}>
                    {v}
                </Tag>
            );
        },
    },
    {
        title: 'eSign', dataIndex: 'eSign', key: 'eSign',
        render: (v: ESignStatus) => {
            const cfg = eSignCfg[v] ?? { color: '#595959', bg: '#f5f5f5' };
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
            <Button size="small" danger variant="outlined" style={{ borderRadius: 6 }} onClick={() => onView(row.ref)}>
                View
            </Button>
        ),
    },
];
