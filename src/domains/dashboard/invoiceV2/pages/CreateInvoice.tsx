import React, { useEffect, useMemo, useRef, useState } from 'react';

import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Segmented, Spin, Typography } from 'antd';
import dayjs from 'dayjs';
import { Formik, useFormikContext } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

import { paths } from '@src/routes/paths';

import ItemsTable from '../components/createInvoice/ItemsTable';
import SummarySection from '../components/createInvoice/SummarySection';
import AdditionalInfoForm from '../forms/createInvoice/AdditionalInfoForm';
import BuyerDetailsForm from '../forms/createInvoice/BuyerDetailsForm';
import InvoiceDetailsForm from '../forms/createInvoice/InvoiceDetailsForm';
import useCreateInvoice from '../hooks/useCreateInvoice';
import useSettings from '../hooks/useSettings';
import { createInvoiceSchema } from '../schema/createInvoiceSchema';
import { CreateInvoiceFormValues } from '../types/createInvoice';
import { generateInvoiceNumber } from '../utils/helperFunctions';

const ScrollToFieldError = () => {
    const { errors, submitCount } = useFormikContext();
    const prevCountRef = useRef(0);

    useEffect(() => {
        if (submitCount === prevCountRef.current) return;
        prevCountRef.current = submitCount;
        const path = getFirstErrorPath(errors);
        if (!path) return;
        const el =
            document.querySelector<HTMLElement>(`[name="${path}"]`) ??
            document.querySelector<HTMLElement>(`[id="${path}"]`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.focus();
        }
    }, [submitCount, errors]);

    return null;
};

const getFirstErrorPath = (errors: any, prefix = ''): string | null =>
    Object.keys(errors).reduce<string | null>((found, key) => {
        if (found) return found;
        const path = prefix ? `${prefix}.${key}` : key;
        const val = errors[key];
        if (typeof val === 'string') return path;
        if (Array.isArray(val)) {
            return val.reduce<string | null>((arrFound, item, i) => {
                if (arrFound || !item) return arrFound;
                return getFirstErrorPath(item, `${key}[${i}]`);
            }, null);
        }
        if (typeof val === 'object' && val !== null) {
            return getFirstErrorPath(val, path);
        }
        return null;
    }, null);

const EMPTY_INITIAL_VALUES: CreateInvoiceFormValues = {
    buyer: {
        name: '',
        gstNumber: '',
        address: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        email: '',
        phoneNumber: '',
        saveCustomer: false,
    },
    invoice: {
        type: 'DOMESTIC',
        invoicePrefix: '',
        invoiceNumber: '',
        currency: '',
        invoiceDate: '',
        dueDate: '',
    },
    items: [
        {
            name: '',
            hsn: '',
            quantity: '',
            unit: '',
            unitPrice: '',
            discount: '0',
            taxRate: '',
            netAmount: '',
        },
    ],
    additional: {
        termsAndConditions: '',
        notes: '',
        shippingCost: '',
        amountPaid: '',
        paymentMode: '',
    },
};

const CreateInvoice: React.FC = () => {
    const navigate = useNavigate();
    const { id: invoiceId } = useParams<{ id?: string }>();
    const isEditMode = !!invoiceId;

    const { customers, editInitialValues, isLoading, handleInvoice } = useCreateInvoice(invoiceId);
    const { settings } = useSettings();
    const [invoiceType, setInvoiceType] = useState<'DOMESTIC' | 'INTERNATIONAL'>('DOMESTIC');

    const settingsInitialValues = useMemo<CreateInvoiceFormValues>(() => {
        const now = dayjs();
        return {
            ...EMPTY_INITIAL_VALUES,
            invoice: {
                ...EMPTY_INITIAL_VALUES.invoice,
                invoicePrefix: settings?.documentPrefixes?.Invoice ?? '',
                invoiceNumber: generateInvoiceNumber(),
                invoiceDate: now.format('YYYY-MM-DD'),
                dueDate: now.add(15, 'day').format('YYYY-MM-DD'),
            },
            additional: {
                ...EMPTY_INITIAL_VALUES.additional,
                termsAndConditions: settings?.termsAndConditions ?? '',
                notes: settings?.notes ?? '',
            },
        };
    }, [settings]);

    const initialValues = isEditMode
        ? (editInitialValues ?? EMPTY_INITIAL_VALUES)
        : settingsInitialValues;

    if (isEditMode && !editInitialValues) {
        return (
            <Flex justify="center" align="center" className="h-64">
                <Spin size="large" />
            </Flex>
        );
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={createInvoiceSchema}
            enableReinitialize
            onSubmit={payload =>
                handleInvoice(payload, (id: string) =>
                    navigate(
                        `/${paths.invoice.index}/${paths.invoice.invoicedetails.replace(':id', id)}`
                    )
                )
            }
        >
            {({ handleSubmit, setFieldValue }) => (
                <Form className="w-full">
                    <ScrollToFieldError />
                    <Flex className="w-full bg-[#fafafa] rounded-3xl p-10">
                        <Flex
                            vertical
                            gap={30}
                            className="w-full bg-white rounded-3xl p-14 shadow-md"
                        >
                            {/* Header */}
                            <Flex vertical align="center" gap={16}>
                                <Typography.Text className="text-4xl font-bold">
                                    {isEditMode ? 'Edit Invoice' : 'Create Invoice'}
                                </Typography.Text>
                                <Segmented
                                    block
                                    value={invoiceType}
                                    onChange={val => {
                                        setInvoiceType(val as 'DOMESTIC' | 'INTERNATIONAL');
                                        setFieldValue('invoice.type', val);
                                    }}
                                    options={[
                                        { label: 'Domestic', value: 'DOMESTIC' },
                                        { label: 'International', value: 'INTERNATIONAL' },
                                    ]}
                                    className="w-full max-w-[400px] !rounded-full !bg-[#fafafa] !px-2 !py-1 my-2
                                        [&_.ant-segmented-item]:rounded-full
                                        [&_.ant-segmented-item]:text-base
                                        [&_.ant-segmented-item]:py-1
                                        [&_.ant-segmented-item]:px-4
                                        [&_.ant-segmented-item-selected]:text-[#ff4f4f]
                                        [&_.ant-segmented-item-selected]:font-semibold
                                        [&_.ant-segmented-thumb]:rounded-full"
                                />
                            </Flex>

                            {/* Buyer + Invoice Details */}
                            <Flex gap={40}>
                                <BuyerDetailsForm customers={customers} isLoading={isLoading} />
                                <InvoiceDetailsForm />
                            </Flex>

                            {/* Items Table */}
                            <ItemsTable />

                            {/* Additional Info + Summary */}
                            <Flex gap={40}>
                                <AdditionalInfoForm />
                                <SummarySection />
                            </Flex>

                            {/* Action Buttons */}
                            <Flex justify="flex-end" wrap gap={18} className="pt-2">
                                <Button size="large" onClick={() => navigate(-1)}>
                                    Cancel
                                </Button>
                                <Button
                                    type="primary"
                                    danger
                                    size="large"
                                    loading={isLoading}
                                    icon={<ArrowRightOutlined />}
                                    iconPosition="end"
                                    onClick={() => handleSubmit()}
                                >
                                    {isEditMode ? 'Update Invoice' : 'Generate Invoice'}
                                </Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </Form>
            )}
        </Formik>
    );
};

export default CreateInvoice;
