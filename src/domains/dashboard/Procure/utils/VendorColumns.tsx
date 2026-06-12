import React from 'react';

import { Button, Tag, Typography } from 'antd';
import type { TableColumnsType } from 'antd';

import { type VendorStatus } from './data';

const { Text } = Typography;

const statusCfg: Record<VendorStatus, { color: string; bg: string }> = {
    'Active':     { color: '#43B75D', bg: '#ECFDF5' },
    'Inactive':   { color: '#8c8c8c', bg: '#f5f5f5' },
    'Blacklisted': { color: '#f5222d', bg: '#fff1f0' },
};

const categoryCfg: Record<string, { color: string; bg: string }> = {
    'Logistics':  { color: '#F59E0B', bg: '#FFFBEB' },
    'Facilities': { color: '#10B981', bg: '#ECFDF5' },
    'IT':         { color: '#6366F1', bg: '#EEF2FF' },
    'Finance':    { color: '#3B82F6', bg: '#EFF6FF' },
    'Services':   { color: '#8B5CF6', bg: '#F5F3FF' },
};
const fallbackCategoryColors = ['#fa8c16', '#1677ff', '#722ed1', '#13c2c2', '#52c41a'];

export const vendorColumns = (onView: (id: number) => void): TableColumnsType<any> => [
    {
        title: 'Vendor', dataIndex: 'vendor', key: 'vendor',
        render: (v) => <Text style={{ fontSize: 13, color: '#262626', fontWeight: 500 }}>{v}</Text>,
    },
    {
        title: 'Code', dataIndex: 'code', key: 'code',
        render: (v) => <Text style={{ fontSize: 13, color: '#595959' }}>{v}</Text>,
    },
    {
        title: 'Status', dataIndex: 'status', key: 'status',
        render: (v: VendorStatus) => {
            const cfg = statusCfg[v] ?? { color: '#595959', bg: '#f5f5f5' };
            return (
                <Tag style={{ color: cfg.color, background: cfg.bg, border: 'none', borderRadius: 6, fontWeight: 500 }}>
                    {v}
                </Tag>
            );
        },
    },
    {
        title: 'Category', dataIndex: 'categories', key: 'categories',
        render: (cats: string[]) => (
            <>
                {cats.map((cat, i) => {
                    const cfg = categoryCfg[cat] ?? { color: fallbackCategoryColors[i % fallbackCategoryColors.length], bg: 'transparent' };
                    return (
                        <Tag
                            key={cat}
                            style={{
                                color: cfg.color,
                                background: cfg.bg,
                                border: 'none',
                                borderRadius: 6,
                                fontWeight: 500,
                                marginRight: 4,
                            }}
                        >
                            {cat}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Total spends', dataIndex: 'totalSpends', key: 'totalSpends',
        render: (v) => <Text style={{ fontSize: 13, color: '#FF4F4F', fontWeight: 600 }}>{v}</Text>,
    },
    {
        title: 'POs', dataIndex: 'pos', key: 'pos',
        render: (v) => <Text style={{ fontSize: 13, color: '#262626' }}>{v}</Text>,
    },
    {
        title: 'Last activity', dataIndex: 'lastActivity', key: 'lastActivity',
        render: (v) => <Text style={{ fontSize: 13, color: '#595959' }}>{v}</Text>,
    },
    {
        title: 'Actions', key: 'actions',
        render: (_: any, row: any) => (
            <Button size="small" danger variant="outlined" style={{ borderRadius: 6 }} onClick={() => onView(row.id)}>
                View
            </Button>
        ),
    },
];
