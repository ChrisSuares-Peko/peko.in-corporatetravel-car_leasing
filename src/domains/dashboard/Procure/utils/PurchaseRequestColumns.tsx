import React from 'react';

import { Avatar, Button, Flex, Tag } from 'antd';
import type { TableColumnsType } from 'antd';

import { PurchaseRequestStatus } from './data';

const statusConfig: Record<PurchaseRequestStatus, { color: string; bg: string }> = {
    'Converted to RFQ': { color: '#B75C12', bg: '#FFCE8' },
    'Converted to PO':  { color: '#7B07B1', bg: '#FCF5FF' },
    'Open':             { color: '#03A254', bg: '#DDFFEE' },
};

export const getPurchaseRequestColumns = (onView: (row: any) => void): TableColumnsType<any> => [
    { title: 'Date',         dataIndex: 'date',        key: 'date',        width: 110 },
    { title: 'Ref #',        dataIndex: 'ref',         key: 'ref',         width: 130 },
    {
        title: 'Requested By', dataIndex: 'requestedBy', key: 'requestedBy', width: 180,
        render: (name: string, row: any) => (
            <Flex align="center" gap={8}>
                <Avatar size={28} style={{ background: '#FFEFEF', color: '#FF4F4F', fontSize: 11, flexShrink: 0 }}>
                    {row.initials}
                </Avatar>
                <span>{name}</span>
            </Flex>
        ),
    },
    { title: 'Department',   dataIndex: 'department',  key: 'department',  width: 130 },
    { title: 'Category',     dataIndex: 'category',    key: 'category',    width: 120 },
    { title: 'Budget (₹)', dataIndex: 'budget',      key: 'budget',      width: 130 },
    { title: 'Need By',      dataIndex: 'needBy',      key: 'needBy',      width: 120 },
    {
        title: 'Status', dataIndex: 'status', key: 'status', width: 160,
        render: (status: PurchaseRequestStatus) => {
            const cfg = statusConfig[status];
            return (
                <Tag style={{ color: cfg.color, background: cfg.bg, border: 'none', borderRadius: 6, fontWeight: 500 }}>
                    ● {status}
                </Tag>
            );
        },
    },
    {
        title: 'Actions', key: 'actions', width: 90,
        render: (_: any, row: any) => (
            <Button size="small" danger onClick={() => onView(row)}>View</Button>
        ),
    },
];
