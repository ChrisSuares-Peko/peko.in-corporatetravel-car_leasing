import React from 'react';

import { CheckOutlined } from '@ant-design/icons';
import { Button, Flex, Tag, Typography } from 'antd';
import { useParams } from 'react-router-dom';

import { ProposalStatus, rfqData } from '../../utils/data';

const { Title, Text } = Typography;

const statusBtnCfg: Record<ProposalStatus, { color: string; bg: string; border: string }> = {
    Accepted: { color: '#52c41a', bg: '#f6ffed', border: '#b7eb8f' },
    Rejected: { color: '#ff4d4f', bg: '#fff1f0', border: '#ffa39e' },
    'Under review': { color: '#fa8c16', bg: '#fff7e6', border: '#ffd591' },
    Shortlisted: { color: '#D97706', bg: '#FFFBEB', border: '#fde68a' },
};

const LABEL_COL_WIDTH = 200;
const VENDOR_COL_MIN = 180;

const ProposalComparisonPage: React.FC = () => {
    const { rfqId } = useParams<{ rfqId: string }>();

    const rfq = rfqData.find(r => String(r.id) === rfqId) ?? rfqData[0];
    const proposals = ((rfq as any).proposals ?? []) as any[];
    const lineItems = rfq.lineItems ?? [];

    const parseAmt = (a: string) => parseInt(a.replace(/[^0-9]/g, ''), 10);
    const minAmount = Math.min(...proposals.map((p: any) => parseAmt(p.amount)));

    const isBest = (p: any) => parseAmt(p.amount) === minAmount;
    const isAccepted = (p: any) => (p.status as ProposalStatus) === 'Accepted';

    const summaryRows = [
        { label: 'Overall Total', getValue: (p: any) => p.amount, bold: true },
        { label: 'Valid Until', getValue: () => '30 Apr 2026', bold: false },
        { label: 'Payment Terms', getValue: () => 'Net 45', bold: false },
        { label: 'Submission Mode', getValue: (p: any) => p.channel, bold: false },
    ];

    const vendorColStyle: React.CSSProperties = {
        flex: 1,
        minWidth: VENDOR_COL_MIN,
        padding: '12px 16px',
        borderLeft: '1px solid #f0f0f0',
    };

    return (
        <div>
            {/* Header */}
            <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 14, padding: '18px 20px', marginBottom: 16 }}>
                <Title level={4} style={{ marginBottom: 4 }}>Comparing Proposals</Title>
                <Text style={{ fontSize: 12, color: '#8c8c8c' }}>
                    {rfq.title} · {proposals.length} proposals
                </Text>
            </div>

            {/* Comparison table — maxWidth 1078 on large screens, scrolls horizontally on small */}
            <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 14, overflowX: 'auto', maxWidth: 1078, margin: '0 auto' }}>
                <div style={{ minWidth: LABEL_COL_WIDTH + proposals.length * VENDOR_COL_MIN }}>

                    {/* Vendor header row */}
                    <div style={{ display: 'flex', background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
                        <div style={{ width: LABEL_COL_WIDTH, minWidth: LABEL_COL_WIDTH, padding: '14px 16px' }}>
                            <Text style={{ fontSize: 13, fontWeight: 600, color: '#262626' }}>Line Items</Text>
                        </div>
                        {proposals.map((p: any) => (
                            <div key={p.id} style={{ ...vendorColStyle, padding: '14px 16px' }}>
                                <Text style={{ fontSize: 13, fontWeight: 600, color: '#262626', display: 'block', marginBottom: 6 }}>
                                    {p.vendorName}
                                </Text>
                                <Flex gap={6} wrap="wrap">
                                    {/* ✅ Accepted */}
                                    {isAccepted(p) && (
                                        <Tag
                                            style={{
                                                color: '#52c41a',
                                                background: '#f6ffed',
                                                border: '1px solid #b7eb8f',
                                                borderRadius: 999,
                                                margin: 0,
                                                fontSize: 11,
                                                padding: '2px 8px',
                                            }}
                                        >
                                            Accepted
                                        </Tag>
                                    )}

                                    {/* ✅ Best Price */}
                                    {isAccepted(p) && isBest(p) && (
                                        <Tag className='bg-[#43B75D] border-[#81cf92] text-white rounded-full mr-[10px] text-[11px] px-2 py-[2px]'
                                            icon={
                                                <span className="bg-white rounded-full w-[14px] h-[14px] inline-flex items-center justify-center mr-1">
                                                    <CheckOutlined style={{ color: '#52c41a', fontSize: 10 }} />
                                                </span>
                                            }
                                        >
                                            Best Price
                                        </Tag>
                                    )}
                                </Flex>
                            </div>
                        ))}
                    </div>

                    {/* Line item rows */}
                    {lineItems.map((item: any) => (
                        <div key={item.key} style={{ display: 'flex', borderBottom: '1px solid #f0f0f0' }}>
                            <div style={{ width: LABEL_COL_WIDTH, minWidth: LABEL_COL_WIDTH, padding: '12px 16px' }}>
                                <Text style={{ fontSize: 13, color: '#262626', display: 'block' }}>{item.description}</Text>
                                <Text style={{ fontSize: 11, color: '#8c8c8c' }}>{item.qty} {item.unit}</Text>
                            </div>
                            {proposals.map((p: any) => (
                                <div key={p.id} style={vendorColStyle}>
                                    <Text style={{ fontSize: 13, fontWeight: 500, color: isAccepted(p) ? '#52c41a' : '#262626', display: 'block' }}>
                                        {item.total}
                                    </Text>
                                    <Text style={{ fontSize: 11, color: '#8c8c8c' }}>{item.unitCost}</Text>
                                </div>
                            ))}
                        </div>
                    ))}

                    {/* Summary rows */}
                    {summaryRows.map(row => (
                        <div key={row.label} style={{ display: 'flex', borderBottom: '1px solid #f0f0f0' }}>
                            <div style={{ width: LABEL_COL_WIDTH, minWidth: LABEL_COL_WIDTH, padding: '12px 16px', background: '#fafafa' }}>
                                <Text style={{ fontSize: 13, color: '#8c8c8c' }}>{row.label}</Text>
                            </div>
                            {proposals.map((p: any) => (
                                <div key={p.id} style={vendorColStyle}>
                                    <Text style={{ fontSize: 13, fontWeight: row.bold ? 600 : 400, color: isAccepted(p) ? '#52c41a' : '#262626' }}>
                                        {row.getValue(p)}
                                    </Text>
                                </div>
                            ))}
                        </div>
                    ))}

                    {/* Action buttons row */}
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: LABEL_COL_WIDTH, minWidth: LABEL_COL_WIDTH, padding: '12px 16px' }} />
                        {proposals.map((p: any) => {
                            const cfg = statusBtnCfg[p.status as ProposalStatus] ?? statusBtnCfg['Under review'];
                            return (
                                <div key={p.id} style={vendorColStyle}>
                                    <Button
                                        size="small"
                                        style={{ borderRadius: 20, color: cfg.color, borderColor: cfg.border, background: cfg.bg }}
                                    >
                                        {p.status}
                                    </Button>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProposalComparisonPage;
