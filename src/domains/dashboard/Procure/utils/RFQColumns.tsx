import React from 'react';

import { Button, Col, Row, Tag } from 'antd';
import type { TableColumnsType } from 'antd';

import { RFQStatus, RFQType } from './data';

const cellStyle = { color: '#262626', fontSize: 13 };

export const lineItemColumns: TableColumnsType<any> = [
    { title: 'Description',    dataIndex: 'description', key: 'description', width: 100, render: (v: any) => <span style={cellStyle}>{v}</span> },
    { title: 'Qty',            dataIndex: 'qty',         key: 'qty',         width: 60,  render: (v: any) => <span style={cellStyle}>{v}</span> },
    { title: 'Unit',           dataIndex: 'unit',        key: 'unit',        width: 120, render: (v: any) => <span style={cellStyle}>{v}</span> },
    { title: 'Est. Unit Cost', dataIndex: 'unitCost',    key: 'unitCost',    width: 130, render: (v: any) => <span style={cellStyle}>{v}</span> },
    { title: 'Total',          dataIndex: 'total',       key: 'total',       width: 100, render: (v: any) => <span style={cellStyle}>{v}</span> },
];

const typeColors: Record<RFQType, { color: string; bg: string }> = {
    RFQ: { color: '#171717', bg: '#F7EEFF' },
    RFI: { color: '#171717', bg: '#F7EEFF' },
    RFP: { color: '#171717', bg: '#F7EEFF' },
};

const statusColors: Record<RFQStatus, { color: string; bg: string }> = {
    Active: { color: '#52c41a', bg: '#f6ffed' },
    Open:   { color: '#1677ff', bg: '#e6f4ff' },
    Closed: { color: '#8c8c8c', bg: '#f5f5f5' },
};

export const getRFQColumns = (
    onView: (row: any) => void,
    onClose: (row: any) => void
): TableColumnsType<any> => [
    { title: 'Date',      dataIndex: 'date',      key: 'date',      width: 110 },
    { title: 'Ref #',     dataIndex: 'ref',       key: 'ref',       width: 130 },
    { title: 'Title',     dataIndex: 'title',     key: 'title',     width: 220 },
    {
        title: 'Type', dataIndex: 'type', key: 'type', width: 80,
        render: (type: RFQType) => {
            const cfg = typeColors[type];
            return (
                <Tag className="!font-semibold !border-[#ECD3FF] rounded-lg" style={{ color: cfg.color, background: cfg.bg }}>
                    {type}
                </Tag>
            );
        },
    },
    { title: 'Vendors',   dataIndex: 'vendors',   key: 'vendors',   width: 90  },
    {
        title: 'Deadline', dataIndex: 'deadline', key: 'deadline', width: 120,
        render: (val: string) => (
            <span style={{ color: val.includes('Mar') || val.includes('left') ? '#ff4d4f' : undefined }}>
                {val}
            </span>
        ),
    },
    { title: 'Proposals', dataIndex: 'proposalCount', key: 'proposalCount', width: 100 },
    {
        title: 'Status', dataIndex: 'status', key: 'status', width: 100,
        render: (status: RFQStatus) => {
            const cfg = statusColors[status];
            return (
                <Tag style={{ color: cfg.color, background: cfg.bg, border: 'none', borderRadius: 6, fontWeight: 500 }}>
                    ● {status}
                </Tag>
            );
        },
    },
    {
        title: 'Actions', key: 'actions', width: 130,
        render: (_: any, row: any) => (
            <Row gutter={4}>
                <Col><Button size="small" className="text-[#FF4F4F] border-[#FF4F4F]" variant="outlined" onClick={() => onView(row)}>View</Button></Col>
                <Col><Button size="small" className="text-[#E01A1A] border-[#E01A1A]" variant="outlined" onClick={() => onClose(row)}>Close</Button></Col>
            </Row>
        ),
    },
];
