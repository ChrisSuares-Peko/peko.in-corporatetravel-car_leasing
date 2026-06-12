import React from 'react';

import { Button, Card, Col, Divider, Flex, Form, Row, Typography, Upload } from 'antd';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

import DatePickerInput from '@components/atomic/inputs/DatePickerInput';
import SelectInput from '@components/atomic/inputs/SelectInput';
import TextAreaInput from '@components/atomic/inputs/TextAreaInput';
import TextInput from '@components/atomic/inputs/TextInput';
import purchaseRequestIcon1 from '@src/domains/dashboard/Procure/assets/icons/purchaseRequestIcon1.svg';
import purchaseRequestIcon12 from '@src/domains/dashboard/Procure/assets/icons/purchaseRequestIcon2.svg';
import newRFQImage from '@src/domains/dashboard/Procure/assets/images/newRFQImage.svg';
import { paths } from '@src/routes/paths';

import { newPurchaseRequestSchema } from '../../schema';

const { Title, Text } = Typography;

const sectionCard = { styles: { body: { padding: '20px 24px' } }, className: 'mb-4 rounded-xl mt-5' };

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

const initialValues = {
    requestedBy: '',
    department: '',
    category: '',
    description: '',
    budget: '',
    needBy: '',
    notes: '',
};

const NewPurchaseRequest: React.FC = () => {
    const navigate = useNavigate();

    const handleCancel = () =>
        navigate(`${paths.dashboard.procure}/${paths.procure.purchaseRequests.index}`);

    const onSubmit = (_values: typeof initialValues) => {
        handleCancel();
    };

    return (
        <Row gutter={24} className="p-10">
            <Col xs={24} lg={16}>
                <Card className="rounded-2xl" styles={{ body: { borderRadius: 16, padding: 24 } }}>
                    <Title level={4} className="text-center" style={{ marginBottom: 4 }}>New Purchase Request</Title>
                    <Text className="text-gray-400 text-xs block mb-10 text-center">
                        Submit a request for goods or services
                    </Text>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={newPurchaseRequestSchema}
                        onSubmit={onSubmit}
                    >
                        {({ handleSubmit }) => (
                            <Form layout="vertical" onFinish={handleSubmit}>
                                {/* Requester Details */}
                                <Card {...sectionCard}>
                                    <SectionHeader icon={purchaseRequestIcon1} bg="#fff1f0" title="Requester Details" subtitle="Who is this request on behalf of?" />
                                    <Divider className="!my-3 !-mx-6" style={{ width: 'calc(100% + 48px)' }} />
                                    <SelectInput
                                        name="requestedBy"
                                        label="Requested By"
                                        placeholder="Select employee"
                                        isRequired
                                        options={[]}
                                    />
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <TextInput
                                                name="department"
                                                label="Department"
                                                type="text"
                                                placeholder="Enter department name"
                                                isRequired
                                            />
                                        </Col>
                                        <Col span={12}>
                                            <TextInput
                                                name="category"
                                                label="Category"
                                                type="text"
                                                placeholder="Enter category"
                                                isRequired
                                            />
                                        </Col>
                                    </Row>
                                </Card>

                                {/* What's Needed */}
                                <Card {...sectionCard}>
                                    <SectionHeader icon={purchaseRequestIcon12} bg="#fff1f0" title="What's Needed" subtitle="Describe what you need (required)" />
                                    <Divider className="!my-3 !-mx-6" style={{ width: 'calc(100% + 48px)' }} />
                                    <TextAreaInput
                                        name="description"
                                        label="Description"
                                        minRows={4}
                                        placeholder="Describe what you need and why."
                                        isRequired
                                    />
                                    <Text className="text-xs text-gray-400">
                                        Be specific about quantities, sizes, or supplier specs.
                                    </Text>
                                </Card>

                                {/* Budget & Timeline */}
                                <Card {...sectionCard}>
                                    <SectionHeader icon={purchaseRequestIcon12} bg="#fff1f0" title="Budget & Timeline" subtitle="Information on when procurement is needed by" />
                                    <Divider className="!my-3 !-mx-6" style={{ width: 'calc(100% + 48px)' }} />
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <TextInput
                                                name="budget"
                                                label="Estimated Budget (₹)"
                                                type="text"
                                                placeholder="Enter estimated amount"
                                                prefix="₹"
                                                allowNumbersOnly
                                                isRequired
                                            />
                                        </Col>
                                        <Col span={12}>
                                            <DatePickerInput
                                                name="needBy"
                                                label="Needed by"
                                                placeholder="Select date"
                                                classes="w-full"
                                                needConfirm={false}
                                            />
                                        </Col>
                                    </Row>
                                </Card>

                                {/* Supporting Documents */}
                                <Card {...sectionCard}>
                                    <SectionHeader icon={purchaseRequestIcon12} bg="#fff7e6" title="Supporting Documents" subtitle="Attach any relevant files or notes" />
                                    <Divider className="!my-3 !-mx-6" style={{ width: 'calc(100% + 48px)' }} />
                                    <Form.Item label="Attachments (filename)">
                                        <Upload beforeUpload={() => false} multiple showUploadList={false}>
                                            <Flex
                                                align="center"
                                                justify="space-between"
                                                style={{
                                                    border: '1px dashed #d9d9d9',
                                                    borderRadius: 6,
                                                    padding: '6px 8px 6px 12px',
                                                    background: '#ffffff',
                                                    cursor: 'pointer',
                                                    minWidth: 340,
                                                }}
                                            >
                                                <Text className="text-sm text-gray-500">Select employee</Text>
                                                <Button size="small" style={{ borderRadius: 4 }}>Browse File</Button>
                                            </Flex>
                                        </Upload>
                                        <Text className="text-xs text-gray-400 mt-1 block">Simulated — enter filename</Text>
                                    </Form.Item>
                                    <TextAreaInput
                                        name="notes"
                                        label="Notes"
                                        placeholder="Describe what you need and why..."
                                        minRows={4}
                                    />
                                </Card>

                                <Flex gap={12}>
                                    <Button type="primary" danger htmlType="submit">
                                        Submit Request
                                    </Button>
                                    <Button onClick={handleCancel}>Cancel</Button>
                                </Flex>
                            </Form>
                        )}
                    </Formik>
                </Card>
            </Col>

            {/* Tips Panel */}
            <Col xs={24} lg={8}>
                <Card className="mb-4 rounded-2xl" styles={{ body: { padding: 24 } }}>
                    <Card className="mb-4 rounded-xl !bg-[#FAF9F6] !border-0" styles={{ body: { padding: '20px 16px', display: 'flex', justifyContent: 'center' } }}>
                        <img src={newRFQImage} alt="tips" style={{ width: 160, opacity: 0.9 }} />
                    </Card>

                    <Title level={5} className="!mb-4 ">Tips</Title>
                    <Flex vertical gap={16} className="mb-6 mt-5">
                        {[
                            'Be specific about what you need — it helps when comparing vendor quotes.',
                            'Attach any pre-approval email or reference document.',
                            'The budget is an estimate — vendors will provide actual quotes via RFQ.',
                        ].map((tip, i) => (
                            <Flex key={i} gap={10} align="flex-start">
                                <span className="shrink-0 w-2 h-2 rounded-full mt-1.5 block" style={{ background: '#ff4d4f' }} />
                                <Text className="text-xs text-gray-600">{tip}</Text>
                            </Flex>
                        ))}
                    </Flex>
                </Card>

                <Card className="rounded-2xl" styles={{ body: { padding: 24 } }}>
                    <Title level={5} className="!mb-4">What happens next?</Title>
                    <Flex vertical gap={10}>
                        {[
                            'Request is logged and visible to procurement.',
                            'Convert to an RFQ to collect vendor quotes.',
                            'Accept the best proposal to auto-generate a Purchase Order.',
                        ].map((step, i) => (
                            <Card key={i} size="small" className="rounded-xl !bg-[#f9f9f9] !border-0 mt-3" styles={{ body: { padding: '14px 16px' } }}>
                                <Flex gap={16} align="center">
                                    <Flex align="center" justify="center" className="shrink-0 w-10 h-8 rounded-full bg-white border border-[#f0f0f0]"
                                        style={{ fontWeight: 600, fontSize: 13, color: '#262626' }}>
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

export default NewPurchaseRequest;
