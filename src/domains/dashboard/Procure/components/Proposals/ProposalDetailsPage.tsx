import React from 'react';

import { FilePdfOutlined } from '@ant-design/icons';
import { Button, Card, Col, Descriptions, Flex, Row, Table, Tag, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { paths } from '@src/routes/paths';

import { ProposalStatus, rfqData } from '../../utils/data';

const { Title, Text } = Typography;

const statusCfg: Record<ProposalStatus, { color: string; bg: string }> = {
    Accepted:       { color: '#43B75D', bg: '#ECFDF5' },
    Rejected:       { color: '#ff4d4f', bg: '#fff1f0' },
    'Under review': { color: '#fa8c16', bg: '#fff7e6' },
    Shortlisted:    { color: '#D97706', bg: '#FFFBEB' },
};

const lineItemColumns = [
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Qty',         dataIndex: 'qty',         key: 'qty',      width: 60  },
    { title: 'Unit',        dataIndex: 'unit',        key: 'unit',     width: 100 },
    { title: 'Unit Price',  dataIndex: 'unitCost',    key: 'unitCost', width: 110 },
    {
        title: 'Total', dataIndex: 'total', key: 'total', width: 100,
        render: (v: string) => <Text style={{ color: '#FF4F4F', fontWeight: 600 }}>{v}</Text>,
    },
];

const Field: React.FC<{ label: string; value?: React.ReactNode }> = ({ label, value }) => (
    <Flex vertical gap={4}>
        <Text style={{ fontSize: 12, color: '#8c8c8c' }}>{label}</Text>
        <Text style={{ fontSize: 13, color: '#262626', fontWeight: 500 }}>{value ?? '—'}</Text>
    </Flex>
);

const ProposalDetailsPage: React.FC = () => {
    const { proposalId } = useParams<{ proposalId: string }>();
    const navigate = useNavigate();

    const match = rfqData.reduce<{ proposal: any; rfq: any } | null>((acc, r) => {
        if (acc) return acc;
        const found = ((r as any).proposals ?? []).find((p: any) => p.id === proposalId);
        return found ? { proposal: found, rfq: r } : null;
    }, null);
    const proposal = match?.proposal ?? (rfqData[0] as any).proposals?.[0];
    const rfq      = match?.rfq      ?? rfqData[0];

    if (!proposal) return <Text className="p-8 block text-gray-400">Proposal not found.</Text>;

    const cfg = statusCfg[proposal.status as ProposalStatus] ?? { color: '#595959', bg: '#f5f5f5' };
    const allProposalsForRFQ = (rfq as any).proposals ?? [];

    return (
        <Row gutter={20}>

            {/* ── LEFT ── */}
            <Col xs={24} lg={16}>

                {/* Header card */}
                <Card className="mb-4 shadow-md rounded-xl" styles={{ body: { padding: 20 } }}>
                    <Flex justify="space-between" align="center">
                        <div>
                            <Title level={5} style={{ marginBottom: 2 }}>{proposal.vendorName}</Title>
                            <Text style={{ fontSize: 12, color: '#8c8c8c' }}>{rfq.ref} · {rfq.type_label}</Text>
                        </div>
                        <Flex gap={8} align="center">
                            <Tag style={{ color: cfg.color, background: cfg.bg, border: 'none', borderRadius: 2, fontWeight: 500, margin: 0 }}>
                                {proposal.status}
                            </Tag>
                            <Button size="small" variant="outlined" className="!rounded-sm"
                                onClick={() => navigate(`${paths.dashboard.procure}/${paths.procure.rfq.index}/${rfq.id}`)}>
                                View RFQ
                            </Button>
                            <Button size="small" type="primary" danger className="!rounded-sm"
                                onClick={() => navigate(`${paths.dashboard.procure}/${paths.procure.proposals.index}/compare/${rfq.id}`)}>
                                Compare
                            </Button>
                        </Flex>
                    </Flex>
                </Card>

                {/* Proposal Overview */}
                <Card className="mb-4 shadow-md rounded-xl" styles={{ body: { padding: 20 } }}>
                    <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>Proposal Overview</Text>
                    <Text style={{ fontSize: 12, color: '#8c8c8c', display: 'block', marginBottom: 20 }}>
                        Commercial summary for this vendor response.
                    </Text>

                    <Row gutter={[24, 20]} style={{ marginBottom: 20, marginTop: 20 }}>
                        <Col span={8}>
                            <Field label="Total Amount" value={<span style={{ color: '#FF4F4F', fontWeight: 700, fontSize: 15 }}>{proposal.amount}</span>} />
                        </Col>
                        <Col span={8}>
                            <Field label="Valid Until" value="30 Apr 2026" />
                        </Col>
                        <Col span={8}>
                            <Field label="Payment Terms" value="Net 45" />
                        </Col>
                    </Row>

                    <Row gutter={[24, 16]} style={{ paddingTop: 16 }}>
                        <Col span={8}>
                            <Field label="Vendors" value={proposal.vendorName} />
                        </Col>
                        <Col span={8}>
                            <Field label="RFQ" value={`${rfq.ref} · ${rfq.title}`} />
                        </Col>
                        <Col span={8}>
                            <Field label="Submission Mode"
                                value={
                                    <Tag style={{ borderRadius: 20, background: '#fff', border: '1px solid #CBD5E1', color: '#475569', padding: '0 8px', margin: 0 }}>
                                        {proposal.channel}
                                    </Tag>
                                }
                            />
                        </Col>
                    </Row>

                    {/* Line Items */}
                    <Card size="small" className="mt-5  rounded-xl" styles={{ body: { padding: '16px 18px' } }}>
                        <Text strong className="text-[13px] font-medium block mb-3">Line Items</Text>
                        <Table
                            dataSource={rfq.lineItems}
                            columns={lineItemColumns}
                            rowKey="key"
                            size="small"
                            pagination={false}
                        />
                    </Card>

                    {/* Notes + Attachments */}
                    {(rfq.notes || rfq.attachments?.length > 0) && (
                        <Card size="small" className="mt-5 rounded-xl" styles={{ body: { padding: '16px 18px' } }}>
                            {rfq.notes && (
                                <div>
                                    <Text style={{ fontSize: 12, color: '#8c8c8c', display: 'block', marginBottom: 4 }}>Notes</Text>
                                    <Text style={{ fontSize: 13, color: '#262626' }}>{rfq.notes}</Text>
                                </div>
                            )}
                            {rfq.attachments?.length > 0 && (
                                <div style={{ marginTop: rfq.notes ? 16 : 0 }}>
                                    <Text style={{ fontSize: 12, color: '#8c8c8c', display: 'block', marginBottom: 8 }}>Attachments</Text>
                                    <Flex gap={16} wrap="wrap">
                                        {rfq.attachments.map((a: any) => (
                                            <Flex key={a.name} gap={6} align="center">
                                                <FilePdfOutlined style={{ color: '#ff4d4f', fontSize: 16 }} />
                                                <Text style={{ fontSize: 12, color: '#262626', cursor: 'pointer' }}>{a.name}</Text>
                                            </Flex>
                                        ))}
                                    </Flex>
                                </div>
                            )}
                        </Card>
                    )}
                </Card>
            </Col>

            {/* ── RIGHT ── */}
            <Col xs={24} lg={8}>

                {/* Decision Context */}
                <Card className="mb-4 shadow-md rounded-xl" styles={{ body: { padding: 20 } }}>
                    <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 20 }}>Decision Context</Text>
                    <Descriptions
                        column={1}
                        size="small"
                        colon={false}
                        styles={{ label: { color: '#8c8c8c', fontSize: 12 }, content: { color: '#262626', fontSize: 12, fontWeight: 500, justifyContent: 'flex-end' } }}
                        items={[
                            { key: '1', label: 'Vendors',       children: proposal.vendorName,              style: { paddingBottom: 12 } },
                            { key: '2', label: 'RFQ Proposals', children: String(allProposalsForRFQ.length), style: { paddingBottom: 12 } },
                            { key: '3', label: 'Submitted',     children: proposal.submittedDate,           style: { paddingBottom: 12 } },
                            { key: '4', label: 'Channel',       children: proposal.channel,                 style: { paddingBottom: 0  } },
                        ]}
                    />
                </Card>

                {/* Next action */}
                <Card className="shadow-md rounded-xl"  styles={{ body: { padding: 20 } }}>
                    <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 14 }}>Next action</Text>
                    <Flex gap={8} vertical className="w-full mt-2">
                        <Button block className="!border !border-[#FF4F4F] !text-[#FF4F4F] rounded-md"
                            onClick={() => navigate(`${paths.dashboard.procure}/${paths.procure.proposals.index}/compare/${rfq.id}`)}>
                            Compare Proposals
                        </Button>
                        <Button block className="!border !border-[#FF4F4F] !text-[#FF4F4F] rounded-md"
                            onClick={() => navigate(`${paths.dashboard.procure}/${paths.procure.purchaseOrders.index}/${paths.procure.purchaseOrders.create}`)}>
                            Create PO
                        </Button>
                        <Button block type="primary" danger className="rounded-md"
                            onClick={() => navigate(`${paths.dashboard.procure}/${paths.procure.rfq.index}/${rfq.id}`)}>
                            View RFQ
                        </Button>
                    </Flex>
                </Card>
            </Col>
        </Row>
    );
};

export default ProposalDetailsPage;
