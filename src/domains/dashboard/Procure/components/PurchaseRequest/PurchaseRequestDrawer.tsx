import React from 'react';

import { FilePdfOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Image, Tag, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import InvoicingDocumentIcon from '@src/domains/dashboard/Procure/assets/icons/invoicingDocumentIcon.svg';
import { paths } from '@src/routes/paths';

const { Text, Title } = Typography;

interface PurchaseRequestRecord {
    ref: string;
    date: string;
    requestedBy: string;
    department: string;
    category: string;
    budget: string;
    needBy: string;
    status: string;
    description?: string;
    notes?: string;
}

interface Props {
    record: PurchaseRequestRecord;
}

const statusColors: Record<string, { color: string; bg: string }> = {
    'Open':             { color: '#1677ff', bg: '#e6f4ff' },
    'Converted to RFQ': { color: '#fa8c16', bg: '#fff7e6' },
    'Converted to PO':  { color: '#52c41a', bg: '#f6ffed' },
};

const fieldStyle: React.CSSProperties = {
    marginBottom: 0,
    paddingBottom: 14,
    paddingTop: 14,
    borderBottom: '1px solid #f5f5f5',
};

const SectionBox: React.FC<{ icon: React.ReactNode; label: string; children: React.ReactNode }> = ({
    icon, label, children,
}) => (
    <div style={{ border: '1px solid #f0f0f0', borderRadius: 10, overflow: 'hidden', marginBottom: 14 }}>
        <Flex gap={8} align="center" style={{ padding: '12px 18px' }}>
            <div style={{
                width: 26, height: 26, borderRadius: 6, background: '#fff1f0',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
            }}>
                {icon}
            </div>
            <Text strong className="text-sm">{label}</Text>
        </Flex>
        <div style={{ borderTop: '1px solid #f0f0f0' }} />
        <div style={{ padding: '0 18px 16px' }}>
        {children}
        </div>
    </div>
);

const Field: React.FC<{ label: string; value?: string; last?: boolean }> = ({ label, value, last }) => (
    <div style={{ ...fieldStyle, borderBottom: last ? 'none' : '1px solid #f5f5f5' }}>
        <Text className="text-xs text-gray-400 block">{label}</Text>
        <Text className="text-sm text-gray-800 font-medium">{value || '—'}</Text>
    </div>
);

const PurchaseRequestDrawer: React.FC<Props> = ({ record }) => {
    const navigate = useNavigate();

    const statusCfg = statusColors[record.status] ?? { color: '#595959', bg: '#f5f5f5' };

    const handleConvertToRFQ = () => {
        navigate(
            `${paths.dashboard.procure}/${paths.procure.rfq.index}/${paths.procure.rfq.create}?prRef=${encodeURIComponent(record.ref)}`
        );
    };

    const handleBack = () => {
        navigate(`${paths.dashboard.procure}/${paths.procure.purchaseRequests.index}`);
    };

    return (
        <Card
            className="rounded-xl"
            styles={{ body: { padding: '24px 28px' } }}
        >
            {/* Header */}
            <Flex justify="space-between" align="flex-start" style={{ marginBottom: 20 }}>
                <div>
                    <Title level={4} style={{ marginBottom: 4 }}>{record.ref}</Title>
                    {record.description && (
                        <Text className="text-xs text-gray-400 block" style={{ maxWidth: 400 }}>
                            {record.description.length > 80
                                ? `${record.description.substring(0, 80)}...`
                                : record.description}
                        </Text>
                    )}
                </div>
                <Flex align="center" gap={8} style={{ flexShrink: 0 }}>
                    <Tag
                        style={{
                            color: statusCfg.color,
                            background: statusCfg.bg,
                            border: 'none',
                            borderRadius: 6,
                            fontWeight: 500,
                            fontSize: 12,
                        }}
                    >
                        ● {record.status}
                    </Tag>
                    <Button type="primary" danger style={{ borderRadius: 8 }} onClick={handleConvertToRFQ}>
                        → Convert to RFQ
                    </Button>
                </Flex>
            </Flex>

            {/* Sections */}
            <SectionBox icon={<Image src={InvoicingDocumentIcon} alt="request" style={{ width: 14, height: 14 }} />} label="Request Details">
                <Field label="Requested By"    value={record.requestedBy} />
                <Field label="Department"      value={record.department} />
                <Field label="Category"        value={record.category} />
                <Field label="Estimated Budget" value={record.budget} />
                <Field label="Needed By"       value={record.needBy} />
                <Field label="Submitted"       value={record.date} last />
            </SectionBox>

            <SectionBox icon={<Image src={InvoicingDocumentIcon} alt="request" style={{ width: 14, height: 14 }} />} label="Description">
                <div style={fieldStyle}>
                    <Text className="text-sm text-gray-700 block">
                        {record.description || 'No description provided.'}
                    </Text>
                </div>
                {record.notes && (
                    <div style={{ paddingTop: 12 }}>
                        <Text className="text-xs text-gray-400 block">Attachment notes</Text>
                        <Text className="text-sm text-gray-700">{record.notes}</Text>
                    </div>
                )}
            </SectionBox>

            <SectionBox icon={<Image src={InvoicingDocumentIcon} alt="request" style={{ width: 14, height: 14 }} />} label="Attachments">
                <Flex
                    align="center"
                    gap={10}
                    style={{
                        padding: '10px 12px',
                        background: '#fff',
                        border: '1px solid #f0f0f0',
                        borderRadius: 8,
                        cursor: 'pointer',
                        marginTop: 8,
                    }}
                >
                    <FilePdfOutlined style={{ color: '#ff4d4f', fontSize: 18 }} />
                    <Text className="text-sm  text-gray-700">Tax Residency Certificate</Text>
                </Flex>
            </SectionBox>

            {/* Footer */}
            <Flex gap={10} style={{ marginTop: 8 }}>
                <Button type="primary" danger style={{ borderRadius: 8 }} onClick={handleConvertToRFQ}>
                    → Convert to RFQ
                </Button>
                <Button style={{ borderRadius: 8 }} onClick={handleBack}>Close</Button>
            </Flex>
        </Card>
    );
};

export default PurchaseRequestDrawer;
