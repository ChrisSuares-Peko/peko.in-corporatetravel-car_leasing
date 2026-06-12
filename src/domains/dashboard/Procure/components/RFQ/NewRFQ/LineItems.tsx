import React from 'react';

import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Flex, Image, Input, Row, Select, Table, Typography } from 'antd';

import newRFQsIcon from '../../../assets/icons/newRFQsIcon.svg';

const { Text } = Typography;

export interface LineItem {
    key: string;
    description: string;
    qty: number;
    unit: string;
    price: number;
}

type Props = {
    items: LineItem[];
    addItem: () => void;
    removeItem: (key: string) => void;
    updateItem: (key: string, field: keyof LineItem, value: string | number) => void;
};

const LineItems: React.FC<Props> = ({ items, addItem, removeItem, updateItem }) => {
    const columns = [
        {
            title: 'Description', dataIndex: 'description', key: 'description',
            render: (_: unknown, row: LineItem) => (
                <Input size="small" placeholder="Describe the requested item or scope"
                    value={row.description}
                    onChange={e => updateItem(row.key, 'description', e.target.value)} />
            ),
        },
        {
            title: 'Qty', dataIndex: 'qty', key: 'qty', width: 70,
            render: (_: unknown, row: LineItem) => (
                <Input size="small" type="number" value={row.qty}
                    onChange={e => updateItem(row.key, 'qty', Number(e.target.value))} />
            ),
        },
        {
            title: 'Unit', dataIndex: 'unit', key: 'unit', width: 90,
            render: (_: unknown, row: LineItem) => (
                <Select size="small" value={row.unit} onChange={v => updateItem(row.key, 'unit', v)}
                    className="w-full"
                    options={[
                        { value: 'Unit', label: 'Unit' },
                        { value: 'Box', label: 'Box' },
                        { value: 'Kg', label: 'Kg' },
                        { value: 'L', label: 'L' },
                    ]}
                />
            ),
        },
        {
            title: 'Est. Unit Cost', dataIndex: 'price', key: 'price', width: 120,
            render: (_: unknown, row: LineItem) => (
                <Input size="small" type="number" prefix="₹" value={row.price}
                    onChange={e => updateItem(row.key, 'price', Number(e.target.value))} />
            ),
        },
        {
            title: 'Total', key: 'total', width: 100,
            render: (_: unknown, row: LineItem) => (
                <Text className="text-sm">₹ {(row.qty * row.price).toLocaleString()}</Text>
            ),
        },
        {
            title: '', key: 'action', width: 40,
            render: (_: unknown, row: LineItem) => (
                <Button type="text" size="small" danger icon={<DeleteOutlined />}
                    onClick={() => removeItem(row.key)} disabled={items.length === 1} />
            ),
        },
    ];

    return (
        <Card className="rounded-xl mb-4" styles={{ body: { padding: '20px 24px' } }}>
            <Flex gap={10} align="center" className="mb-4">
                <Flex
                    align="center"
                    justify="center"
                    className="shrink-0 text-sm rounded-lg"
                    style={{ width: 28, height: 28, background: '#FFF4F4' }}
                >
                   <Image src={newRFQsIcon} alt="New RFQ" width={16} height={16} preview={false} />
                </Flex>
                <Flex vertical>
                    <Text strong className="text-sm">Line Items</Text>
                    <Text className="text-xs text-gray-400">List the items or services you need quoted</Text>
                </Flex>
                <Button size="small" danger icon={<PlusOutlined />} onClick={addItem} className="ml-auto">
                    Add Row
                </Button>
            </Flex>

            <Table dataSource={items} columns={columns} pagination={false} size="small" rowKey="key" style={{ fontSize: 12 }} />

            <Row gutter={12} className="mt-3">
                <Col span={8}>
                    <Card className="rounded-lg" styles={{ body: { padding: '10px 14px' } }}>
                        <Text className="text-xs text-gray-400 block">Total Quantity</Text>
                        <Text strong className="text-sm">{items.length}</Text>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card className="rounded-lg" styles={{ body: { padding: '10px 14px' } }}>
                        <Text className="text-xs text-gray-400 block">Estimated Total</Text>
                        <Text strong className="text-sm">
                            ₹ {items.reduce((sum, i) => sum + i.qty * i.price, 0).toLocaleString()}
                        </Text>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card className="rounded-lg" styles={{ body: { padding: '10px 14px' } }}>
                        <Text className="text-xs text-gray-400 block">Pricing Guidance</Text>
                        <Text className="text-xs text-gray-500">
                            Use estimated unit cost to guide vendors without locking the final commercial offer.
                        </Text>
                    </Card>
                </Col>
            </Row>
        </Card>
    );
};

export default LineItems;
