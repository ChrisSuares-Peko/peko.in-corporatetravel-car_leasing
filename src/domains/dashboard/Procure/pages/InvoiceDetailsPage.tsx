import React from 'react';

import { InboxOutlined } from '@ant-design/icons';
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
    Typography,
    Upload,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import invoiceDetails from '@src/domains/dashboard/Procure/assets/icons/invoiceUploadIcon.svg';
import invoicingDocumentIcon from '@src/domains/dashboard/Procure/assets/icons/invoicingDocumentIcon.svg';
import linkToPurchase from '@src/domains/dashboard/Procure/assets/icons/linkToPurchase.svg';
import newRFQImage from '@src/domains/dashboard/Procure/assets/images/newRFQImage.svg';
import { paths } from '@src/routes/paths';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Dragger } = Upload;

const sectionCard = { styles: { body: { padding: '20px 24px' } }, className: 'mb-4 mt-10 rounded-xl' };

const SectionHeader: React.FC<{ icon: string; bg: string; title: string; subtitle: string }> = ({ icon, bg, title, subtitle }) => (
    <Flex gap={10} align="center" className="mb-4">
        <Flex align="center" justify="center" className="shrink-0 w-8 h-8 rounded-lg border" style={{ background: bg, borderColor: bg }}>
            <img src={icon} alt={title} style={{ width: 30, height: 30 }} />
        </Flex>
        <Flex vertical gap={1}>
            <Text strong className="text-sm block">{title}</Text>
            <Text className="text-xs text-gray-400">{subtitle}</Text>
        </Flex>
    </Flex>
);

const InvoiceDetailsPage: React.FC = () => {
    useParams<{ invoiceId: string }>();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const handleCancel = () =>
        navigate(`${paths.dashboard.procure}/${paths.procure.invoicing.index}`);

    const handleSubmit = (values: any) => {
        console.log('Upload Invoice:', values);
        handleCancel();
    };

    return (
        <Row gutter={24}>
            <Col xs={24} lg={16}>
                <Card className="rounded-2xl" styles={{ body: { borderRadius: 16, padding: 24 } }}>
                    <Title level={4} className="text-center" style={{ marginBottom: 4 }}>Upload Invoice</Title>
                    <Text  className="text-sm block text-center text-[#000000]" style={{ marginBottom: 24 }}>
                        Capture a vendor invoice manually and match it to the correct purchase order.
                    </Text>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        requiredMark={(label, { required }) => (
                            <>{label}{required && <span style={{ color: '#ff4d4f', marginLeft: 2 }}>*</span>}</>
                        )}
                    >
                        {/* Link to Purchase Order */}
                        <Card {...sectionCard}>
                            <SectionHeader
                                icon={linkToPurchase}
                                bg="#fff1f0"
                                title="Link to Purchase Order"
                                subtitle="Choose the PO this invoice belongs to and confirm the vendor contact."
                            />
                            <Form.Item name="purchaseOrder" label="Purchase Order" rules={[{ required: true, message: 'Required' }]}>
                                <Select placeholder="Select a purchase order" />
                            </Form.Item>
                            <Row gutter={16} className="mb-4">
                                <Col span={12}>
                                    <Form.Item name="accountNumber" label="Account Number" style={{ marginBottom: 0 }}>
                                        <Input placeholder="Name" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="iban" label="IBAN" style={{ marginBottom: 0 }}>
                                        <Input placeholder="AE07 3331 2312 3139 0239 Re." />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                {['Vendor', 'Vendor'].map((label, i) => (
                                    <Col span={12} key={i}>
                                        <div
                                            style={{
                                                background: '#F8FAFC',
                                                border: '1px solid #f0f0f0',
                                                borderRadius: 8,
                                                padding: '10px 12px',
                                            }}
                                        >
                                            <Text style={{ fontSize: 11, color: '#bfbfbf', display: 'block' }}>{label}</Text>
                                            <Text style={{ fontSize: 13, color: '#8c8c8c', display: 'block', fontWeight: 500 }}>Select a PO first</Text>
                                            <Text style={{ fontSize: 11, color: '#bfbfbf', display: 'block' }}>Vendor details will auto fill from the linked PO</Text>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Card>

                        {/* Invoice Details */}
                        <Card {...sectionCard}>
                            <SectionHeader
                                icon={invoiceDetails}
                                bg="#f0f5ff"
                                title="Invoice Details"
                                subtitle="Capture the metadata exactly as received from the vendor."
                            />
                            <Form.Item name="invoicePO" label="Purchase Order" rules={[{ required: true, message: 'Required' }]}>
                                <Select placeholder="Select your form here" />
                            </Form.Item>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item name="invoiceNumber" label="Invoice Number" rules={[{ required: true, message: 'Required' }]}>
                                        <Input placeholder="Invoice Number" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Required' }]}>
                                        <Input placeholder="Amount" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Form.Item name="invoiceDate" label="Invoice Date" rules={[{ required: true, message: 'Required' }]}>
                                        <DatePicker style={{ width: '100%' }} placeholder="Select Date" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item name="receivedDate" label="Received Date" rules={[{ required: true, message: 'Required' }]}>
                                        <DatePicker style={{ width: '100%' }} placeholder="Select Date" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item name="dueDate" label="Due Date">
                                        <DatePicker style={{ width: '100%' }} placeholder="Select Date" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>

                        {/* Invoice Documents */}
                        <Card {...sectionCard}>
                            <SectionHeader
                                icon={invoicingDocumentIcon}
                                bg="#fff7e6"
                                title="Invoice Documents"
                                subtitle="Upload the invoice plus any supporting delivery or approval documents."
                            />
                            <Form.Item name="documents" label="Attachment">
                                <Dragger
                                    multiple
                                    beforeUpload={() => false}
                                    style={{ borderRadius: 8 }}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined style={{ color: '#ff4d4f' }} />
                                    </p>
                                    <p className="ant-upload-text" style={{ fontSize: 13 }}>
                                        Click or drag file to this area to upload
                                    </p>
                                    <p className="ant-upload-hint" style={{ fontSize: 12, width: 395, height: 32, transform: 'rotate(0deg)', opacity: 1, margin: '0 auto' }}>
                                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
                                    </p>
                                </Dragger>
                            </Form.Item>
                            <Text className="text-xs text-gray-400">
                               Simulated upload. Filenames are stored in session storage and shown in the invoice detail view.
                            </Text>
                        </Card>

                        {/* Name & Make Contact */}
                        <Card {...sectionCard}>
                            <SectionHeader
                                icon={invoicingDocumentIcon}
                                bg="#fff1f0"
                                title="Notes & Intake Context"
                                subtitle="Add a note to provide more context to the finance team."
                            />
                            <Form.Item name="notes" label="Notes">
                                <TextArea rows={3} placeholder="Add notes..." />
                            </Form.Item>
                        </Card>

                        <Flex gap={12}>
                            <Button type="primary" danger htmlType="submit">
                                Upload Invoice
                            </Button>
                            <Button onClick={handleCancel}>Cancel</Button>
                        </Flex>
                    </Form>
                </Card>
            </Col>

            {/* Right Sidebar */}
            <Col xs={24} lg={8}>
                <Card className="mb-4 rounded-2xl" styles={{ body: { padding: 24 } }}>
                    <Card className="mb-4 rounded-xl !bg-[#FAF9F6] !border-0" styles={{ body: { padding: '20px 16px', display: 'flex', justifyContent: 'center' } }}>
                        <img src={newRFQImage} alt="tips" style={{ width: 160, opacity: 0.9 }} />
                    </Card>

                    <Title level={5} className="!mb-3">Tips</Title>
                    <Flex vertical gap={8} className="mb-2">
                        {[
                            'Use the vendor invoice number exactly as received so finance can reconcile faster.',
                            'You can upload multiple files such as the invoice PDF, packing slips, and delivery proof.',
                            'Multiple invoices can be linked to the same PO, which is useful for partial billing or staged work.',
                        ].map((tip, i) => (
                            <Flex key={i} gap={8} align="flex-start">
                                <span className="shrink-0 w-2 h-2 rounded-full mt-1.5 block" style={{ background: '#ff4d4f' }} />
                                <Text className="text-sm text-gray-600">{tip}</Text>
                            </Flex>
                        ))}
                    </Flex>
                </Card>

                <Card className="rounded-2xl" styles={{ body: { padding: 24 } }}>
                    <Title level={5} className="!mb-4">What happens next?</Title>
                    <Flex vertical gap={10}>
                        {[
                            'Invoice is logged against the selected purchase order.',
                            'Procurement or finance can review and verify the invoice details.',
                            'Payment can be initiated directly from the invoice detail page.',
                        ].map((step, i) => (
                            <Card key={i} size="small" className="rounded-xl !bg-[#FAF9F6] !border-0" styles={{ body: { padding: '14px 16px' } }}>
                                <Flex gap={16} align="center">
                                    <Flex
                                        align="center"
                                        justify="center"
                                        className="shrink-0 w-8 h-8 rounded-full bg-white border border-[#f0f0f0]"
                                        style={{ fontWeight: 600, fontSize: 13, color: '#262626' }}
                                    >
                                        {i + 1}
                                    </Flex>
                                    <Text className="text-xs" style={{ color: '#595959' }}>{step}</Text>
                                </Flex>
                            </Card>
                        ))}
                    </Flex>
                </Card>
            </Col>
        </Row>
    );
};

export default InvoiceDetailsPage;
