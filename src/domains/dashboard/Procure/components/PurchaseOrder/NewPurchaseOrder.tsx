import React, { useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Flex, Form, Row, Table, Typography } from 'antd';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

import DatePickerInput from '@components/atomic/inputs/DatePickerInput';
import SelectInput from '@components/atomic/inputs/SelectInput';
import TextAreaInput from '@components/atomic/inputs/TextAreaInput';
import TextInput from '@components/atomic/inputs/TextInput';
import { paths } from '@src/routes/paths';

import SectionHeader from './SectionHeader';
import linkToPurchaseIcon from '../../assets/icons/linkToPurchase.svg';
import newRFQsIcon from '../../assets/icons/newRFQsIcon.svg';
import newRFQImage from '../../assets/images/newRFQImage.svg';
import { newPurchaseOrderSchema } from '../../schema';
import { CURRENCY_OPTIONS, PAYMENT_TERMS, PO_STEPS, PO_TIPS, purchaseRequestsData, vendorData } from '../../utils/data';
import { getLineItemColumns } from '../../utils/LineItemColumns';

const { Title, Text } = Typography;

interface LineItem {
    key: string;
    description: string;
    qty: number;
    unit: string;
    amount: number;
    [key: string]: string | number;
}

const initialValues = {
    vendor: '',
    linkedPR: '',
    deliveryDate: '',
    currency: 'INR',
    deliveryAddress: '',
    paymentTerms: '',
    notes: '',
    internalNotes: '',
};

const NewPurchaseOrder: React.FC = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState<LineItem[]>([
        { key: '1', description: '', qty: 1, unit: 'Each', amount: 0 },
    ]);

    const handleCancel = () =>
        navigate(`${paths.dashboard.procure}/${paths.procure.purchaseOrders.index}`);

    const addItem = () =>
        setItems(prev => [...prev, { key: String(Date.now()), description: '', qty: 1, unit: 'Each', amount: 0 }]);

    const removeItem = (key: string) =>
        setItems(prev => prev.filter(i => i.key !== key));

    const updateItem = (key: string, field: string, value: string | number) =>
        setItems(prev => prev.map(i => (i.key === key ? { ...i, [field]: value } : i)));

    const totalAmount = items.reduce((sum, i) => sum + i.qty * i.amount, 0);
    const totalQty = items.reduce((sum, i) => sum + i.qty, 0);

    const columns = getLineItemColumns({
        updateItem,
        removeItem,
        itemsLength: items.length,
        amountField: 'amount',
        amountLabel: 'Est. Amount',
    });

    const onSubmit = (_values: typeof initialValues) => {
        handleCancel();
    };

    return (
        <Row gutter={24}>
            {/* ── Main Form ─────────────────────────────────────────────── */}
            <Col xs={24} lg={16}>
                <Card className="rounded-2xl border border-gray-100" styles={{ body: { padding: 24 } }}>
                    <Title level={4} className="!mb-1 text-center">New Purchase Order</Title>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={newPurchaseOrderSchema}
                        onSubmit={onSubmit}
                    >
                        {({ handleSubmit }) => (
                            <Form layout="vertical" onFinish={handleSubmit}>

                                {/* Section 1: Vendor and Delivery */}
                                <Card className="rounded-xl mt-8 mb-4 border border-gray-100" styles={{ body: { padding: '20px 24px' } }}>
                                    <SectionHeader
                                        icon={newRFQsIcon}
                                        title="Vendor and Delivery"
                                        subtitle="Who are you ordering from and when?"
                                    />
                                    <Divider style={{ margin: '0 -24px 16px', width: 'calc(100% + 48px)' }} />

                                    <SelectInput
                                        name="vendor"
                                        label="Vendor"
                                        placeholder="Select vendor"
                                        showSearch
                                        allowClear
                                        isRequired
                                        options={vendorData.map(v => ({ value: String(v.id), label: v.vendor }))}
                                    />
                                    <SelectInput
                                        name="linkedPR"
                                        label="Linked Purchase Request (optional)"
                                        placeholder="None"
                                        showSearch
                                        allowClear
                                        options={purchaseRequestsData.map(pr => ({ value: String(pr.id), label: `${pr.ref} — ${pr.requestedBy}` }))}
                                    />
                                    <Flex gap={12}>
                                        <DatePickerInput
                                            name="deliveryDate"
                                            label="Delivery Date"
                                            placeholder="Select date"
                                            classes="w-full"
                                            formItemClass="flex-1"
                                            allowClear
                                        />
                                        <SelectInput
                                            name="currency"
                                            label="Currency"
                                            placeholder="Select currency"
                                            options={CURRENCY_OPTIONS}
                                            formItemClass="w-28"
                                            isRequired
                                        />
                                    </Flex>
                                    <TextInput
                                        name="deliveryAddress"
                                        type="text"
                                        label="Delivery Address"
                                        placeholder="e.g. DIFC Building, No PDII"
                                        isRequired
                                    />
                                </Card>

                                {/* Section 2: Line Items */}
                                <Card className="rounded-xl mb-4 border border-gray-100" styles={{ body: { padding: '20px 24px' } }}>
                                    <SectionHeader
                                        icon={newRFQsIcon}
                                        title="Line Items"
                                        subtitle="Break out what you're ordering and pricing"
                                        action={
                                            <Button size="small" danger icon={<PlusOutlined />} onClick={addItem}>
                                                Add Row
                                            </Button>
                                        }
                                    />
                                    <Divider style={{ margin: '0 -24px 16px', width: 'calc(100% + 48px)' }} />

                                    <Table
                                        dataSource={items}
                                        columns={columns}
                                        pagination={false}
                                        size="small"
                                        rowKey="key"
                                        className="text-xs"
                                    />
                                    <Row gutter={12} className="mt-3">
                                        <Col span={12}>
                                            <Card className="rounded-lg border border-gray-100" styles={{ body: { padding: '10px 14px' } }}>
                                                <Text className="text-xs text-gray-400 block">Total Quantity</Text>
                                                <Text strong className="text-sm">{totalQty}</Text>
                                            </Card>
                                        </Col>
                                        <Col span={12}>
                                            <Card className="rounded-lg border border-gray-100" styles={{ body: { padding: '10px 14px' } }}>
                                                <Text className="text-xs text-gray-400 block">Total Amount</Text>
                                                <Text strong className="text-sm">₹ {totalAmount.toLocaleString()}</Text>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Card>

                                {/* Section 3: Payment & Notes */}
                                <Card className="rounded-xl mb-4 border border-gray-100" styles={{ body: { padding: '20px 24px' } }}>
                                    <SectionHeader
                                        icon={linkToPurchaseIcon}
                                        title="Payment & Notes"
                                        subtitle="Payment terms and any additional instructions"
                                    />
                                    <Divider style={{ margin: '0 -24px 16px', width: 'calc(100% + 48px)' }} />

                                    <SelectInput
                                        name="paymentTerms"
                                        label="Payment Terms"
                                        placeholder="Select payment terms"
                                        options={PAYMENT_TERMS}
                                        allowClear
                                    />
                                    <TextAreaInput
                                        name="notes"
                                        label="Notes (visible to vendor)"
                                        placeholder="Vendors must provide valid UAE trade license and VAT registration certificate. Prices to be quoted in ₹ inclusive of VAT."
                                        minRows={4}
                                    />
                                    <Text className="text-xs block mb-3 text-gray-400">Internal notes...</Text>
                                    <TextAreaInput
                                        name="internalNotes"
                                        label="Internal Notes"
                                        placeholder="Add a quote..."
                                        minRows={4}
                                    />
                                </Card>

                                <Flex gap={12}>
                                    <Button type="primary" danger size="large" htmlType="submit">
                                        Create Draft PO
                                    </Button>
                                    <Button size="large" onClick={handleCancel}>Cancel</Button>
                                </Flex>
                            </Form>
                        )}
                    </Formik>
                </Card>
            </Col>

            {/* ── Tips Panel ────────────────────────────────────────────── */}
            <Col xs={24} lg={8}>
                <Card className="rounded-2xl border border-gray-100 mb-4" styles={{ body: { padding: 24 } }}>
                    <Flex justify="center" className="bg-[#FAF9F6] rounded-xl py-5 px-4 mb-4">
                        <img src={newRFQImage} alt="tips" className="w-40 opacity-90" />
                    </Flex>
                    <Title level={5} className="!mb-3">Tips</Title>
                    <Flex vertical gap={8}>
                        {PO_TIPS.map((tip, i) => (
                            <Flex key={i} gap={8} align="flex-start">
                                <div className="shrink-0 w-2 h-2 rounded-full mt-1.5 bg-red-500" />
                                <Text className="text-xs text-gray-600">{tip}</Text>
                            </Flex>
                        ))}
                    </Flex>
                </Card>

                <Card className="rounded-2xl border border-gray-100" styles={{ body: { padding: 24 } }}>
                    <Title level={5} className="!mb-4">What happens next?</Title>
                    <Flex vertical gap={10}>
                        {PO_STEPS.map((step, i) => (
                            <Flex key={i} gap={4} align="center" className="bg-gray-50 rounded-xl p-4">
                                <Flex
                                    align="center"
                                    justify="center"
                                    className="shrink-0 w-8 h-8 rounded-lg bg-white border border-gray-100 font-semibold text-sm text-gray-800 mr-3"
                                >
                                    {i + 1}
                                </Flex>
                                <Text className="text-xs text-gray-600">{step}</Text>
                            </Flex>
                        ))}
                    </Flex>
                </Card>
            </Col>
        </Row>
    );
};

export default NewPurchaseOrder;
