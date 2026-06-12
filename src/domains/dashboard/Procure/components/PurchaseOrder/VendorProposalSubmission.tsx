import React, { useState } from 'react';

import { FilePdfOutlined, SendOutlined, UploadOutlined } from '@ant-design/icons';
import {
    Button,
    Card,
    Col,
    DatePicker,
    Flex,
    Form,
    Input,
    Row,
    Select,
    Table,
    Tag,
    Typography,
    Upload,
} from 'antd';
import { useNavigate } from 'react-router-dom';

import { paths } from '@src/routes/paths';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface LineItem {
    key: string;
    description: string;
    qty: number;
    unit: string;
    unitCost: number;
}

const mockItems: LineItem[] = [
    { key: '1', description: 'Adobe Creative Suite – 128 seats, 1 year', qty: 8, unit: 'License', unitCost: 1300 },
];

interface Props {
    rfqRef?: string;
    rfqTitle?: string;
}

const VendorProposalSubmission: React.FC<Props> = ({
    rfqRef = 'RFQ-2026-001',
    rfqTitle = 'Annual Software License Renewal 2026',
}) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [items] = useState<LineItem[]>(mockItems);

    const total = items.reduce((s, i) => s + i.qty * i.unitCost, 0);

    const handleBack = () => navigate(-1);

    const handleSubmit = (values: unknown) => {
        console.log('Create PO:', { ...values as object, items });
        navigate(`${paths.dashboard.procure}/${paths.procure.purchaseOrders.index}`);
    };

    const columns = [
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Qty', dataIndex: 'qty', key: 'qty', width: 60 },
        { title: 'Unit', dataIndex: 'unit', key: 'unit', width: 90 },
        {
            title: 'Est. Unit Cost', dataIndex: 'unitCost', key: 'unitCost', width: 120,
            render: (v: number) => `₹ ${v.toLocaleString()}`,
        },
        {
            title: 'Total', key: 'total', width: 110,
            render: (_: unknown, row: LineItem) => (
                <Text strong style={{ color: '#ff4d4f' }}>₹ {(row.qty * row.unitCost).toLocaleString()}</Text>
            ),
        },
    ];

    const cardProps = { styles: { body: { padding: '18px 20px' } }, className: 'mb-4 rounded-xl' };

    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Row gutter={20}>
                {/* ── LEFT COLUMN ── */}
                <Col xs={24} lg={15}>

                    {/* Page header card */}
                    <Card className="mb-5 rounded-xl shadow-md" styles={{ body: { padding: '20px 24px' } }}>
                        <Flex justify="space-between" align="center">
                            <Flex vertical gap={2}>
                                <Title level={4} style={{ margin: 0, marginBottom: 4 }}>Vendor Proposal Submission</Title>
                                <Text style={{ fontSize: 12, color: '#8c8c8c' }}>
                                    {rfqRef} · {rfqTitle}
                                </Text>
                            </Flex>
                            <Flex align="center" gap={10}>
                                <Tag style={{ background: '#fff', border: 'none', color: '#03A254', margin: 0, fontWeight: 500, padding: '2px 10px' }}>
                                    Vendor Preview
                                </Tag>
                                <Tag style={{ borderRadius: 6, background: '#DDFFEE', border: 'none', color: '#03A254', margin: 0 }}>
                                    ● Active
                                </Tag>
                            </Flex>
                        </Flex>
                    </Card>

                    {/* Title block */}
                    <Card className="mb-5 rounded-xl shadow-md [&_.ant-card-body]:px-6 [&_.ant-card-body]:py-5">
                        <Flex justify="space-between" align="center" className="mb-4">
                            <Flex vertical gap={2} style={{ flexShrink: 0 }}>
                                <Text style={{ fontSize: 12, color: '#8c8c8c' }}>Buyer shared this request for supplier response</Text>
                                <Title level={5} style={{ marginBottom: 2, color: '#262626' }}>{rfqTitle}</Title>
                                <Text style={{ fontSize: 12, color: '#8c8c8c', display: 'block', marginBottom: 16 }}>
                                    Review the requested scope, add your commercial offer, and submit your proposal online.
                                </Text>
                            </Flex>
                            <Card size="small" className="!bg-[#F8FAFC] !border-[#CBD5E1] rounded-lg shrink-0 ml-4" styles={{ body: { padding: '6px 12px', textAlign: 'right' } }}>
                                <Text style={{ fontSize: 11, color: '#8c8c8c', display: 'block' }}>Submission deadline</Text>
                                <Text strong style={{ fontSize: 13, color: '#262626' }}>12 Mar 2026</Text>
                            </Card>
                        </Flex>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="vendor" label={<span style={{ color: '#262626' }}>Submitting Vendor</span>} rules={[{ required: true, message: 'Required' }]}>
                                    <Select placeholder="Vendor" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="validUntil" label={<span style={{ color: '#262626' }}>Proposal Valid Until</span>} rules={[{ required: true, message: 'Required' }]}>
                                    <DatePicker style={{ width: '100%' }} placeholder="Select date" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item name="contactName" label={<span style={{ color: '#8c8c8c' }}>Vendor Contact</span>}>
                                    <Input defaultValue="Rami Khalil" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="email" label={<span style={{ color: '#8c8c8c' }}>Email</span>}>
                                    <Input defaultValue="rami.khalil@emitac.ae" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label={<span style={{ color: '#8c8c8c' }}>Current Invite Status</span>}>
                                    <Text className="text-[14px] text-[#262626] bg-[#f2f2f2]  rounded-[8px] px-[12px] py-[4px]">Submitted</Text>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    {/* Price scope */}
                    <Card {...cardProps}className="mb-4 rounded-xl shadow-md">
                        <Flex justify="space-between" align="flex-start" style={{ marginBottom: 6 }}>
                            <Flex vertical gap={4}>
                                <Text strong style={{ fontSize: 14 }}>Price the Requested Scope</Text>
                                <Text className="text-xs text-gray-400">
                                    Quote against each line item. Totals update automatically as pricing changes.
                                </Text>
                            </Flex>
                            <Card size="small" className="!bg-[#fff1f0] !border-0 rounded-md shrink-0 ml-4" styles={{ body: { padding: '4px 10px', textAlign: 'right' } }}>
                                <Text className="text-xs text-gray-400 block">Proposal total</Text>
                                <Text strong style={{ color: '#ff4d4f', fontSize: 13 }}>
                                    ₹ {total.toLocaleString()}
                                </Text>
                            </Card>
                        </Flex>

                        <Card size="small" className="mt-4 rounded-lg" styles={{ body: { padding: 0 } }}>
                            <Text strong style={{ fontSize: 13, display: 'block', padding: '12px 16px 10px' }}>Line Items</Text>
                            <Table
                                dataSource={items}
                                columns={columns}
                                pagination={false}
                                size="small"
                                rowKey="key"
                                style={{ fontSize: 12 }}
                            />
                        </Card>
                    </Card>

                    {/* Payment + Mode + Cover Note + Attachment */}
                    <Card {...cardProps} className="mb-4 rounded-xl shadow-md">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="paymentTerms" label="Payment Terms">
                                    <Input placeholder="Net 45" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Submission Mode">
                                    <Tag style={{ borderRadius: 6, background: '#f6ffed', border: 'none', color: '#52c41a', padding: '2px 10px' }}>
                                        ● Active
                                    </Tag>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12} className="flex flex-col">
                                <Form.Item name="coverNote" label="Cover Note" className="flex-1 flex flex-col [&_.ant-form-item-control]:flex-1 [&_.ant-form-item-control-input]:h-full [&_.ant-form-item-control-input-content]:h-full">
                                    <TextArea
                                        className="!min-h-[120px] !resize-none"
                                        placeholder="Certified Adobe solution partner in UAE. 3-year support agreement included."
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12} className="flex flex-col">
                                <Form.Item name="attachment" label="Proposal Attachment" className="flex-1 flex flex-col">
                                    <Upload beforeUpload={() => false} multiple className="w-full [&_.ant-upload]:w-full">
                                        <Card size="small" className="!bg-[#F8FAFC] !border-[#e2e8f0] rounded-lg mb-2 w-full" styles={{ body: { padding: 12 } }}>
                                            <Text className="text-xs text-gray-400 block mb-1">Add supporting documents</Text>
                                            <Text className="text-xs text-gray-300 block mb-2">
                                                Upload scope files, specifications, drawings, or commercial notes.
                                            </Text>
                                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                        </Card>
                                    </Upload>
                                    <Text className="text-xs text-gray-400 block mt-1">Simulated upload. Attach quotations, brochures, certifications, or technical responses.</Text>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    {/* Bottom actions */}
                    <Flex gap={12} style={{ marginTop: 8 }}>
                        <Button type="primary" danger icon={<SendOutlined />} htmlType="submit">
                            Submit Proposal
                        </Button>
                        <Button onClick={handleBack}>Back to RFQ</Button>
                    </Flex>
                    <Text className="text-xs text-gray-400 block" style={{ marginTop: 8 }}>
                        Submitting creates or updates the proposal in real-time for buyer review.
                    </Text>
                </Col>

                {/* ── RIGHT COLUMN ── */}
                <Col xs={24} lg={9}>

                    {/* RFQ Snapshot */}
                    <Card className="mb-4 rounded-xl shadow-md" styles={{ body: { padding: '18px 20px' } }}>
                        <Text style={{ fontSize: 13, fontWeight: 600, color: '#262626', display: 'block', marginBottom: 14 }}>RFQ Snapshot</Text>
                        {[
                            { label: 'Reference', value: rfqRef },
                            { label: 'Invited Vendors', value: '4' },
                            { label: 'Requested Items', value: '3' },
                            { label: 'Estimated Buyer Budget', value: `₹ ${total.toLocaleString()}` },
                        ].map(row => (
                            <Flex key={row.label} justify="space-between" style={{ marginBottom: 10 }}>
                                <Text style={{ fontSize: 12, color: '#8c8c8c' }}>{row.label}</Text>
                                <Text style={{ fontSize: 12, fontWeight: 600, color: '#262626' }}>{row.value}</Text>
                            </Flex>
                        ))}
                    </Card>

                    {/* Terms & Timeline + Buyer Notes */}
                    <Card className="mb-4 rounded-xl shadow-md" styles={{ body: { padding: '18px 20px' } }}>
                        <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 10 }}>Terms &amp; Timeline</Text>
                        <Text style={{ fontSize: 12, color: '#595959' }}>
                            Vendors must provide valid UAE trade license and VAT registration certificate.
                            Prices to be quoted in ₹ inclusive of VAT. Delivery within 7 business days of PO issuance.
                        </Text>

                        <Card size="small" className="mt-4 rounded-lg !bg-[#f5f5f5] !border-0" styles={{ body: { padding: '12px 14px' } }}>
                            <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>Buyer Notes</Text>
                            <Text style={{ fontSize: 12, color: '#595959' }}>
                                Preference vendors are those with existing UAE enterprise agreements.
                            </Text>
                        </Card>
                    </Card>

                    {/* RFQ Documents */}
                    <Card className="mb-4 rounded-xl shadow-md" styles={{ body: { padding: '18px 20px' } }}>
                        <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 12 }}>RFQ Documents</Text>
                        <Flex vertical gap={8}>
                            {['software_list.pdf', 'software_list.pdf'].map((file, i) => (
                                <Flex key={i} align="center" gap={10} className="bg-[#f5f5f5] rounded-lg px-3 py-2" style={{ cursor: 'pointer' }}>
                                    <FilePdfOutlined style={{ color: '#8c8c8c', fontSize: 14 }} />
                                    <Text style={{ fontSize: 12, color: '#262626' }}>{file}</Text>
                                </Flex>
                            ))}
                        </Flex>
                    </Card>
                </Col>
            </Row>
        </Form>
    );
};

export default VendorProposalSubmission;
