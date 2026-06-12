import React from 'react';

import { FilePdfOutlined } from '@ant-design/icons';
import { Card, Flex, Table, Tag, Typography } from 'antd';

const { Text } = Typography;

const vendorStatusColors: Record<string, string> = {
    Submitted: '#1677ff',
    Pending:   '#fa8c16',
};

const cellStyle = { color: '#262626', fontSize: 13 };
const lineItemColumns = [
    { title: 'Description',    dataIndex: 'description', key: 'description', width: 100, render: (v: any) => <span style={cellStyle}>{v}</span> },
    { title: 'Qty',            dataIndex: 'qty',         key: 'qty',         width: 60,  render: (v: any) => <span style={cellStyle}>{v}</span> },
    { title: 'Unit',           dataIndex: 'unit',        key: 'unit',        width: 120, render: (v: any) => <span style={cellStyle}>{v}</span> },
    { title: 'Est. Unit Cost', dataIndex: 'unitCost',    key: 'unitCost',    width: 130, render: (v: any) => <span style={cellStyle}>{v}</span> },
    { title: 'Total',          dataIndex: 'total',       key: 'total',       width: 100, render: (v: any) => <span style={cellStyle}>{v}</span> },
];

interface OverviewTabProps {
    record: any;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ record }) => (
    <Card className="rounded-2xl shadow-md" styles={{ body: { padding: 24, display: 'flex', flexDirection: 'column', gap: 16 } }}>

        {/* RFQ Details */}
        <Card className="border-0" styles={{ body: { padding: 0 } }}>
            <Text className="text-sm font-semibold block m-4 pb-5">RFQ Details</Text>
            <Card className="rounded-2xl" styles={{ body: { padding: 20 } }}>
                <Flex gap={24} className="w-full max-w-3xl">
                    <Flex vertical gap={6} style={{ flex: 1 }}>
                        <Text style={{ fontSize: 12, color: '#8c8c8c' }}>Type</Text>
                        <Text strong style={{ fontSize: 14, color: '#262626' }}>{record.requestedBy}</Text>
                    </Flex>
                    <Flex vertical gap={6} style={{ flex: 1 }}>
                        <Text style={{ fontSize: 12, color: '#8c8c8c' }}>Deadline</Text>
                        <Text strong style={{ fontSize: 14, color: '#262626' }}>{record.deadline}</Text>
                    </Flex>
                    <Flex vertical gap={6} style={{ flex: 1 }}>
                        <Text style={{ fontSize: 12, color: '#8c8c8c' }}>Created</Text>
                        <Text strong style={{ fontSize: 14, color: '#262626' }}>{record.created}</Text>
                    </Flex>
                </Flex>
            </Card>
        </Card>

        {/* Notes */}
        {record.notes && (
            <Card className="rounded-2xl" styles={{ body: { padding: 16 } }}>
                <Text style={{ fontSize: 12, color: '#8c8c8c', display: 'block', marginBottom: 6 }}>Notes</Text>
                <Text style={{ fontSize: 14, color: '#262626' }}>{record.notes}</Text>
            </Card>
        )}

        {/* Terms & Conditions + Attachments */}
        <Card className="rounded-2xl" styles={{ body: { padding: 20 } }}>
            <Flex justify="space-between" align="flex-start" gap={24} className="max-w-5xl">
                <Flex vertical gap={6} style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#8c8c8c', display: 'block' }}>Terms & Conditions</Text>
                    <Text style={{ fontSize: 14, color: '#262626' }}>{record.termsAndConditions}</Text>
                </Flex>
                {record.attachments?.length > 0 && (
                    <Flex vertical gap={8} style={{ flexShrink: 0, minWidth: 160 }}>
                        <Text style={{ fontSize: 12, color: '#8c8c8c', display: 'block' }}>Attachments</Text>
                        {record.attachments.map((a: any) => (
                            <Flex key={a.name} gap={8} align="center">
                                <FilePdfOutlined style={{ color: '#ff4d4f', fontSize: 16 }} />
                                <Text style={{ fontSize: 13, color: '#262626', cursor: 'pointer' }}>{a.name}</Text>
                            </Flex>
                        ))}
                    </Flex>
                )}
            </Flex>
        </Card>

        {/* Line Items */}
        <Card className="rounded-2xl overflow-hidden" styles={{ body: { padding: 0 } }}>
            <Text style={{ fontSize: 14, fontWeight: 600, color: '#262626', display: 'block', padding: '16px 20px 12px' }}>Line Items</Text>
            <Table
                columns={lineItemColumns}
                dataSource={record.lineItems}
                rowKey="key"
                size="small"
                pagination={false}
            />
        </Card>

        {/* Invited Vendors */}
        <Card className="rounded-2xl" styles={{ body: { padding: 20 } }}>
            <Text style={{ fontSize: 14, fontWeight: 600, color: '#262626', display: 'block', marginBottom: 4 }}>
                Invited Vendors ({record.invitedVendors?.length ?? 0})
            </Text>
            <Text style={{ fontSize: 12, color: '#8c8c8c', display: 'block', marginBottom: 16 }}>
                Use the vendor view to simulate a supplier receiving this RFQ and submitting a response.
            </Text>
            <Flex vertical gap={0}>
                {record.invitedVendors?.map((v: any) => (
                    <Flex key={v.email} justify="space-between" align="center" style={{ padding: '12px 0', borderBottom: '1px solid #f5f5f5' }}>
                        <Flex vertical gap={4}>
                            <Text style={{ fontSize: 14, fontWeight: 600, color: '#262626' }}>{v.name}</Text>
                            <Text style={{ fontSize: 12, color: '#8c8c8c' }}>{v.email}</Text>
                        </Flex>
                        <Tag style={{ color: vendorStatusColors[v.status] ?? '#595959', border: 'none', background: 'transparent', fontWeight: 500 }}>
                            ● {v.status}
                        </Tag>
                    </Flex>
                ))}
            </Flex>
        </Card>
    </Card>
);

export default OverviewTab;
