import React, { useState } from 'react';

import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Alert, Button, ConfigProvider, DatePicker, Flex, Form, Input, Modal, Select, Steps, Switch, Typography } from 'antd';

import { rfqData, vendorData } from '../../utils/data';

const { Text } = Typography;
const { TextArea } = Input;

type LineItem = { key: string; description: string; qty: number; unitPrice: number };

type Props = { open: boolean; onClose: () => void };

const PAYMENT_TERMS = [
    { value: 'net30', label: 'Net 30' },
    { value: 'net60', label: 'Net 60' },
    { value: 'net90', label: 'Net 90' },
    { value: 'immediate', label: 'Immediate' },
];

const STEP_ITEMS = [{ title: 'Select RFQ' }, { title: 'Select Vendor' }, { title: 'Enter Details' }];

const UploadOfflineProposalModal: React.FC<Props> = ({ open, onClose }) => {
    const [step, setStep] = useState(0);
    const [selectedRfqId, setSelectedRfqId] = useState<number | null>(null);
    const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
    const [vendorSource, setVendorSource] = useState<'invited' | 'directory' | null>(null);
    const [addLineItems, setAddLineItems] = useState(false);
    const [lineItems, setLineItems] = useState<LineItem[]>([{ key: '1', description: '', qty: 1, unitPrice: 1 }]);
    const [form] = Form.useForm();

    const selectedRfq = rfqData.find(r => r.id === selectedRfqId) ?? null;

    const reset = () => {
        setStep(0);
        setSelectedRfqId(null);
        setSelectedVendor(null);
        setVendorSource(null);
        setAddLineItems(false);
        setLineItems([{ key: '1', description: '', qty: 1, unitPrice: 1 }]);
        form.resetFields();
    };

    const handleClose = () => { reset(); onClose(); };

    const addLineItem = () =>
        setLineItems(prev => [...prev, { key: String(Date.now()), description: '', qty: 1, unitPrice: 1 }]);

    const removeLineItem = (key: string) =>
        setLineItems(prev => prev.filter(i => i.key !== key));

    const updateLineItem = (key: string, field: keyof LineItem, value: string | number) =>
        setLineItems(prev => prev.map(i => (i.key === key ? { ...i, [field]: value } : i)));

    // ── Step 1 ─────────────────────────────────────────────────────────────
    const renderStep1 = () => (
        <Flex vertical gap={16}>
            <Flex vertical gap={2}>
                <Text strong className="text-sm">Request for Quote</Text>
                <Text className="text-xs text-gray-400">Which RFQ is this vendor&apos;s proposal in response to?</Text>
            </Flex>

            {selectedRfq ? (
                <Flex vertical gap={6} className="bg-red-50 border border-red-100 rounded-lg p-3">
                    <Flex justify="space-between" align="center">
                        <Text className="text-xs text-gray-400 uppercase tracking-widest font-medium">Selected RFQ</Text>
                        <Button type="link" danger size="small" className="p-0 h-auto leading-none" onClick={() => setSelectedRfqId(null)}>
                            Change
                        </Button>
                    </Flex>
                    <Text strong className="text-sm">{selectedRfq.title}</Text>
                    <Text className="text-xs text-gray-400">
                        Ref: {selectedRfq.ref}&emsp;Type: {selectedRfq.type}&emsp;Vendors: {selectedRfq.invitedVendors.length} invited
                    </Text>
                </Flex>
            ) : (
                <Select
                    showSearch
                    placeholder="Search and select an RFQ"
                    optionFilterProp="label"
                    options={rfqData.map(r => ({ value: r.id, label: r.title }))}
                    onChange={val => setSelectedRfqId(val)}
                    className="w-full"
                />
            )}
        </Flex>
    );

    // ── Step 2 ─────────────────────────────────────────────────────────────
    const renderStep2 = () => (
        <Flex vertical gap={16}>
            <Text strong className="text-sm">Which vendor submitted this proposal?</Text>

            <Flex vertical gap={4}>
                <Text className="text-xs text-gray-500">Invited to this RFQ</Text>
                <Select
                    showSearch
                    placeholder="Search and select vendor"
                    value={vendorSource === 'invited' ? selectedVendor : undefined}
                    options={selectedRfq?.invitedVendors.map(v => ({ value: v.name, label: v.name })) ?? []}
                    onChange={val => { setSelectedVendor(val); setVendorSource('invited'); }}
                    className="w-full"
                />
            </Flex>

            <Flex vertical gap={4}>
                <Text className="text-xs text-gray-500">Other vendors in directory</Text>
                <Select
                    showSearch
                    placeholder="Search and select vendor"
                    value={vendorSource === 'directory' ? selectedVendor : undefined}
                    options={vendorData.map(v => ({ value: v.vendor, label: v.vendor }))}
                    onChange={val => { setSelectedVendor(val); setVendorSource('directory'); }}
                    className="w-full"
                />
            </Flex>
        </Flex>
    );

    // ── Step 3 ─────────────────────────────────────────────────────────────
    const renderStep3 = () => (
        <Flex vertical gap={12}>
            <Flex justify="space-between" align="flex-start">
                <Flex vertical gap={2}>
                    <Text strong className="text-sm">{selectedVendor}</Text>
                    <Text className="text-xs text-gray-400">{selectedRfq?.title}</Text>
                </Flex>
                <Button type="link" danger size="small" className="p-0 h-auto leading-none" onClick={() => setStep(0)}>
                    Change
                </Button>
            </Flex>

            <Alert
                message="Enter the key details from the vendor's emailed quote. Adding line items is optional but enables full side-by-side price comparison."
                type="warning"
                showIcon
                className="text-xs"
            />

            <Form form={form} layout="vertical" size="small">
                <Flex gap={12}>
                    <Form.Item name="totalAmount" label="Total Amount (₹)" className="flex-1 mb-3">
                        <Input placeholder="e.g. 185000" />
                    </Form.Item>
                    <Form.Item name="validUntil" label="Valid Until" className="flex-1 mb-3">
                        <DatePicker className="w-full" />
                    </Form.Item>
                </Flex>

                <Form.Item name="paymentTerms" label="Payment Terms" className="mb-3">
                    <Select placeholder="Net 30" options={PAYMENT_TERMS} />
                </Form.Item>

                <Form.Item name="pdfQuote" label="Vendor's PDF Quote" className="mb-1">
                    <Input placeholder="e.g. vendor_quote_march2026.pdf" />
                </Form.Item>
                <Text className="text-xs text-gray-400 block mb-3">
                    Shown as a download link in the proposal view and comparison table.
                </Text>

                <Flex justify="space-between" align="center" className="mb-2">
                    <Flex vertical gap={1}>
                        <Text strong className="text-sm">Add line item</Text>
                        <Text className="text-xs text-gray-400">Optional — enables full side by side price comparisons</Text>
                    </Flex>
                    <Switch checked={addLineItems} onChange={checked => setAddLineItems(checked)} />
                </Flex>

                {addLineItems && (
                    <Flex vertical gap={8} className="mt-2">
                        <Text className="text-xs text-gray-400">
                            Enter line items from the vendor&apos;s quote to enable per item price comparison.
                        </Text>
                        <Flex gap={8} className="px-1">
                            <Text className="text-xs text-gray-500 flex-1">Description</Text>
                            <Text className="text-xs text-gray-500 w-14">Qty</Text>
                            <Text className="text-xs text-gray-500 w-20">Unit Price</Text>
                            <Text className="text-xs text-gray-500 w-14">Total</Text>
                            <div className="w-6" />
                        </Flex>
                        {lineItems.map(item => (
                            <Flex key={item.key} gap={8} align="center">
                                <Input
                                    className="flex-1"
                                    placeholder="Description"
                                    value={item.description}
                                    onChange={e => updateLineItem(item.key, 'description', e.target.value)}
                                />
                                <Input
                                    className="w-14"
                                    type="number"
                                    min={1}
                                    value={item.qty}
                                    onChange={e => updateLineItem(item.key, 'qty', Number(e.target.value))}
                                />
                                <Input
                                    className="w-20"
                                    type="number"
                                    min={0}
                                    value={item.unitPrice}
                                    onChange={e => updateLineItem(item.key, 'unitPrice', Number(e.target.value))}
                                />
                                <Text className="text-xs w-14 text-right">{item.qty * item.unitPrice}</Text>
                                <Button
                                    type="text"
                                    icon={<DeleteOutlined />}
                                    size="small"
                                    disabled={lineItems.length === 1}
                                    onClick={() => removeLineItem(item.key)}
                                />
                            </Flex>
                        ))}
                        <Button type="dashed" icon={<PlusOutlined />} size="small" onClick={addLineItem} className="mt-1">
                            Add row
                        </Button>
                    </Flex>
                )}

                <Form.Item name="notes" label="Notes" className="mt-3 mb-0">
                    <TextArea rows={3} placeholder="Add notes" />
                </Form.Item>
            </Form>
        </Flex>
    );

    const stepContent = [renderStep1, renderStep2, renderStep3];
    const getCanNext = () => {
        if (step === 0) return !!selectedRfqId;
        if (step === 1) return !!selectedVendor;
        return true;
    };
    const canNext = getCanNext();


    const handleSubmit = () => {
        handleClose();
    };

    const footer = (
        <Flex gap={8} className="mt-2">
            <Button onClick={handleClose} className="flex-1 rounded-lg">Cancel</Button>
            {step < 2 ? (
                <Button type="primary" danger disabled={!canNext} className="flex-1 rounded-lg" onClick={() => setStep(s => s + 1)}>
                    Next
                </Button>
            ) : (
                <Button type="primary" danger className="flex-1 rounded-lg" onClick={handleSubmit}>
                    Submit
                </Button>
            )}
        </Flex>
    );

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#ff4d4f' } }}>
            <Modal
                open={open}
                onCancel={handleClose}
                title={
                    <Flex vertical gap={2}>
                        <Text strong className="text-base">Upload Offline Proposal</Text>
                        <Text className="text-xs text-gray-400 font-normal">
                            Enter details from a vendor&apos;s emailed quote &mdash; it&apos;ll appear just like an online proposal.
                        </Text>
                    </Flex>
                }
                footer={footer}
                width={520}
                destroyOnClose
            >
                <Steps current={step} items={STEP_ITEMS} size="small" className="my-5" />
                {stepContent[step]()}
            </Modal>
        </ConfigProvider>
    );
};

export default UploadOfflineProposalModal;
