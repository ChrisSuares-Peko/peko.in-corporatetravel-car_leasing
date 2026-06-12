import React, { useRef } from 'react';

import { ArrowLeftOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Flex, Form, Row, Space, Typography } from 'antd';
import { Formik, FormikProps } from 'formik';

import DatePickerInput from '@src/components/atomic/inputs/DatePickerInput';
import FileUploadInput from '@src/components/atomic/inputs/FileUploadInput';
import InputTextArea from '@src/components/atomic/inputs/InputTextArea';
import TextInput from '@src/components/atomic/inputs/TextInput';

import { vendorPaymentsValidationSchema } from '../schema/vendorPaymentsDrawer';
import { PendingRentPayout } from '../types';

const { Text, Title } = Typography;

interface VendorPaymentsDrawerProps {
    visible: boolean;
    onCancel: () => void;
    onBack: () => void;
    onCreateBill: (data: PendingRentPayout) => void;
}

const initialValues = {
    vendorName: '',
    date: '',
    amount: '',
    description: '',
    notes: '',
    attachment: '',
};



const VendorPaymentsDrawer: React.FC<VendorPaymentsDrawerProps> = ({
    visible,
    onCancel,
    onBack,
    onCreateBill,
}) => {
    const formikRef = useRef<FormikProps<typeof initialValues>>(null);

    return (
        <Drawer
            open={visible}
            onClose={onCancel}
            placement="right"
            width={480}
            closable={false}
            title={
                <Flex align="center" justify="space-between">
                    <Space>
                        <Button
                            type="text"
                            icon={<ArrowLeftOutlined />}
                            onClick={onBack}
                            size="small"
                        />
                        <Space direction="vertical" size={2}>
                            <Title level={4} className="m-0">
                                Add Vendor Payments
                            </Title>
                            <Text type="secondary" style={{ fontSize: 13, fontWeight: 'normal' }}>
                                Fill in the bill details below
                            </Text>
                        </Space>
                    </Space>
                    <Button type="text" icon={<CloseOutlined />} onClick={onCancel} />
                </Flex>
            }
            footer={
                <Row justify="end" gutter={12}>
                    <Col>
                        <Button onClick={onCancel} style={{ borderRadius: 8 }}>
                            Back
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            onClick={() => formikRef.current?.submitForm()}
                            style={{
                                borderRadius: 8,
                                background: '#FF4D4F',
                                borderColor: '#FF4D4F',
                            }}
                        >
                            Create Bill
                        </Button>
                    </Col>
                </Row>
            }
        >
            <Formik
                innerRef={formikRef}
                initialValues={initialValues}
                validationSchema={vendorPaymentsValidationSchema}
                onSubmit={(values) => {
                    onCreateBill({
                        rentBillId: 0,
                        beneficiaryId: 0,
                        amount: parseFloat(values.amount) || 0,
                        payeeName: values.vendorName,
                        createdAt: values.date,
                        category: 'VENDOR_PAYMENT',
                    });
                }}
            >
                <Form layout="vertical" className="w-full">
                    <Title level={5} className="mb-4">
                        Vendor Payment Details
                    </Title>

                    <TextInput
                        name="vendorName"
                        label="Vendor Name"
                        placeholder="Enter vendor name"
                        type="text"
                        isRequired
                        maxLength={100}
                    />

                    <DatePickerInput
                        name="date"
                        label="Date"
                        placeholder="YYYY-MM-DD"
                        isRequired
                        classes="w-full"
                        
                    />

                    <TextInput
                        name="amount"
                        label="Amount"
                        placeholder="0.00"
                        type="text"
                        isRequired
                        allowDecimalsOnly
                        prefix="₹"
                    />

                    <InputTextArea
                        name="description"
                        label="Description"
                        placeholder="Enter payment description"
                        isRequired
                        maxLength={250}
                        showCount
                        autoSize={{ minRows: 3 }}
                    />

                    <InputTextArea
                        name="notes"
                        label="Notes"
                        placeholder="Add any additional notes"
                        maxLength={250}
                        autoSize={{ minRows: 3 }}
                        showCount
                    />

                    <FileUploadInput
                        name="attachment"
                        label="Attachment (Optional)"
                        allowedFileTypes={['image/jpeg', 'image/png', 'application/pdf']}
                        
                        maxFileSize={10240}
                        showFileName
                        allowFileDelete
                    />
                    <Text className="text-sm">PDF, PNG, JPG up to 10MB</Text>

                </Form>
            </Formik>
        </Drawer>
    );
};

export default VendorPaymentsDrawer;
