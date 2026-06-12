import React from 'react';

import { DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Select, Typography } from 'antd';
import type { TableColumnsType } from 'antd';

import { UNIT_OPTIONS } from './data';

const { Text } = Typography;

const cellStyle = { fontSize: 13, color: '#262626' };

export interface EditableLineItem {
    key: string;
    description: string;
    qty: number;
    unit: string;
    [amountField: string]: string | number;
}

type Options = {
    updateItem: (key: string, field: string, value: string | number) => void;
    removeItem: (key: string) => void;
    itemsLength: number;
    amountField?: string;
    amountLabel?: string;
};

export const getLineItemColumns = ({
    updateItem,
    removeItem,
    itemsLength,
    amountField = 'amount',
    amountLabel = 'Est. Amount',
}: Options): TableColumnsType<EditableLineItem> => [
    {
        title: 'Description', dataIndex: 'description', key: 'description',
        render: (_: unknown, row: EditableLineItem) => (
            <Input
                size="small"
                placeholder="Describe the requested item or scope"
                value={row.description}
                style={cellStyle}
                onChange={e => updateItem(row.key, 'description', e.target.value)}
            />
        ),
    },
    {
        title: 'Qty', dataIndex: 'qty', key: 'qty', width: 70,
        render: (_: unknown, row: EditableLineItem) => (
            <Input
                size="small"
                type="number"
                value={row.qty}
                style={cellStyle}
                onChange={e => updateItem(row.key, 'qty', Number(e.target.value))}
            />
        ),
    },
    {
        title: 'Unit', dataIndex: 'unit', key: 'unit', width: 90,
        render: (_: unknown, row: EditableLineItem) => (
            <Select
                size="small"
                value={row.unit}
                onChange={v => updateItem(row.key, 'unit', v)}
                className="w-full"
                options={UNIT_OPTIONS}
            />
        ),
    },
    {
        title: amountLabel, dataIndex: amountField, key: amountField, width: 130,
        render: (_: unknown, row: EditableLineItem) => (
            <Input
                size="small"
                type="number"
                prefix="₹"
                value={row[amountField] as number}
                style={cellStyle}
                onChange={e => updateItem(row.key, amountField, Number(e.target.value))}
            />
        ),
    },
    {
        title: 'Total', key: 'total', width: 110,
        render: (_: unknown, row: EditableLineItem) => (
            <Text style={{ fontSize: 13, color: '#FF4F4F', fontWeight: 600 }}>
                ₹ {(row.qty * (row[amountField] as number)).toLocaleString()}
            </Text>
        ),
    },
    {
        title: '', key: 'action', width: 40,
        render: (_: unknown, row: EditableLineItem) => (
            <Button
                type="text"
                size="small"
                danger
                icon={<DeleteOutlined />}
                disabled={itemsLength === 1}
                onClick={() => removeItem(row.key)}
            />
        ),
    },
];
