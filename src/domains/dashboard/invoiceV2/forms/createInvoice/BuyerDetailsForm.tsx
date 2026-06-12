import { useCallback } from 'react';

import { Checkbox, Flex, Typography } from 'antd';
import { useFormikContext } from 'formik';

import SelectInputWithSearch from '@components/atomic/inputs/SelectInputWithSearch';
import TextInput from '@components/atomic/inputs/TextInput';

import { COUNTRY_OPTIONS } from '../../constants/createInvoice';
import { CreateInvoiceFormValues, CustomerOption } from '../../types/createInvoice';

interface BuyerDetailsFormProps {
    customers: CustomerOption[];
    isLoading: boolean;
}

const BuyerDetailsForm = ({ customers, isLoading }: BuyerDetailsFormProps) => {
    const { values, setFieldValue } = useFormikContext<CreateInvoiceFormValues>();
    const isDomestic = values.invoice.type === 'DOMESTIC';

    const customerOptions = customers.map(c => ({ value: String(c.id), label: c.name }));

    const clearBuyerFields = useCallback(() => {
        setFieldValue('buyer.customerId', undefined);
        setFieldValue('buyer.name', '');
        setFieldValue('buyer.email', '');
        setFieldValue('buyer.phoneNumber', '');
        setFieldValue('buyer.address', '');
        setFieldValue('buyer.city', '');
        setFieldValue('buyer.state', '');
        setFieldValue('buyer.gstNumber', '');
        setFieldValue('buyer.pincode', '');
    }, [setFieldValue]);

    const handleCustomerSelect = useCallback(
        (value: string) => {
            if (!value) {
                clearBuyerFields();
                return;
            }
            const c = customers.find(o => String(o.id) === value);
            if (!c) return;
            setFieldValue('buyer.saveCustomer', false);
            setFieldValue('buyer.customerId', String(c.id));
            setFieldValue('buyer.name', c.name || '');
            setFieldValue('buyer.email', c.email || '');
            setFieldValue('buyer.phoneNumber', c.phoneNumber || '');
            setFieldValue('buyer.address', c.primaryAddress || '');
            setFieldValue('buyer.city', c.primaryCity || '');
            setFieldValue('buyer.state', c.primaryState || '');
            setFieldValue('buyer.gstNumber', c.gstin || '');
            setFieldValue('buyer.pincode', c.primaryPincode || '');
        },
        [setFieldValue, customers, clearBuyerFields]
    );

    return (
        <Flex vertical gap={14} className="w-full">
            <Typography.Text className="text-xl font-medium">Buyer Details</Typography.Text>

            <Flex className="w-full [&_.ant-form-item]:mb-0 [&_.ant-form-item]:w-full">
                <SelectInputWithSearch
                    name="_customerSearch"
                    placeholder="Select saved customer"
                    options={customerOptions}
                    handleChange={handleCustomerSelect}
                    isDisabled={isLoading}
                />
            </Flex>
            <TextInput
                name="buyer.name"
                placeholder="Enter Customer Name"
                type="text"
                size="middle"
                formItemClass="m-0"
                isRequired
                maxLength={50}
            />
            {isDomestic && (
                <TextInput
                    name="buyer.gstNumber"
                    placeholder="Enter GSTIN"
                    type="text"
                    formItemClass="m-0"
                    convertToUppercase
                    maxLength={15}
                />
            )}
            <TextInput
                name="buyer.address"
                placeholder="Enter Customer Address"
                type="text"
                formItemClass="m-0"
                maxLength={100}
            />

            <TextInput
                name="buyer.city"
                placeholder="Enter City"
                type="text"
                formItemClass="m-0"
                maxLength={50}
            />

            <TextInput
                name="buyer.state"
                placeholder="Enter State"
                type="text"
                formItemClass="m-0"
                maxLength={50}
            />

            {isDomestic && (
                <TextInput
                    name="buyer.pincode"
                    placeholder="Enter Pincode"
                    type="text"
                    formItemClass="m-0"
                    allowNumbersOnly
                    maxLength={6}
                />
            )}

            {!isDomestic && (
                <Flex className="w-full [&_.ant-form-item]:mb-0 [&_.ant-form-item]:w-full">
                    <SelectInputWithSearch
                        name="buyer.country"
                        placeholder="Select Country"
                        options={COUNTRY_OPTIONS}
                        isRequired
                    />
                </Flex>
            )}

            <TextInput
                name="buyer.email"
                placeholder="Enter Email"
                type="email"
                formItemClass="m-0"
            />

            <TextInput
                name="buyer.phoneNumber"
                placeholder="Enter Mobile Number"
                type="text"
                formItemClass="m-0"
                allowNumbersOnly
            />

            {!values.buyer.customerId && (
                <Checkbox
                    checked={!!values.buyer.saveCustomer}
                    onChange={e => setFieldValue('buyer.saveCustomer', e.target.checked)}
                >
                    <Typography.Text className="text-sm text-[#475569]">
                        Save this customer
                    </Typography.Text>
                </Checkbox>
            )}
        </Flex>
    );
};

export default BuyerDetailsForm;
